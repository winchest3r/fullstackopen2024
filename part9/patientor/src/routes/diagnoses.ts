import express from 'express';

import diagnosisService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_request, response) => {
  return response.send(diagnosisService.getData());
});

export default router;