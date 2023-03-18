import jwt from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';

import config from '@config/config';
import ApiError from '@api/utils/errors/ApiError';

function verifyJWT(
    token: string,
    type = 'authentication',
): boolean {
  const decoded: any = jwt.verify(
      token,
      config.jwtSecret,
  );

  console.log({decoded});
  console.log({now: Date.now()});

  if (decoded.exp && Date.now() > decoded.exp) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `invalid ${type} token`);
  }

  return !!decoded;
};

export default verifyJWT;
