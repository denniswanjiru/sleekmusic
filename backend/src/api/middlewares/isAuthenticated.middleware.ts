import ApiError from '@api/utils/errors/ApiError';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
): any => {
  if (req.isAuthenticated()) return next();
  throw new ApiError(StatusCodes.BAD_REQUEST, 'invalid token');
};

export default isAuthenticated;
