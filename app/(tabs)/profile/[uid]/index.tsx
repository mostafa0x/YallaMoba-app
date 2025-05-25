import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, FlatList } from 'react-native'
import { Button, Icon } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';
import IconRole from 'components/iconRole';
import SpinnerLoading from 'components/spinnerLoading';
import { profileContext } from 'contexts/Profile/ProfileContext';
import { fillProfile } from 'lib/Store/slices/ProfileSlice';
import { Image } from 'expo-image';
import axios from 'axios';
import { API_BASE_URL } from 'config';
import { ProfileFace } from 'types/interfaces/store/ProfileFace';
import PostView from 'components/Post/postView';


export default function Proflie() {
    const { uid } = useLocalSearchParams()
    const { userToken, userData, userFollowers, userFollowing, userPosts, headers } = useSelector((state: StateFace) => state.UserReducer)
    const { ownerData, ownerPosts } = useSelector((state: StateFace) => state.ProfileReducer)
    const router = useRouter()
    const { pageLoading, isMyProfile, setIsMyProfile, setPageLoading } = useContext(profileContext)
    const dispatch = useDispatch()

    function CheckMyProfile() {
        if (uid == userData?.UID) {
            setIsMyProfile(true)
        } else setIsMyProfile(false)
    }

    async function FatchProfile() {
        try {
            console.log(`${API_BASE_URL}/profiles/${uid}`);

            const res = await axios.get(`${API_BASE_URL}/profiles/${uid}`, { headers })
            const data: ProfileFace = res.data
            console.log(data.ownerPosts);
            dispatch(fillProfile(data))
            setPageLoading(false)

            return data

        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        console.log(userToken);

        CheckMyProfile()
        if (isMyProfile) {
            dispatch(fillProfile({ ownerData: userData, ownerPosts: null }))
        }
        // setPageLoading(false)
        FatchProfile()


        return () => {
            setIsMyProfile(false)
            setPageLoading(true)
        }
    }, [])

    if (pageLoading) {
        return <SpinnerLoading />
    }
    return (<>
        <View className='flex justify-between'>
            <View className='flex justify-between flex-row mt-5'>
                <Button onPress={() => router.back()} icon="keyboard-return"><Text className='text-black' style={{ fontSize: 28 }}>{ownerData?.username}</Text></Button>
                <Button onPress={() => router.push("/menu")} ><Text className='text-black' style={{ fontSize: 28 }}>...</Text></Button>
            </View>
            <View className='flex justify-around flex-row items-center mt-8'>
                <View className=''>
                    <View className=' absolute left-[120px]'>
                        <Icon
                            color={ownerData?.gender == "Male" ? "blue" : "deeppink"}
                            source={ownerData?.gender == "Male" ? "gender-male" : "gender-female"}
                            // source={userData?.gender == "Male" ? "face-man" : "face-woman"}
                            size={25}
                        />
                    </View>
                    <View className=' absolute top-28 left-32'>
                        {/* <Icon
                            source={require(`../../../../assets/roles/MM.png`)}
                            // source={userData?.gender == "Male" ? "face-man" : "face-woman"}
                            size={25}
                        /> */}
                        <IconRole Role={ownerData?.role ?? "Roam"} />
                    </View>
                    <Avatar.Image size={124} source={{ uri: ownerData?.avatar }} />



                </View>
                <View className='text-center'>
                    <Text className='text-center'>{userPosts.length}</Text>
                    <Text>posts</Text>
                </View>
                <View className='text-center'>
                    <Text className='text-center'>{userFollowers.length}</Text>
                    <Text>Followers</Text>
                </View>
                <View className='text-center'>
                    <Text className='text-center'>{userFollowing.length}</Text>
                    <Text>Following</Text>
                </View>
            </View>
            <View className=' absolute top-[175px] left-56'>
                <Button style={{ backgroundColor: "lavender", width: 240 }}><Text className='text-black'>Edit Profile</Text></Button>

            </View>


        </View >
        <View className='mt-5 mb-64 '>
            <FlatList
                data={ownerPosts}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostView post={item} />}
                columnWrapperStyle={{}}
            />

        </View>
    </>

    )
}


{/* <View className=' absolute justify-center items-center top-[180px] left-[165px]'>
                <Image style={{ width: 254, height: 254, objectFit: 'cover', borderRadius: "100%" }} source={require("../../../../assets/gifs/kaguraGif.gif")} />
                <Text>Loading...</Text>
            </View> */}