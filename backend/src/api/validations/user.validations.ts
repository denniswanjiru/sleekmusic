import {object, string, date} from 'yup';

// const query = {};

// const params = {
//   params: object().shape({
//     id: string().required(),
//   }),
// };

const body = {
  body: object().shape({
    username: string().required('username is required'),
    email: string().email('email must be valid').required('email is required'),
    dob: date().required('dob is required'),
    gender: string()
        .oneOf(['male', 'female', 'others'])
        .typeError('gender must be either male, female or other')
        .required('gender is required'),
    password: string().min(8).required('password is required'),
    name: string().min(2).required('name is required'),
  }),
};

export const register = object().shape({...body});
