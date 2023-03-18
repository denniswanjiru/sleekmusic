
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import mongoose from 'mongoose';

import ApiError from './ApiError';
import logger from '@config/logger';
import config from '@config/config';

export const errorConverter = (
    err: any,
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
        error.statusCode ||
        error instanceof mongoose.Error ?
        StatusCodes.BAD_REQUEST :
        StatusCodes.INTERNAL_SERVER_ERROR;

    const message: string = error.message || 'something went wrong.';
    error = new ApiError(statusCode, message);
  }

  next(error);
};

export const errorHandler = (
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
  let {statusCode, message} = err;

  if (config.env === 'prod') {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  res.locals['errorMessage'] = message;

  const response = {
    code: statusCode,
    message,
  };

  if (config.env === 'dev') {
    logger.error(err.message);
  }

  res.status(statusCode).send(response);
};
