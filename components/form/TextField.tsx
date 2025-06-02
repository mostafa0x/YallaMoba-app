import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';

type propsFace = {
  label: string;
  name: string;
  placeholder: string;
  formik: any;
  signup?: boolean;
};
export default function TextField({ label, formik, name, placeholder, signup }: propsFace) {
  const isPassword = ['password', 'repassword'].includes(name);
  const [hidePassword, setHidePassword] = useState(true);
  const showPassword = () => {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  };
  return (
    <>
      <TextInput
        value={formik.values?.[name]}
        secureTextEntry={isPassword && hidePassword}
        right={
          isPassword && (
            <TextInput.Icon
              icon={hidePassword ? 'eye' : 'eye-outline'}
              onPress={() => showPassword()}
            />
          )
        }
        contentStyle={signup && { backgroundColor: '#facc15' }}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        error={formik.touched?.[name] && !!formik.errors?.[name]}
        label={label}
        className={
          formik.values?.[name] == '' ? 'placeholder:opacity-50' : 'placeholder:opacity-100'
        }
        placeholder={placeholder}
      />
      <HelperText type="error" visible={formik.touched?.[name] && !!formik.errors?.[name]}>
        {formik.errors?.[name]}
      </HelperText>
    </>
  );
}
