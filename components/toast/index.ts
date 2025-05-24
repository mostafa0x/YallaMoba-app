import Toast from 'react-native-toast-message';
interface ToastOptions {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2: string;
  visibilityTime?: number;
}

const defaultVisibilityTimeError = 5000;
const defaultVisibilityTimeSuccess = 3000;
const defaultVisibilityTimeInfo = 1500;

export default function callToast(options: ToastOptions) {
  const TimeShow = options.visibilityTime
    ? options.visibilityTime
    : options.type === 'error'
      ? defaultVisibilityTimeError
      : options.type === 'success'
        ? defaultVisibilityTimeSuccess
        : defaultVisibilityTimeInfo;

  Toast.show({
    type: options.type,
    text1: options.text1,
    text2: options.text2,
    visibilityTime: TimeShow,
  });
}
