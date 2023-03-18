import {Strategy, ExtractJwt} from 'passport-jwt';
import passport from 'passport';

import makeUserService from '@api/services/user.service';
import config from '@config/config';
import database from '@db/*';

const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algprithms: ['RS256'],
};

export const jwtVerify = async (payload: any, next: any) => {
  try {
    const userService = makeUserService({db: database});
    const user = userService.getUser(payload.sub._id);

    if (user) return next(null, user);

    return next(null, false);
  } catch (error) {
    return next(error, false);
  }
};

const jwtStartegy = () => {
  return new Strategy(options, jwtVerify);
};

export default jwtStartegy;
