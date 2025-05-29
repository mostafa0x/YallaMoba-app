import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';



export default function HomePage() {

    return (
        <View style={{ backgroundColor: "white" }} className='flex-1 justify-center items-center'>
            <Text className='text-red-600'>On Working zxxz</Text>

            {/* <Link href="/about">Go to Aboutxx Page</Link> */}
        </View>
    );
}