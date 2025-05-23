import { Provider } from 'react-redux';
import { store } from '../lib/Store/index';
import AuthProvider from "../providers/AuthProvider"
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css'

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <AuthProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Stack screenOptions={{ headerShown: false }} />
                    </SafeAreaView>
                </AuthProvider>
            </Provider>
        </SafeAreaProvider>
    );
}