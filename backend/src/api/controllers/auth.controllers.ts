import {Response, Request} from 'express';
import {StatusCodes} from 'http-status-codes';

import {DataSource} from '@interfaces/index';
import makeUserService from '@api/services/user.service';
import makeMailService from '@api/services/mail.service';
import encrypt from '@api/utils/encrypt';
import config from '@config/config';
import catchAsync from '@api/utils/catchAsync';

function makeAuthController(dataSource: DataSource) {
  const userService = makeUserService(dataSource);
  const mailService = makeMailService();

  const signup = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);
    const jwt = encrypt.issueJWT({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    const verifyUrl = `${config.apiBaseUrl}/auth/verify/${jwt.token}`;

    const mailOptions = {
      to: user.email,
      subject: 'Verify your email.',
      // eslint-disable-next-line max-len
      body: `<p>Hello ${user.name},</p><p>Please click the link below to activate your account.</p><p><a href="${verifyUrl}">activate your account</a></p>`,
    };

    await mailService.sendMail(mailOptions);

    res.status(StatusCodes.CREATED).send({user});
  });

  async function signin() {

  };

  async function singout() {};

  async function forgotPassword() {};

  async function resetPassword() {};

  async function sendVerificationEmail() {};

  const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const {token} = req.params;
    console.log({token});
    encrypt.verifyJWT(token, 'email verification');
    res.status(StatusCodes.OK);
    res.send({message: 'email has been successfully verified'});
  });

  return Object.freeze({
    signin,
    signup,
    singout,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
  });
}

export default makeAuthController;
