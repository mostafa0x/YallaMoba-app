import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import { Provider } from 'react-redux';
import { store } from '../lib/Store/index';
import AuthProvider from '../providers/AuthProvider';
import { Stack, usePathname } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProvidersContexts from 'contexts/ProvidersContexts';
import Toast from 'react-native-toast-message';
import BottomNav from 'components/bottomNav';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ActionSheet from 'providers/ActionSheet';
import { PaperProvider } from 'react-native-paper';

const query = new QueryClient();
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
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
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
