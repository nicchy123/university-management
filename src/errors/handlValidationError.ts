import mongoose, { Error as MongooseError } from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  err: MongooseError.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error.path,
        message: error.message,
      };
    },
  );
  const statusCode = 400;
  return {
    message: 'validation errror',
    errorMessages: errors,
    statusCode,
  };
};

export default handleValidationError;
