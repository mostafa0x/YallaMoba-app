import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import TextField from 'components/form/TextField';
import { Button } from 'react-native-paper';

interface props {
  formik: any;
  handleSetCurrStage: any;
}

export default function Stage1({ handleSetCurrStage, formik }: props) {
  const onStage = 1;

  function CheckAfterNext() {
    //   handleSetCurrStage(onStage);
  }
  return (
    <View className="flex-1 justify-center bg-white">
      <View className="m-10">
        <TextField label={'email'} name={'email'} placeholder={''} formik={formik} />
        <TextField label={'password'} name={'password'} placeholder={''} formik={formik} />
        <TextField label={'repasword'} name={'repassword'} placeholder={''} formik={formik} />
        <View className="m-5">
          <Button onPress={() => handleSetCurrStage(onStage)} buttonColor="green" textColor="white">
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
