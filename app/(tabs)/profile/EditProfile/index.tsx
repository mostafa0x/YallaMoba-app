
import { View, Text, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import { validationSchemaProfile } from 'lib/Validations/EdtiProfileSchema'
import { useRouter } from 'expo-router'
import { Icon, List } from 'react-native-paper'
import FieldProfile from 'components/form/FieldProfile'
import { useState } from 'react'
import { RoleFace } from 'types/interfaces/store/UserFace'
import RoleList from 'components/form/RoleList'

export default function EditProfile() {
    const router = useRouter()
    const handleChangeProfile = () => { }
    const [ActiveRole, setActiveRole] = useState<string>("");
    const handleChangeRole = (role: RoleFace) => {
        formik.setFieldValue('role', role)
        setActiveRole(role)
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            avatar: "",
            role: ""
        }, validationSchema: validationSchemaProfile,
        onSubmit: handleChangeProfile
    })
    return (
        <View className='flex-1 bg-white'>
            <View className='flex flex-row item-center text-center '>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon size={40} source="less-than" />
                </TouchableOpacity>
                <Text className='text-2xl  w-40'>Edit Profile</Text>
            </View>
            <View className='flex mt-20 justify-around'>
                <FieldProfile label={'username'} name={'username'} formik={formik} />
                <RoleList ActiveRole={ActiveRole} handleChangeRole={handleChangeRole} />

            </View>
        </View >
    )
}