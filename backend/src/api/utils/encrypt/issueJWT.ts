import {ObjectId} from 'mongoose';
import jwt from 'jsonwebtoken';

import config from '@config/config';

type Sub = {
  _id: ObjectId;
  username: String;
  email: String;
};

const issueJWT = (sub: Sub, expiresIn = config.tokenExp) => {
  const payload = {
    sub,
    iat: Date.now(),
  };
  console.log({now: new Date()});

  const signedToken = jwt.sign(
      payload,
      config.jwtSecret,
      {expiresIn},
  );

  console.log({signedToken});

  return {
    token: signedToken,
    expires: expiresIn,
  };
};

export default issueJWT;
