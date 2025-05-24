// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const getUserInfo = async () => {
  try {
    const store = await AsyncStorage.multiGet(['@userToken', '@userData']);
    const [userToken, userData] = store.map((item) => item[1]);
    return {
      userToken,
      userData: userData ? JSON.parse(userData) : null,
    };
  } catch (error) {
    console.error('Error reading user info:', error);
    return null;
  }
};

export const clearUserInfo = async () => {
  try {
    await AsyncStorage.multiRemove(['userToken', 'userData']);
  } catch (error) {
    console.error('Error clearing user info:', error);
  }
};
