
import { View, Text, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import { validationSchemaProfile } from 'lib/Validations/EdtiProfileSchema'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, Avatar, Button, Icon, List } from 'react-native-paper'
import FieldProfile from 'components/form/FieldProfile'
import { useEffect, useState } from 'react'
import { RoleFace, userDataFace } from 'types/interfaces/store/UserFace'
import RoleList from 'components/form/RoleList'
import AvatarUser from 'components/AvatarUser/AvatarUser'
import EditAvatar from 'components/form/EditAvatar'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeCurrentAvatar } from 'lib/Store/slices/AvatarSlice'
import { StateFace } from 'types/interfaces/store/StateFace'
import axiosClient from 'lib/api/axiosClient'
import callToast from 'components/toast'
import { ChangeUserData, fillUserInfo } from 'lib/Store/slices/UserSlice'
import { storeUserInfo } from 'services/storage'
import { fillProfile } from 'lib/Store/slices/ProfileSlice'

interface formFace {
    username: any;
    avatar: any;
    role: any
}

export default function EditProfile() {
    const { userData, userToken } = useSelector((state: StateFace) => state.UserReducer)
    const { avatars, currentAvatarIndex } = useSelector((state: StateFace) => state.AvatarReducer)
    const { ownerPosts } = useSelector((state: StateFace) => state.ProfileReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [ActiveRole, setActiveRole] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isShowSave, setIsShowSave] = useState<boolean>(false)


    const handleChangeProfile = async (formValues: formFace) => {
        setIsSubmitting(true)

        try {
            const res = await axiosClient.patch("/profiles/", formValues)
            const data = res.data
            callToast({ type: 'success', text1: "Yalla Moba", text2: data.message })
            dispatch(ChangeUserData({
                username: formValues.username,
                email: userData?.email,
                gender: userData?.gender,
                role: formValues.role,
                avatar: formValues.avatar,
                UID: userData?.UID,
                uid: userData?.uid,
                popularity: userData?.popularity,
            }))
            await storeUserInfo(userToken ?? "", {
                username: formValues.username,
                email: userData?.email,
                gender: userData?.gender,
                role: formValues.role,
                avatar: formValues.avatar,
                UID: userData?.UID,
                uid: userData?.uid,
                popularity: userData?.popularity,
            } as userDataFace);

            dispatch(fillProfile({
                ownerData: {
                    username: formValues.username,
                    email: userData?.email,
                    gender: userData?.gender,
                    role: formValues.role,
                    avatar: formValues.avatar,
                    uid: userData?.UID,
                    popularity: userData?.popularity,
                } as userDataFace,
                ownerPosts: ownerPosts,
            }));
            router.back()

        } catch (err: any) {
            console.log(err);
            callToast({ type: 'error', text1: "Yalla Moba", text2: err.message || "Error updating profile" })

        } finally {
            setIsSubmitting(false)

        }
    }

    const handleChangeRole = (role: RoleFace) => {
        formik.setFieldValue('role', role)
        setActiveRole(role)
    }

    const formik = useFormik({
        initialValues: {
            username: userData?.username,
            avatar: userData?.avatar,
            role: userData?.role
        }, validationSchema: validationSchemaProfile,
        onSubmit: handleChangeProfile
    })


    useEffect(() => {
        formik.setFieldValue('username', userData?.username)
        formik.setFieldValue('avatar', userData?.avatar)
        formik.setFieldValue('role', userData?.role)
        handleChangeRole(userData?.role as RoleFace)
        const indexAvatar = avatars.findIndex((item) => item == userData?.avatar)
        dispatch(ChangeCurrentAvatar({ type: indexAvatar.toString() }))

        return () => {
            dispatch(ChangeCurrentAvatar({ type: '0' }))
            setIsShowSave(false)
            setActiveRole("")
        }
    }, [])
    useEffect(() => {
        formik.setFieldValue('avatar', avatars[currentAvatarIndex])
    }, [currentAvatarIndex])

    useEffect(() => {
        if (formik.values.username !== userData?.username) {
            setIsShowSave(true)
        } else if (formik.values.avatar !== userData?.avatar) {
            setIsShowSave(true)
        } else if (formik.values.role !== userData?.role) {
            setIsShowSave(true)
        } else {
            setIsShowSave(false)
        }


    }, [formik.values])


    return (
        <View className='flex-1 bg-white'>
            <View className=' justify-between items-center flex-row px-2 py-3 border-b-2 border-gray-200'>
                <View className='flex-row'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icon size={40} source="less-than" />
                    </TouchableOpacity>
                    <Text className='text-2xl pt-1.5  w-40'>Edit Profile</Text>
                </View>
                <View>
                    {isShowSave && !isSubmitting ? <Button onPress={() => formik.handleSubmit()} textColor='white' style={{ backgroundColor: "blue" }}>Save</Button> : <ActivityIndicator animating={isSubmitting} color='blue' />}


                </View>
            </View>
            <View className='flex mt-20 justify-around '>
                <View className='justify-center items-center my-10'>
                    <EditAvatar />

                </View>
                <FieldProfile label={'username'} name={'username'} formik={formik} />
                <RoleList ActiveRole={ActiveRole} handleChangeRole={handleChangeRole} />

            </View>
        </View >
    )
}