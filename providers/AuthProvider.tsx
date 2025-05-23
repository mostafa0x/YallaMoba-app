import { Slot, Redirect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from '../types/interfaces/store/StateFace';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { changeUserLoading } from 'lib/Store/slices/UserSlice';

export default function AuthProvider({ children }: any) {
    const { userToken, userLoading } = useSelector((state: StateFace) => state.UserReducer);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const router = useRouter()
    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (isReady) {
            if (!userToken) {
                dispatch(changeUserLoading(false));
                router.replace("/login")
                // <Redirect href="/login" />;
            }
        }
    }, [isReady]);

    if (userLoading || !isReady) {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }



    return children
}