// lib/api/axiosClient.ts
import axios from 'axios';
import { API_BASE_URL } from 'config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const token = await AsyncStorage.getItem('@userToken');

// أنشئ نسخة مخصصة من axios
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// ✨ Interceptor لإضافة التوكن تلقائيًا
axiosClient.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
