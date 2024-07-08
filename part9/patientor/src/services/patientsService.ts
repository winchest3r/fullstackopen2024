import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patientsData';

import { Patient, NewPatient } from '../types';

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

export default {
  getData,
  getFilteredData,
  addData,
  findById,
};
