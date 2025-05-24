import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  identifier: yup.string().min(6, 'Minimum 6 letters !s').required('Required !'),
  password: yup.string().min(8, 'To Short !').required('Required !'),
});
