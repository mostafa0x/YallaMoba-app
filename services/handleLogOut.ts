import { changeUserLoading, fillUserInfo } from 'lib/Store/slices/UserSlice';
import { clearUserInfo } from './storage';
import callToast from 'components/toast';

export default async function handleLoutOut(dispath: any, router: any) {
  try {
    dispath(changeUserLoading(true));

    await clearUserInfo();
    dispath(fillUserInfo({ userData: null, userToken: null }));
    callToast({ type: 'success', text1: 'Yalla Moba', text2: 'Done Logotu' });
    router.push('/login');
  } catch (err) {
    console.log(err);
  }
}
