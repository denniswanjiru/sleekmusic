

import validate from '@api/middlewares/validate.middleware';
import {AppRouter} from '@sleek-types/index';
import makeAuthController from '@api/controllers/auth.controllers';
import {DataSource} from '@interfaces/index';
import {register} from '@api/validations/user.validations';
import {verifyEmail} from '@api/validations/auth.validations';

function makeAuthRouter(router: AppRouter, dataSource: DataSource) {
  const controller = makeAuthController(dataSource);

  router.post('/signup', validate(register), controller.signup);
  router.post('/signin', validate, controller.signin);
  router.get('/verify/:token', validate(verifyEmail), controller.verifyEmail);
  router.post('/signout', validate, controller.signup);

  return Object.freeze({
    router,
  });
}

export default makeAuthRouter;
