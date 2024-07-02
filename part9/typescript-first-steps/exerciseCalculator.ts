import { isNotNumber, processError } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface TargetAndDaysArgs {
  target: number;
  days: number[];
}

const parseTargetAnddaysArguments = (args: string[]): TargetAndDaysArgs => {
  if (args.length < 4)
    throw new Error("Not enough arguments. Target and Days is needed");

  if (isNotNumber(args[2])) throw new Error("Target is not a number");

  const days: string[] = args.slice(3, args.length);
  if (days.filter((d) => isNotNumber(d)).length > 0) {
    throw new Error("All days shoud be numbers");
  }

  return {
    target: Number(args[2]),
    days: days.map((d) => Number(d)),
  };
};

const calculateExercises = (days: number[], target: number): Result => {
  let result: Result = {
    periodLength: days.length,
    trainingDays: days.filter((d) => d > 0).length,
    success: days.filter((d) => d > target).length === days.length,
    rating: 0,
    ratingDescription: "none",
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
        ratingDescription: "Perfect. Good job!",
      };
    case 2:
      return {
        ...result,
        ratingDescription: "Not bad, but could be better.",
      };
    case 1:
      return {
        ...result,
        ratingDescription: "Not enough activities!",
      };
    default:
      throw new Error("Unaccepted rating.");
  }
};

try {
  const { target, days } = parseTargetAnddaysArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  processError(error);
}
