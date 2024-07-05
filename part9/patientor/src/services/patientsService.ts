import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patientsData';

import { Patient, FilteredPatientEntry, NewPatientEntry } from '../types';

const getData = (): Patient[] => {
  return patientsData;
};

const getFilteredData = (): FilteredPatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addData = (object: NewPatientEntry): Patient => {
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
    occupation: object.occupation
  };

  patientsData.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getData,
  getFilteredData,
  addData,
};
