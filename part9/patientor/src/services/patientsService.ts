import patientsData from '../../data/patientsData';

import { Patient, FilteredPatientEntry } from '../types';

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

export default {
  getData,
  getFilteredData
};
