import { 
  Gender,
  NewPatient,
  EntryWithoutId,
  EntryType,
  Diagnosis,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  const regex = /^\d{6}-[A-Za-z0-9]{3,4}$/;
  return regex.test(ssn);
};

const isGender = (gender: unknown): gender is Gender => {
  return Object.values(Gender).find(g => g === gender) !== undefined;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect occupation: ' + occupation);
  }
  return occupation;
};

const parseEntries = (entries: unknown): EntryWithoutId[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect entries data');
  }

  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Incorrect entry data');
    }
  
    if (!('date' in entry) || !('description' in entry) || !('specialist' in entry)) {
      throw new Error('Incorrect base entry data: missing field');
    }

    const checkedEntry = entry as EntryWithoutId;

    if ('type' in checkedEntry) {
      switch (checkedEntry.type) {
        case 'HealthCheck':
          break;
        case 'Hospital':
          break;
        case 'OccupationalHealthcare':
          break;
        default:
          return assertNever(checkedEntry);
      }
    }
  }

  return entries as EntryWithoutId[];
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object 
    && 'dateOfBirth' in object 
    && 'ssn' in object 
    && 'gender' in object 
    && 'occupation' in object) {

      const newEntry: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: 'entries' in object ? parseEntries(object.entries) : [],
      };

      return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect description: ' + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect description: ' + specialist);
  }
  return specialist;
};

const parseType = (type: unknown): EntryType => {
  if (!isString(type)) {
    throw new Error('Incorrect type: ' + type);
  }
  return type as EntryType;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  console.log(object);
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).find(hcr => hcr === rating) !== undefined;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect health check rating: ' + rating);
  }
  return rating;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect criteria: ' + criteria);
  }
  return criteria;
};

const parseEmployer = (employer: unknown): string => {
  if (!isString(employer)) {
    throw new Error('Incorrect employer: ' + employer);
  }
  return employer;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing entry data');
  }

  if (
    !('description' in object)
    || !('date' in object)
    || !('specialist' in object)
    || !('type' in object)) {
      throw new Error('Incorrect entry data: a field missing');
  }

  let baseEntry;
  if ('diagnosisCodes' in object) {
    baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: parseType(object.type),
    };
  } else {
    baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
    };
  }
    
  let newEntry: EntryWithoutId;
  switch (baseEntry.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('Incorrect entry data: healthCheckRating missing');
      }
      newEntry = {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      } as HealthCheckEntry;
      break;
    case 'Hospital':
      if (!('discharge' in object) || !object.discharge || typeof object.discharge !== 'object') {
        throw new Error('Incorrect entry data: discharge missing or incorrect type');
      }
      const discharge = object.discharge;
      if (!('date' in discharge) || !('criteria' in discharge)) {
        throw new Error('Missing discharge field(s)');
      }
      newEntry = {
        ...baseEntry,
        discharge: {
          date: parseDate(discharge.date),
          criteria: parseCriteria(discharge.criteria)
        }
      } as HospitalEntry;
      break;
    case 'OccupationalHealthcare':
      if (!('employerName' in object)) {
        throw new Error('Incorrect entry data: employerName missing');
      }
      newEntry = {
        ...baseEntry,
        employerName: parseEmployer(object.employerName)
      } as OccupationalHealthcareEntry;
      if ('sickLeave' in object) {
        if (!object.sickLeave || typeof object.sickLeave !== 'object') {
          throw new Error('Incorrect sickLeave type');
        }
        const sickLeave = object.sickLeave;
        if (!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
          throw new Error('Missing sickLeave field(s)');
        }
        newEntry = {
          ...newEntry,
          sickLeave: {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)
          }
        };
      }
      break;
    default:
      return assertNever(baseEntry.type);
  }
  
  return newEntry;
};