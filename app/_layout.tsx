import { Stack } from 'expo-router';
import '../global.css';
import BottomNav from 'components/bottomNav';
import { Provider } from 'react-redux';
import { store } from 'lib/Store';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }} />
            <BottomNav />
        </Provider>
    );
}