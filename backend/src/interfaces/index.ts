import {Document, Model} from 'mongoose';

import database from '@db/*';

export interface DataSource {
    db: typeof database
}

export interface IUser {
    name: string
    email: string
    username: string
    dob: Date
    gender: string
    password: string
    isEmailVerified: boolean
}

export interface IUserDoc extends IUser, Document {
    isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string): Promise<boolean>;
  isUsernameTaken(username: string): Promise<boolean>;
}
