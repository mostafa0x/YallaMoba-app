import axios from 'axios';
import Toast from 'react-native-toast-message';

type formvaluesFace = {
  identifier: string;
  password: string;
};

export const handleLogin = async (formvalues: formvaluesFace) => {
  try {
    const res = await axios.post(`${process.env.BASE_URL}/users/login/`);
    console.log(res.data);
  } catch (err) {}
};
