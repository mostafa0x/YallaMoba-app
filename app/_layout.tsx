import { Provider } from 'react-redux';
import { store } from '../lib/Store/index';
import AuthProvider from "../providers/AuthProvider"
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css'
import ProvidersContexts from 'contexts/ProvidersContexts';
import Toast from 'react-native-toast-message';
import BottomNav from 'components/bottomNav';


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ProvidersContexts>
                    <AuthProvider>
                        <SafeAreaView style={{ flex: 1 }}>
                            <Stack screenOptions={{ headerShown: false }} />
                            <BottomNav />
                            <Toast />
                        </SafeAreaView>
                    </AuthProvider>
                </ProvidersContexts>
            </Provider>
        </SafeAreaProvider>




    );
}