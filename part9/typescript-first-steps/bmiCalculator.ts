export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 16.0) {
    return 'underweight (severe thinness)';
  } else if (bmi < 17.0) {
    return 'underweight (moderate thinness)';
  } else if (bmi < 18.5) {
    return 'underweight (mild thinness)';
  } else if (bmi < 25.0) {
    return 'normal';
  } else if (bmi < 30.0) {
    return 'overweight (pre-obese)';
  } else if (bmi < 35.0) {
    return 'obese (class I)';
  } else if (bmi < 40.0) {
    return 'obese (class II)';
  } else {
    return 'obese (class III)';
  }
};