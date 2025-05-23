import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


type propsFace = {
    label: string
    name: string
    placeholder: string
    formik: any
    secureTextEntry?: any
}
export default function TextField({ label, formik, name, placeholder, secureTextEntry }: propsFace) {
    return (
        <>
            <TextInput value={formik.values?.[name]} secureTextEntry onChangeText={formik.handleChange(name)} onBlur={formik.handleBlur(name)} error={!!formik.errors?.[name]} label={label} className={formik.values?.[name] == "" ? "placeholder:opacity-50" : "placeholder:opacity-100"} placeholder={placeholder} />
            {
                formik.touched?.[name] && formik.errors?.[name] && (
                    <Text >{formik.errors?.[name]}</Text>
                )
            }
        </>
    )
}