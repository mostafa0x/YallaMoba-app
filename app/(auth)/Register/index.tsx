import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import TextField from 'components/form/TextField';
import { useFormik } from 'formik';
import { Image } from 'expo-image';
import HeroRole from 'components/HeroRole';
import DesHeroRole from 'components/DesHeroRole';
import { RoleFace } from 'types/interfaces/store/UserFace';

export default function Register() {
  const [currStage, setCurrStage] = useState(1);
  const [currRole, setCurrRole] = useState<RoleFace>('Roam');

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
      <View className="flex-1 justify-center bg-[#2d2564]">
        <View className=" absolute left-[130px] top-[50px]">
          <Text className="text-3xl font-extrabold text-white">
            {'become the shield '.toLocaleUpperCase()}
          </Text>
          <Text className="ml-6 text-3xl font-extrabold text-white">
            {' '}
            {'of your team '.toLocaleUpperCase()}
          </Text>
          <Text className="text-m ml-12 mt-6 text-yellow-200 opacity-70">
            {`master the ${currRole} role `.toLocaleUpperCase()}
          </Text>
        </View>
        <View className="absolute left-[5px] top-[160px] flex-row gap-2">
          <HeroRole Role={'Roam'} currRole={currRole} setCurrRole={setCurrRole} />
          <HeroRole Role={'Mid'} currRole={currRole} setCurrRole={setCurrRole} />
          <HeroRole Role={'Jungle'} currRole={currRole} setCurrRole={setCurrRole} />
          <HeroRole Role={'MM'} currRole={currRole} setCurrRole={setCurrRole} />
          <HeroRole Role={'Exp'} currRole={currRole} setCurrRole={setCurrRole} />
        </View>
        <View className="items-center">
          <View className="mt-[300px]">
            <DesHeroRole Role={currRole} />
          </View>
        </View>
        <View className="mt-32 items-center align-middle">
          <View className="">
            <Button
              labelStyle={{ fontSize: 20 }}
              style={{ borderRadius: 100 }}
              contentStyle={{ height: 60, width: 250 }}
              uppercase={true}
              buttonColor="#1a8d03"
              textColor="white">
              continue with {currRole !== 'Jungle' ? currRole : 'Jg'}
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
