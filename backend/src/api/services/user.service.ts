import ApiError from '@api/utils/errors/ApiError';
import {DataSource, IUserDoc} from '@interfaces/index';
import {StatusCodes} from 'http-status-codes';
import {ObjectId} from 'mongoose';

function makeUserService(dataSource: DataSource) {
  const User = dataSource.db.User;

  async function registerUser(userBody: any): Promise<IUserDoc> {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'email is already taken');
    }

    if (await User.isUsernameTaken(userBody.username)) {
      throw new ApiError(
          StatusCodes.BAD_REQUEST, 'username is already taken',
      );
    }

    return await User.create(userBody);
  }

  async function getUser(userId: ObjectId) {
    return await User.findOne({_id: userId});
  }

  return Object.freeze({
    registerUser,
    getUser,
  });
}

export default makeUserService;
