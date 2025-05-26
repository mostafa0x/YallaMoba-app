import { Slot, Redirect, useRouter, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from '../types/interfaces/store/StateFace';
import { useEffect, useState } from 'react';
import { changeUserLoading } from 'lib/Store/slices/UserSlice';
import SpinnerLoading from 'components/SpinnerLoading';
import { getUserInfo } from 'services/storage';
import { ActivityIndicator, View } from 'react-native';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { userToken, userLoading } = useSelector((state: StateFace) => state.UserReducer);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        let isMounted = true;
        const timer = setTimeout(() => {
            getUserInfo(dispatch).finally(() => {
                if (isMounted) setIsReady(true);
            });
        }, 250);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!isReady) return;
        console.log(path);

        const authRoute = ['/'];
        const publicRoutes = ['/login', '/signup', '/+not-found'];
        const isPublicRoute = publicRoutes.includes(path);
        const isAuthRoute = authRoute.includes(path)

        if (isPublicRoute) {
            if (userToken) {
                router.replace('/');
            }
            dispatch(changeUserLoading(false));
        } else if (!userToken) {
            if (isAuthRoute) {
                router.replace('/login');

            }
        } else if (isAuthRoute) {
            dispatch(changeUserLoading(false));
        }
    }, [path, isReady, userToken]);

    if (!isReady || userLoading) {
        return <SpinnerLoading />;
    }

    return children
}