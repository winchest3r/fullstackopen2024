import { isNotNumber, processError } from "./utils";

interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4)
    throw new Error("Not enough arguments. Height and Weight is needed");
  if (args.length > 4)
    throw new Error("Too many arguments. Height and Weight is needed");

  if (isNotNumber(args[2])) throw new Error("Height is not number");
  if (isNotNumber(args[3])) throw new Error("Weight is not number");

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 16.0) {
    return "underweight (severe thinness)";
  } else if (bmi < 17.0) {
    return "underweight (moderate thinness)";
  } else if (bmi < 18.5) {
    return "underweight (mild thinness)";
  } else if (bmi < 25.0) {
    return "normal";
  } else if (bmi < 30.0) {
    return "overweight (pre-obese)";
  } else if (bmi < 35.0) {
    return "obese (class I)";
  } else if (bmi < 40.0) {
    return "obese (class II)";
  } else {
    return "obese (class III)";
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  processError(error);
}
