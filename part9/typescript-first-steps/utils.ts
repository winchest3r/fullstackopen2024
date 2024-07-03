// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => {
  return isNaN(Number(argument));
};

export const processError = (error: unknown): void => {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};
