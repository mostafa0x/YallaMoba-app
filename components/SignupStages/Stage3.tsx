import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import EditAvatar from 'components/form/EditAvatar';
import TextField from 'components/form/TextField';
import { ActivityIndicator, Button } from 'react-native-paper';
import GenderList from 'components/GenderList';

interface props {
  handleSetCurrStage: any;
  formik: any;
  isSubmiting: boolean;
}

export default function Stage3({ handleSetCurrStage, formik, isSubmiting }: props) {
  return (
    <View className="flex-1 bg-[#2d2564]">
      <View className="ml-18 mt-28 items-center">
        <Text className="item text-4xl text-yellow-400">{'profile.'.toLocaleUpperCase()}</Text>
      </View>
      <View className="m-16  mt-[126px]">
        <EditAvatar formik={formik} currStage={3} />
      </View>
      <View className=" items-center">
        <GenderList formik={formik} gender={formik.values.gender} />

        <View className=" mt-20">
          <View className="w-[250px]">
            <Text className="mb-2 text-[11px] text-gray-300 opacity-50">
              no one can take exits names
            </Text>
            <TextField
              signup={true}
              label={'username'}
              name={'username'}
              placeholder={'username'}
              formik={formik}
            />
          </View>
        </View>
        <View className="mt-20">
          {isSubmiting ? (
            <ActivityIndicator animating={isSubmiting} size={100} />
          ) : (
            <TouchableOpacity onPress={() => formik.handleSubmit()}>
              <Button
                buttonColor="green"
                textColor="white"
                contentStyle={{ width: 250, height: 60 }}>
                Join
              </Button>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
