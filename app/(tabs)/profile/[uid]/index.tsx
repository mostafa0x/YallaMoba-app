import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, FlatList, StyleSheet } from 'react-native'
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
        // setPageLoading(false)

        CheckMyProfile()
        if (isMyProfile) {
            dispatch(fillProfile({ ownerData: userData, ownerPosts: null }))
        }
        setPageLoading(false)
        //   FatchProfile()
        return () => {
            setIsMyProfile(false)
            setPageLoading(true)
        }
    }, [])

    if (pageLoading) {
        return <SpinnerLoading />
    }

    return (
        <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
            {/* top bar */}
            <View className='flex justify-between flex-row border-b-2 mb-4 border-slate-200'>
                <View style={{ width: 60 }} className='flex-row items-center text-center pl-4 '>
                    <Text onPress={() => router.back()} className='text-6xl font-normal' >{"<"}</Text>
                    <Icon size={80} source={require('../../../../assets/splash.png')} />

                </View>

                <Text style={{ width: 200 }} className='text-2xl items-center  text-center mt-8'>{userData?.username.toLocaleUpperCase()}</Text>
                <View className=''>
                    <Text onPress={() => router.push("/menu")} className='text-5xl items-center  text-center'>...!</Text>
                </View>

            </View>
            {/*Header */}
            <View className='pb-4'>
                {/*avatar and text */}
                <View className='flex-row items-center justify-around pr-10 '>

                    <Avatar.Image size={115} source={{ uri: userData?.avatar }} />
                    <View>
                        <Text style={Style.headerTextTop}>371</Text>
                        <Text style={Style.headerTextBottom}>posts.</Text>
                    </View>
                    <View>
                        <Text style={Style.headerTextTop}>104.4K.</Text>
                        <Text style={Style.headerTextBottom}>follwers.</Text>
                    </View>
                    <View>
                        <Text style={Style.headerTextTop}  >272</Text>
                        <Text style={Style.headerTextBottom}>following.</Text>
                    </View>
                </View>
                {/*buttons */}
                <View className=''>
                    <View className='flex-row pl-[185px] gap-2 '>

                        <Button textColor='white' style={Style.buttonsMain}>Follow</Button>
                        <Button textColor='white' style={Style.buttons}>message</Button>
                    </View>
                    <View className='flex-row pl-[185px] gap-2 mt-6 '>

                        <Button textColor='white' style={Style.buttonsMain}>999432432</Button>
                    </View>
                    {/* Role ICON */}
                    <View className=' absolute top-[50px] left-[385px]'>
                        <IconRole Role={ownerData?.role ?? "Roam"} />
                    </View>

                </View>
            </View>
            {/*Posts */}
            <View>
                <FlatList
                    data={ownerPosts}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PostView post={item} />}
                    columnWrapperStyle={{}}
                />
            </View>
        </View >

    )
}

const Style = StyleSheet.create({
    headerTextBottom: {
        color: "#999999",
        fontSize: 14,
        textAlign: 'center'

    },
    headerTextTop: {
        color: "#000000",
        fontSize: 20,
    },
    buttonsMain: {
        width: 185,
        backgroundColor: "#ce4500",
        height: 40

    },
    buttons: {
        width: 75,
        backgroundColor: "#ce4500"
    }
})

{/* <View className=' absolute justify-center items-center top-[180px] left-[165px]'>
                <Image style={{ width: 254, height: 254, objectFit: 'cover', borderRadius: "100%" }} source={require("../../../../assets/gifs/kaguraGif.gif")} />
                <Text>Loading...</Text>
            </View> */}



//          return (<>
//     <View style={{ backgroundColor: "white" }} className='flex justify-between w-full'>
//         <View className='flex justify-between flex-row  '>
//             <Button onPress={() => router.back()} icon="keyboard-return"><Text className='text-black' style={{ fontSize: 28 }}>{ownerData?.username}</Text></Button>
//             <Button onPress={() => router.push("/menu")} ><Text className='text-black' style={{ fontSize: 28 }}>...</Text></Button>
//         </View>
//         <View className='flex justify-around flex-row items-center mt-4'>
//             <View className=''>
//                 <View className=' absolute left-[120px]'>
//                     <Icon
//                         color={ownerData?.gender == "Male" ? "blue" : "deeppink"}
//                         source={ownerData?.gender == "Male" ? "gender-male" : "gender-female"}
//                         size={25}
//                     />
//                 </View>
//                 <View className=' absolute top-28 left-32'>

//                     <IconRole Role={ownerData?.role ?? "Roam"} />
//                 </View>

//                 <Avatar.Image size={124} source={{ uri: ownerData?.avatar }} />




//             </View>
//             <View className='text-center'>
//                 <Text className='text-center'>{userPosts.length}</Text>
//                 <Text>posts</Text>
//             </View>
//             <View className='text-center'>
//                 <Text className='text-center'>{userFollowers.length}</Text>
//                 <Text>Followers</Text>
//             </View>
//             <View className='text-center'>
//                 <Text className='text-center'>{userFollowing.length}</Text>
//                 <Text>Following</Text>
//             </View>
//         </View>
//         {/* <View style={{ backgroundColor: "white" }} className=' absolute top-[175px] left-56'>
//             <Button style={{ backgroundColor: "lavender", width: 240 }}><Text className='text-black'>Edit Profile</Text></Button>
//         </View> */}


//     </View >
//     <View style={{ backgroundColor: "white" }} className=' mb-64 mt-[140px]'>
//         <FlatList
//             data={ownerPosts}
//             numColumns={3}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => <PostView post={item} />}
//             columnWrapperStyle={{}}
//         />

//     </View>
// </>