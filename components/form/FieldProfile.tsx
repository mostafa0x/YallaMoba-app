import React from "react";
import { TextInput, View, Text } from "react-native";
import { HelperText } from "react-native-paper";

type propsFace = {
  label: string
  name: string
  formik: any
}

export default function FieldProfile({ label, name, formik }: propsFace) {
  return (<View className='m-5'>
    <Text className=' absolute top-3 left-5 opacity-40'>{label}</Text>
    <TextInput className=' border-2 border-gray-400 rounded-2xl p-5 pt-8'
      value={formik.values?.[name]}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
    />
    <HelperText type="error" visible={formik.touched?.[name] && !!formik.errors?.[name]}
    >
      {formik.errors?.[name]}
    </HelperText>
  </View>);
}

