import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import TextField from 'components/form/TextField';
import { useFormik } from 'formik';

export default function Register() {
  const [currStage, setCurrStage] = useState(1);
  async function handleRegister() {}
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      gender: '',
      role: '',
      password: '',
      repassword: '',
      avatar: '',
    },
    onSubmit: handleRegister,
  });

  if (currStage == 1) {
    return (
      <View className="flex-1 justify-center bg-white">
        <View className="m-10">
          <TextField label={'username'} name={'username'} placeholder={''} formik={formik} />
          <TextField label={'email'} name={'email'} placeholder={''} formik={formik} />
          <TextField label={'password'} name={'password'} placeholder={''} formik={formik} />
          <TextField label={'repasword'} name={'repassword'} placeholder={''} formik={formik} />
          <View className="m-5">
            <Button
              onPress={() => setCurrStage((current) => current + 1)}
              buttonColor="green"
              textColor="white">
              Next
            </Button>
          </View>
        </View>
      </View>
    );
  }

  if (currStage == 2) {
    return (
      <View className="flex-1 justify-center bg-white">
        <View className="m-10">
          <Text>22222</Text>
        </View>
      </View>
    );
  }
}
