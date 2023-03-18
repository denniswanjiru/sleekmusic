import validator from "validator";
import bcrypt from "bcrypt";

import { DataAdaptor } from "@sleek-types/index";
import { IUserDoc, IUserModel } from "@interfaces/index";

function makeUserModel(dataAdaptor: DataAdaptor): IUserModel {
  const schema = new dataAdaptor.Schema<IUserDoc, IUserModel>(
    {
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email");
          }
        },
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
        trim: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validator(value: string) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error(
              "Password must contain at least one letter and one number"
            );
          }
        },
        private: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  // schema.plugin(toJSON);
  // schema.plugin(paginate);

  schema.static(
    "isEmailTaken",
    async function (email: string): Promise<boolean> {
      // eslint-disable-next-line no-invalid-this
      const user = await this.findOne({ email });
      return !!user;
    }
  );

  schema.static(
    "isUsernameTaken",
    async function (username: string): Promise<boolean> {
      // eslint-disable-next-line no-invalid-this
      const user = await this.findOne({ username });
      return !!user;
    }
  );

  schema.method(
    "isPasswordMatch",
    async function (password: string): Promise<boolean> {
      // eslint-disable-next-line no-invalid-this
      const user = this;
      return bcrypt.compare(password, user.password);
    }
  );

  schema.pre("save", async function (next) {
    // eslint-disable-next-line no-invalid-this
    const user = this;

    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return dataAdaptor.model<IUserDoc, IUserModel>("User", schema);
}

export default makeUserModel;
