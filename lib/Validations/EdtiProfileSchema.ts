import * as yup from 'yup';

export const validationSchemaProfile = yup.object().shape({
  username: yup.string().min(6, 'Minimum 6 letters !').required('Required !'),
  avatar: yup.string().required('Required !'),
  role: yup.string().required('Required !'),
});
