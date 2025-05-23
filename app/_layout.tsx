import { Stack } from 'expo-router';
import '../global.css';
import BottomNav from 'components/bottomNav';

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            <BottomNav />
        </>
    );
}