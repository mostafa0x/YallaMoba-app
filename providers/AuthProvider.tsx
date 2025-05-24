import { Slot, Redirect, useRouter, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from '../types/interfaces/store/StateFace';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { changeUserLoading } from 'lib/Store/slices/UserSlice';
import SpinnerLoading from 'components/spinnerLoading';
import { getUserInfo } from 'services/storage';

export default function AuthProvider({ children }: any) {
    const { userToken, userLoading } = useSelector((state: StateFace) => state.UserReducer);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const router = useRouter()
    const path = usePathname()

    async function cheackStore() {
        await getUserInfo(dispatch)
        setIsReady(true);

    }
    useEffect(() => {
        const TimeOut = setTimeout(() => {
            cheackStore()
        }, 250);

        return () => {
            clearTimeout(TimeOut)
            setIsReady(false)
        }
    }, []);

    useEffect(() => {

        if (["/login"].includes(path) && isReady) {
            if (!userToken) {
                dispatch(changeUserLoading(false))
            } else if (userToken) {
                router.replace("/")
                dispatch(changeUserLoading(false))
            }
        }
        if (["/"].includes(path) && isReady) {
            if (!userToken) {
                router.replace("/login")
            }
        } else if (userToken) {
            dispatch(changeUserLoading(false))

        }



    }, [path, isReady, userToken, router]);





    return !userLoading ? children : <SpinnerLoading />
}