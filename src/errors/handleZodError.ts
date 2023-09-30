import { ZodError, ZodIssue } from 'zod';
import { IGenericRespose } from '../interfaces/common';
import { IGenericErorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericRespose => {
  const statusCode = 400;
  const errors: IGenericErorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  console.log(error);
  return {
    message: 'validation error',
    errorMessages: errors,
    statusCode,
  };
};

export default handleZodError;
