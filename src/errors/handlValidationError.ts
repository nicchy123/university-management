import mongoose, { Error as MongooseError } from 'mongoose';
import { IGenericErorMessage } from '../interfaces/error';
import { IGenericErrorRespose } from '../interfaces/common';

const handleValidationError = (
  err: MongooseError.ValidationError,
): IGenericErrorRespose => {
  const errors: IGenericErorMessage[] = Object.values(err.errors).map(
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
