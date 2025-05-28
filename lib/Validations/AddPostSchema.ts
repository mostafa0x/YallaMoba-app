import * as yup from 'yup';

export const validationSchemaAddPost = yup.object().shape({
  body: yup.string().required('Required !'),
  files: yup.object().required('Required !'),
});
