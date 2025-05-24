// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fillUserInfo } from 'lib/Store/slices/UserSlice';
import { userDataFace } from 'types/interfaces/store/UserFace';

export const storeUserInfo = async (userToken: string, userData: userDataFace) => {
  try {
    await AsyncStorage.multiSet([
      ['@userData', JSON.stringify(userData)],
      ['@userToken', userToken],
    ]);
  } catch (error) {
    console.error('Error saving user info:', error);
  }
};

export const getUserInfo = async (dispatch: any) => {
  try {
    const store = await AsyncStorage.multiGet(['@userToken', '@userData']);
    const [userToken, userDataRaw] = store.map((item) => item[1]);
    const userData = userDataRaw ? await JSON.parse(userDataRaw) : null;
    dispatch(fillUserInfo({ userToken, userData }));
  } catch (error) {
    console.error('Error reading user info:', error);
    return null;
  }
};

export const clearUserInfo = async () => {
  try {
    await AsyncStorage.multiRemove(['@userToken', '@userData']);
    return true;
  } catch (error) {
    console.error('Error clearing user info:', error);
    throw `Error clearing user info:, ${error}`;
  }
};
