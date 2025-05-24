import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
    return (
        <View className='flex-1 justify-center items-center'>
            <Text>On Working !</Text>
            {/* <Link href="/about">Go to Aboutxx Page</Link> */}
        </View>
    );
}