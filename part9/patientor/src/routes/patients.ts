import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.send(patientsService.getFilteredData());
});

export default router;