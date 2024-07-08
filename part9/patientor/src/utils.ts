import { Gender, NewPatient, EntryWithoutId } from "./types";

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

const assetNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
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
          return assetNever(checkedEntry);
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