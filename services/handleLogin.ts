import axios from 'axios';
import callToast from 'components/toast';
import { API_BASE_URL } from 'config';
import { changeUserLoading, fillUserInfo } from 'lib/Store/slices/UserSlice';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import resLoginFace from 'types/interfaces/responses/resLoginFace';
import { storeUserInfo } from './storage';

type formvaluesFace = {
  identifier: string;
  password: string;
};

export const handleLogin = async (formValues: formvaluesFace, dispatch: any, path: any) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/login/`, formValues);
    const data: resLoginFace = res.data;
    dispatch(changeUserLoading(true));
    dispatch(fillUserInfo({ userToken: data.userToken, userData: data.userData }));
    await storeUserInfo(data.userToken, data.userData);
    console.log(data.userData);

    callToast({
      type: 'success',
      text1: 'Login',
      text2: 'You have logged in successfully',
    });
  } catch (err: any) {
    const errorMes = err.response.data.error ? err.response.data.error : 'Login error !';
    console.log(errorMes);
    callToast({ type: 'error', text1: 'Login', text2: errorMes, visibilityTime: 5000 });

    throw errorMes;
  }
};
