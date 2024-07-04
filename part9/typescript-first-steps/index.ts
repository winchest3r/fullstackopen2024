import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  try {
    const [height, weight] = [
      Number(request.query.height),
      Number(request.query.weight),
    ];

    if (!height || !weight) {
      throw new Error('Can\'t use or find height/weight parameter(s)');
    }

    const bmi = calculateBmi(height, weight);

    return response.json({
      height,
      weight,
      bmi,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
  }
  return response.status(400).json({ error: 'unreachable' });
});

app.post('/exercises', (request, response) => {
  if (!request.body) {
    return response.status(400).json({ error: 'parameters missing'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = request.body;

  if (!daily_exercises || !target) {
    return response.status(400).json({ error: 'parameters missing'});
  }

  if (isNaN(Number(target))) {
    return response.status(400).json({ error: 'target should be a number'});
  }

  for (const val of daily_exercises) {
    console.log(val);
    if (isNaN(Number(val))) {
      return response.status(400).json({ error: 'all daily exercises should be numbers'});
    }
  }

  try {
    const result = calculateExercises(daily_exercises as number[], target as number);
    return response.json(result);
  } catch (error: unknown) {
    return response.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
