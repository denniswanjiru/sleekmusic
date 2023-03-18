import express from "express";
import logger from "morgan";
import cors from "cors";
import passport from "passport";
import { StatusCodes } from "http-status-codes";

import database from "@db/*";
import routes from "@api/routes";
import auth from "@config/passport";
import config from "@config/config";
import { DataSource } from "./interfaces";
import ApiError from "@api/utils/errors/ApiError";
import { errorConverter, errorHandler } from "@api/utils/errors";
import jwtStartegy, { jwtVerify } from "@config/passport/strategies/jwt";
import { Strategy, ExtractJwt } from "passport-jwt";

function makeApp() {
  const app = express();
  const router = express.Router();
  const dataSource: DataSource = {
    db: database,
  };

  app.use(cors());
  app.use(express.json());
  app.use(logger(config.env));
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(
    "jwt",
    passport.use(
      new Strategy(
        {
          secretOrKey: "secret",
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        jwtVerify
      ) as any
    )
  );
  // auth.init();

  app.use("/api", routes(router, dataSource));

  // send back a 404 error for any unknown api request
  app.use((_req, _res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  return app;
}

export default makeApp;
