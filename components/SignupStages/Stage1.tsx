import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import TextField from 'components/form/TextField';
import { Button, Checkbox } from 'react-native-paper';

interface props {
  formik: any;
  handleSetCurrStage: any;
}

export default function Stage1({ handleSetCurrStage, formik }: props) {
  const onStage = 1;

  return (
    <View className="flex-1  bg-[#2d2564]">
      <View className="mt-48 items-center">
        <Text className="text-5xl text-yellow-400">Create_Account.</Text>
      </View>
      <View className="m-10  flex-1 justify-center ">
        <TextField label={'email'} name={'email'} placeholder={''} formik={formik} />
        <TextField label={'password'} name={'password'} placeholder={''} formik={formik} />
        <TextField label={'repasword'} name={'repassword'} placeholder={''} formik={formik} />

        <View className="m-16">
          <Button onPress={() => handleSetCurrStage(onStage)} buttonColor="green" textColor="white">
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
