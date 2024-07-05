import express from 'express';

import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.send(patientsService.getFilteredData());
});

router.post('/', (request, response) => {
  try {
    const newPatientEntry = toNewPatient(request.body);
    const addedPatient = patientsService.addData(newPatientEntry);
    response.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    response.status(400).send({ error: errorMessage });
  }
});

export default router;