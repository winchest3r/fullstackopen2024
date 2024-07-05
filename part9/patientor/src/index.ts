import express from 'express';
const app = express();

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';


app.use(express.json());
app.use(express.static('dist'));

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
