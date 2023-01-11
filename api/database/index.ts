import DB_URL from "../config/db.config";

const mongoose = require("mongoose");

console.log({ DB_URL });

mongoose.set("strictQuery", true);
mongoose.connect(DB_URL.url);

const db = mongoose.connection;
db.once("error", () => console.log("Mongo connection error"));
db.once("open", () => console.log("Mongo connection successed"));

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: "users" }
);

const Models = {
  User: mongoose.model("User", userSchema),
};

export default Models;
