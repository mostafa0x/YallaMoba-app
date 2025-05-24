import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import { handleLogin } from 'utils/helpers/handleLogin';
import { validationSchema } from 'lib/Validations/LoginSchema';
import TextField from 'components/form/TextField';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'contexts/Auth/authContext';
import Toast from 'react-native-toast-message';

export default function Login() {
    const { isSubmiting, setIsSubmiting } = useContext(authContext)

    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: ""

        }, validationSchema, onSubmit: handleLogin
    })

    useEffect(() => {

        return () => {
            setIsSubmiting(false)
        }
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 10 }}>
            <Text className='text-blue-500 text-5xl text-center py-16 animate-shake animate-infinite'>Yalla Moba</Text>
            <TextField name='identifier' label="Email or Username" placeholder="enter you email or username" formik={formik} />
            <TextField name='password' label="Password" placeholder="enter you password" formik={formik} secureTextEntry={"secureTextEntry"} />
            <Button buttonColor='green' textColor='white' loading={isSubmiting} onPress={() => {
                setIsSubmiting(true)
                formik.handleSubmit()
                Toast.show({
                    type: 'success',
                    text1: 'تم الحفظ بنجاح',
                    text2: 'تم حفظ البيانات بنجاح',
                    visibilityTime: 2000,
                });
            }}
            >Login</Button>
            <Text className='pt-4'>i not have account , <Link href="/register">
                <Text style={{ textDecorationLine: 'underline' }}>Create Now</Text>
            </Link></Text>

        </View>
    );
}