import axios from 'axios';
import { fillUserInfo } from 'lib/Store/slices/UserSlice';
import Toast from 'react-native-toast-message';
import resLoginFace from 'types/interfaces/responses/resLoginFace';

type formvaluesFace = {
  identifier: string;
  password: string;
};

export const handleLogin = async (formvalues: formvaluesFace) => {
  try {
    const res = await axios.post(`${process.env.BASE_URL}/users/login/`);
    const data: resLoginFace = res.data.data;
    fillUserInfo({ userToken: data.userToken, userData: data.userData });
    console.log(data);
  } catch (err) {}
};
