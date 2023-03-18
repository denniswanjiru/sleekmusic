import {object, string} from 'yup';

// const query = {};

const params = {
  params: object().shape({
    token: string().required(),
  }),
};


export const verifyEmail = object().shape({...params});
