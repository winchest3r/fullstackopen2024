import diagnosesData from '../../data/diagnosesData';

import { Diagnosis } from '../types';

const getData = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getData
};