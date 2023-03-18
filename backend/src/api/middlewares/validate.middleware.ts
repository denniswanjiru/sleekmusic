import {NextFunction, Request, Response} from 'express';

import logger from '@config/logger';
import {StatusCodes} from 'http-status-codes';

function validate(schema: any) {
  return async function(req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      logger.error(error);
      res.status(StatusCodes.BAD_REQUEST);
      return res.json({success: false, error});
    }
  };
}

export default validate;
