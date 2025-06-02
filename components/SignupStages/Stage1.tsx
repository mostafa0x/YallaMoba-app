import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import TextField from 'components/form/TextField';
import { Button } from 'react-native-paper';

interface props {
  formik: any;
  setCurrStage: any;
}

export default function Stage1({ setCurrStage, formik }: props) {
  return (
    <View className="flex-1 justify-center bg-white">
      <View className="m-10">
        <TextField label={'username'} name={'username'} placeholder={''} formik={formik} />
        <TextField label={'email'} name={'email'} placeholder={''} formik={formik} />
        <TextField label={'password'} name={'password'} placeholder={''} formik={formik} />
        <TextField label={'repasword'} name={'repassword'} placeholder={''} formik={formik} />
        <View className="m-5">
          <Button
            onPress={() => setCurrStage((current: number) => current + 1)}
            buttonColor="green"
            textColor="white">
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
