import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patientsData';

import {
  Patient,
  NewPatient,
  EntryWithoutId,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '../types';

import { assertNever } from '../utils';

const getData = (): Patient[] => {
  return patientsData;
};

const getFilteredData = (): Patient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find(p => p.id === id);
  return entry;
};

const addData = (object: NewPatient): Patient => {
  /* 
    eslint-disable 
    @typescript-eslint/no-unsafe-assignment, 
    @typescript-eslint/no-unsafe-call 
  */
  const id = uuid();

  const newPatientEntry = {
    id,
    name: object.name,
    dateOfBirth: object.dateOfBirth,
    ssn: object.ssn,
    gender: object.gender,
    occupation: object.occupation,
    entries: []
  };

  patientsData.push(newPatientEntry);

  return newPatientEntry;
};

const addEntry = (patientId: string, object: EntryWithoutId): Entry => {

  const patient = patientsData.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('no patient with id: ' + patientId);
  }

  /* 
    eslint-disable 
    @typescript-eslint/no-unsafe-assignment, 
    @typescript-eslint/no-unsafe-call 
  */
  const id = uuid();

  const baseEntry = {
    id,
    description: object.description,
    date: object.date,
    specialist: object.specialist,
    ...(object.diagnosisCodes && { diagnosisCodes: object.diagnosisCodes }),
    type: object.type,
  };

  let newEntry: Entry;

  switch (object.type) {
    case 'HealthCheck':
      newEntry = {
        ...baseEntry,
        healthCheckRating: object.healthCheckRating,
      } as HealthCheckEntry;
      break;
    case 'Hospital':
      newEntry = {
        ...baseEntry,
        discharge: object.discharge,
      } as HospitalEntry;
      break;
    case 'OccupationalHealthcare':
      newEntry = {
        ...baseEntry,
        employerName: object.employerName,
        ...(object.sickLeave && {sickLeave: object.sickLeave}),
      } as OccupationalHealthcareEntry;
      break;
    default:
      return assertNever(object);
  }

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getData,
  getFilteredData,
  addData,
  findById,
  addEntry,
};
