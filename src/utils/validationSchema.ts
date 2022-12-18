import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Please enter your phone'),
  password: Yup.string().required('Please enter your account password'),
});
