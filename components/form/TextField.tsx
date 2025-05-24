import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput, HelperText } from 'react-native-paper';


type propsFace = {
    label: string
    name: string
    placeholder: string
    formik: any
}
export default function TextField({ label, formik, name, placeholder }: propsFace) {
    const [hidePassword, setHidePassword] = useState(true)

    const showPassword = () => {
        hidePassword ? setHidePassword(false) : setHidePassword(true)
    }
    return (
        <>
            <TextInput
                value={formik.values?.[name]}
                secureTextEntry={name === "password" && hidePassword}
                right={name === "password" && <TextInput.Icon icon="eye" onPress={() => showPassword()} />}
                onChangeText={formik.handleChange(name)}
                onBlur={formik.handleBlur(name)}
                error={formik.touched?.[name] && !!formik.errors?.[name]}
                label={label}
                className={formik.values?.[name] == "" ? "placeholder:opacity-50" : "placeholder:opacity-100"}
                placeholder={placeholder}

            />
            <HelperText type="error" visible={formik.touched?.[name] && formik.errors?.[name]}>
                {formik.errors?.[name]}
            </HelperText>

        </>
    )
}