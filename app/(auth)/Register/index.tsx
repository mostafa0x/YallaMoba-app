import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import TextField from 'components/form/TextField';
import { useFormik } from 'formik';
import { Image } from 'expo-image';
import HeroRole from 'components/HeroRole';

export default function Register() {
  const [currStage, setCurrStage] = useState(1);
  const [currRole, setCurrRole] = useState('');

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
        <View className="items-center">
          <View className="flex-row gap-1">
            <HeroRole Role={'Roam'} currRole={currRole} setCurrRole={setCurrRole} />
            <HeroRole Role={'Mid'} currRole={currRole} setCurrRole={setCurrRole} />
            <HeroRole Role={'Jungle'} currRole={currRole} setCurrRole={setCurrRole} />
            <HeroRole Role={'MM'} currRole={currRole} setCurrRole={setCurrRole} />
            <HeroRole Role={'Exp'} currRole={currRole} setCurrRole={setCurrRole} />
          </View>
          <Text>22222</Text>
        </View>
      </View>
    );
  }
}
