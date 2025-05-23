import { View, Button, Text } from 'react-native';
import { Link } from 'expo-router';
import { TextInput } from 'react-native-paper';

export default function Login() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 10 }}>
            <Text className='text-blue-500 text-5xl text-center py-16'>Yalla Moba</Text>
            <TextInput label="Email or Username" placeholder="enter you email or username" />
            <TextInput label="Password" placeholder="password" secureTextEntry />
            <Button title="Login" />
            <Text className='pt-4'>i not have account , <Link href="/register">
                <Text style={{ textDecorationLine: 'underline' }}>new account</Text>
            </Link></Text>

        </View>
    );
}