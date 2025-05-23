import { View, Button, Text } from 'react-native';
import { Link } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import { handleLogin } from 'utils/helpers/handleLogin';
import { validationSchema } from 'lib/Validations/LoginSchema';
import TextField from 'components/form/TextField';
import { useContext, useState } from 'react';
import { authContext } from 'contexts/Auth/authContext';

export default function Login() {
    const { isSubmiting, setIsSubmiting } = useContext(authContext)

    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: ""

        }, validationSchema, onSubmit: handleLogin
    })
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 10 }}>
            <Text className='text-blue-500 text-5xl text-center py-16'>Yalla Moba</Text>
            <TextField name='identifier' label="Email or Username" placeholder="enter you email or username" formik={formik} />
            <TextField name='password' label="Password" placeholder="enter you password" formik={formik} secureTextEntry={"secureTextEntry"} />
            <Button onPress={() => formik.handleSubmit()}
                title="Login" />
            <Text className='pt-4'>i not have account , <Link href="/register">
                <Text style={{ textDecorationLine: 'underline' }}>Create Now</Text>
            </Link></Text>

        </View>
    );
}