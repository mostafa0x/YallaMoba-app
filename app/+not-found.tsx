// app/[...not-found].tsx
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, Button, View } from 'react-native';

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <View className='flex-1 justify-center'>
            <Text className='text-6xl text-center'>Not Found Page</Text>
            <View className='w-52 mt-56 ml-[160px]'>
                <Button
                    title="Back to Home"
                    onPress={() => router.replace('/')}
                />
            </View>

        </View>
    );
}

