import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: String,
    username: String,
    email: String,
    gender: String,
    dob: String,
    password: String,
    name: String,
  },
  { collection: "users" }
);

export default userSchema;
