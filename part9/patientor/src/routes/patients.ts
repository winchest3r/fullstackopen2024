import express from 'express';

import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.send(patientsService.getFilteredData());
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  const patient = patientsService.findById(id);
  if (patient) {
    response.send(patient);
  } else {
    response.status(400).send({ error: 'Unavailable patient id'});
  }
});

router.post('/', (request, response) => {
  try {
    const newPatientEntry = toNewPatient(request.body);
    const addedPatient = patientsService.addData(newPatientEntry);
    response.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong with patient post.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    response.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (request, response) => {
  try {
    const newEntry = toNewEntry(request.body);
    const addedEntry = patientsService.addEntry(request.params.id, newEntry);
    response.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong with entry post.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    response.status(400).send({ error: errorMessage });
  }
});

export default router;