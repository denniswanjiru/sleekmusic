import mongoose from "mongoose";

import config from "@config/config";
import makeUserModel from "@api/models/user.model";
import logger from "@config/logger";

mongoose.set("strictQuery", true);
mongoose.connect(config.databaseUrl);

const db = mongoose.connection;
db.once("error", (error: any) => logger.info("Mongo connection error", error));
db.once("open", () => logger.info("Mongo connection successed"));

const userModel = makeUserModel(mongoose);

const database = {
  User: userModel,
};

export default database;
