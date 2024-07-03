interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (days: number[], target: number): Result => {
  const result: Result = {
    periodLength: days.length,
    trainingDays: days.filter((d) => d > 0).length,
    success: days.filter((d) => d > target).length === days.length,
    rating: 0,
    ratingDescription: 'none',
    target: target,
    average: days.reduce((a, b) => a + b) / days.length,
  };

  result.rating = Math.max(
    1,
    Math.floor(3 * (result.trainingDays / result.periodLength))
  );

  switch (result.rating) {
    case 3:
      return {
        ...result,
        ratingDescription: 'Perfect. Good job!',
      };
    case 2:
      return {
        ...result,
        ratingDescription: 'Not bad, but could be better.',
      };
    case 1:
      return {
        ...result,
        ratingDescription: 'Not enough activities!',
      };
    default:
      throw new Error('Unaccepted rating.');
  }
};