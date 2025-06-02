import * as yup from 'yup';

export const SignUpvalidationSchema = yup.object().shape({
  username: yup.string().min(6, 'to Short !').max(14, 'Max 14').required('Required!'),
  email: yup.string().email('invaild Email!').required('Required!'),
  gender: yup.string().required('Requird!'),
  role: yup.string().required('Requird!'),
  password: yup.string().min(8, 'to short!').required('Requird!'),
  repassword: yup
    .string()
    .required('Requird!')
    .oneOf([yup.ref('password')], 'doesnt match with your password!'),
  avatar: yup.string().required('Requird!'),
});
