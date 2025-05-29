import '../global.css'
import { Provider } from 'react-redux';
import { store } from '../lib/Store/index';
import AuthProvider from "../providers/AuthProvider"
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProvidersContexts from 'contexts/ProvidersContexts';
import Toast from 'react-native-toast-message';
import BottomNav from 'components/bottomNav';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ActionSheet from 'providers/ActionSheet';




const query = new QueryClient()
export default function RootLayout() {

    return (
        <QueryClientProvider client={query}>
            <SafeAreaProvider>
                <Provider store={store}>
                    <ProvidersContexts>
                        <AuthProvider>
                            <SafeAreaView style={{ flex: 1 }}>
                                <ActionSheet>
                                    <>
                                        <Stack screenOptions={{ headerShown: false }} />
                                        <BottomNav />
                                        <Toast />
                                    </>
                                </ActionSheet>
                            </SafeAreaView>
                        </AuthProvider>
                    </ProvidersContexts>
                </Provider>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}