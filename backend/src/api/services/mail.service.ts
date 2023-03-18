import logger from '@config/logger';
import nodemailer from 'nodemailer';

type MailOptions = {
    to: string
    subject: string
    body: string
}

function makeMailService() {
  async function sendMail(mailOptions: MailOptions) {
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'denniswanjiru71@gmail.com',
        pass: 'luyxygktgdclevbi',
      },
    });

    const mail = {
      from: 'denniswanjiru71@gmail.com',
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.body,
    };

    await mailTransporter.sendMail(mail);
    logger.info('mail sent');
  }

  return Object.freeze({
    sendMail,
  });
}


export default makeMailService;
