import comparePassword from './comparePassword';
import hashPassword from './hashPassword';
import issueJWT from './issueJWT';
import verifyJWT from './verifyJWT';

export default Object.freeze({
  issueJWT,
  verifyJWT,
  hashPassword,
  comparePassword,
});
