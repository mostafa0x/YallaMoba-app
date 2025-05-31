import { View, Text } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import { handleLogin } from 'services/handleLogin';
import { validationSchema } from 'lib/Validations/LoginSchema';
import TextField from 'components/form/TextField';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'contexts/Auth/authContext';
import { useDispatch } from 'react-redux';
import { changeUserLoading } from 'lib/Store/slices/UserSlice';
import { Image } from 'expo-image';

export default function Login() {
  const { isSubmiting, setIsSubmiting, apiError, setApiError } = useContext(authContext);
  const dispatch = useDispatch();
  const path = usePathname();
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema,
    onSubmit: SubmitLogin,
  });

  async function SubmitLogin(formvalues: any) {
    setApiError(null);
    setIsSubmiting(true);
    try {
      await handleLogin(formvalues, dispatch, path);
    } catch (err: any) {
      setApiError(err);
      setIsSubmiting(false);
    } finally {
      //empty
    }
  }

  useEffect(() => {
    dispatch(changeUserLoading(false));
    return () => {
      setIsSubmiting(false);
    };
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 10 }}>
      <View className=" absolute left-[0px] top-[310px]">
        <Image
          contentFit="contain"
          style={{ width: 200, height: 150 }}
          source={require('../../../assets/laylaIntro.png')}
        />
      </View>

      <Text className="animate-shake animate-infinite py-16 pl-5 text-center text-5xl text-blue-500">
        Yalla Moba
      </Text>
      <TextField
        name="identifier"
        label="Email or Username"
        placeholder="enter you email or username"
        formik={formik}
      />
      <TextField
        name="password"
        label="Password"
        placeholder="enter you password"
        formik={formik}
      />
      <Button
        buttonColor="green"
        textColor="white"
        loading={isSubmiting}
        disabled={isSubmiting}
        onPress={() => {
          formik.handleSubmit();
        }}>
        Login
      </Button>
      {apiError && <Text className="text-center text-lg text-red-500">{apiError}</Text>}
      <Text className="pt-4">
        i not have account ,{' '}
        <Link href="/Register">
          <Text style={{ textDecorationLine: 'underline' }}>Create Now</Text>
        </Link>
      </Text>
    </View>
  );
}
