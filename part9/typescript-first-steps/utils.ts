export const isNotNumber = (argument: any): boolean => {
  return isNaN(Number(argument));
};

export const processError = (error: unknown): void => {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
};
