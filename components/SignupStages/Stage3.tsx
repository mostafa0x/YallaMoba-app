import { View, Text } from 'react-native';
import React from 'react';
import EditAvatar from 'components/form/EditAvatar';
import TextField from 'components/form/TextField';
import { Button } from 'react-native-paper';

interface props {
  setCurrStage: any;
  formik: any;
}

export default function Stage3({ setCurrStage, formik }: props) {
  return (
    <View className="flex-1 bg-[#2d2564]">
      <View className="ml-18 mt-28 items-center">
        <Text className="item text-4xl text-yellow-400">{'profile.'.toLocaleUpperCase()}</Text>
      </View>
      <View className="m-16  mt-[126px]">
        <EditAvatar currStage={3} />
      </View>
      <View className=" items-center">
        <View className=" mt-28">
          <View className="w-[250px]">
            <Text className="mb-2 text-[11px] text-gray-300 opacity-50">
              no one can take exits names
            </Text>
            <TextField
              label={'username'}
              name={'username'}
              placeholder={'username'}
              formik={formik}
            />
          </View>
        </View>
        <View className="mt-20">
          <Button buttonColor="green" textColor="white" contentStyle={{ width: 250, height: 60 }}>
            Join
          </Button>
        </View>
      </View>
    </View>
  );
}
