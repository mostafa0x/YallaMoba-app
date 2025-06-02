import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  const isUserName = ['username'].includes(name);
  const [hidePassword, setHidePassword] = useState(true);
  const isError: boolean = formik.touched?.[name] && !!formik.errors?.[name];

  const showPassword = () => {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  };
  return (
    <>
      <TextInput
        maxLength={isUserName ? 14 : 100}
        value={formik.values?.[name]}
        secureTextEntry={isPassword && hidePassword}
        right={
          isPassword && (
            <TextInput.Icon
              color={hidePassword ? 'white' : 'white'}
              icon={hidePassword ? 'eye' : 'eye-outline'}
              onPress={() => showPassword()}
            />
          )
        }
        style={signup && { backgroundColor: '#4f4497' }}
        textColor={signup ? 'black' : 'black'}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        error={formik.touched?.[name] && !!formik.errors?.[name]}
        label={label}
        className={
          formik.values?.[name] == '' ? 'placeholder:opacity-50' : 'placeholder:opacity-100'
        }
        placeholder={placeholder}
        theme={
          signup
            ? {
                colors: {
                  primary: 'white',
                  onSurfaceVariant: '#bb9cc0',
                },
              }
            : {
                colors: {
                  primary: '#1f1d1d75',
                  onSurfaceVariant: '#3a3a3a',
                },
              }
        }
      />
      <HelperText type="error" visible={!!isError}>
        {formik.errors?.[name]}
      </HelperText>
    </>
  );
}
