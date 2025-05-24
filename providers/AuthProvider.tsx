import { Slot, Redirect, useRouter, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from '../types/interfaces/store/StateFace';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { changeUserLoading } from 'lib/Store/slices/UserSlice';
import SpinnerLoading from 'components/spinnerLoading';

export default function AuthProvider({ children }: any) {
    const { userToken, userLoading } = useSelector((state: StateFace) => state.UserReducer);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const router = useRouter()
    const path = usePathname()
    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (isReady && ["/"].includes(path)) {
            if (!userToken) {
                router.replace("/login")
            }
        }
        if (["/login"].includes(path) && isReady) {
            if (!userToken) {
                if (["/login"].includes(path) && isReady) {
                    dispatch(changeUserLoading(false))
                } else {
                    router.replace("/")
                }
            }
        }

    }, [path, isReady]);



    // if (userLoading || !isReady) {

    //     return (
    //         <SpinnerLoading />
    //     );
    // }

    // if (userLoading && isReady) {
    //     if (userToken) {
    //         path == "login" ? router.replace("/") : null
    //     }
    //     return (
    //         <SpinnerLoading />
    //     );
    // }
    // if (userLoading) {
    //     return (
    //         <SpinnerLoading />
    //     );
    // }



    return !userLoading ? children : <SpinnerLoading />
}