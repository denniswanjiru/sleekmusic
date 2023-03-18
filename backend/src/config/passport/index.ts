import jwtStartegy from './strategies/jwt';

const auth = {
  init() {
    jwtStartegy();
  },
};

export default auth;
