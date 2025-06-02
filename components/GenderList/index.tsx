import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-paper';

interface props {
  gender: string;
  formik: any;
}
export default function GenderList({ gender, formik }: props) {
  const [genderx, setGenderX] = useState('Male');
  function ChangeGender() {
    if (formik.values.gender == 'Male') {
      formik.setFieldValue('gender', 'Famale');
      setGenderX('Famale');
    } else {
      formik.setFieldValue('gender', 'Male');
      setGenderX('Male');
    }
  }
  return (
    <View className=" items-center justify-center">
      <View className="flex-row gap-10">
        <TouchableOpacity onPress={ChangeGender}>
          <Text className="text-[80px] font-light text-white ">{'<'}</Text>
        </TouchableOpacity>
        <View className="">
          <Icon
            color={gender == 'Male' ? 'blue' : 'deeppink'}
            source={gender == 'Male' ? 'gender-male' : 'gender-female'}
            size={100}
          />
          <Text className="text-center text-sm text-white opacity-60">{gender}</Text>
        </View>
        <TouchableOpacity onPress={ChangeGender}>
          <Text className="text-[80px] font-light text-white ">{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
