import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import { Button, Icon } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';
import IconRole from 'components/iconRole';
import SpinnerLoading from 'components/SpinnerLoading';
import { profileContext } from 'contexts/Profile/ProfileContext';
import { fillProfile } from 'lib/Store/slices/ProfileSlice';
import { Image } from 'expo-image';
import axios from 'axios';
import { API_BASE_URL } from 'config';
import { ProfileFace } from 'types/interfaces/store/ProfileFace';
import PostView from 'components/Post/postView';
import * as Clipboard from "expo-clipboard"
import callToast from 'components/toast';

export default function Proflie() {
    const { uid } = useLocalSearchParams()
    const { userToken, userData, userFollowers, userFollowing, userPosts, headers } = useSelector((state: StateFace) => state.UserReducer)
    const { ownerData, ownerPosts } = useSelector((state: StateFace) => state.ProfileReducer)
    const router = useRouter()
    const { pageLoading, isMyProfile, setIsMyProfile, setPageLoading } = useContext(profileContext)
    const dispatch = useDispatch()
    const [showInfo, setShowInfo] = useState(true)

    function CheckMyProfile() {
        if (uid == userData?.UID) {
            setIsMyProfile(true)
        } else setIsMyProfile(false)
    }

    async function CopyID(id: string | null) {
        if (!id) {
            throw "Error Copy id !"
        }
        try {
            await Clipboard.setStringAsync(id)
            callToast({ type: 'success', text1: "Yalla Moba", text2: "Copy ID Done" })
        } catch (err: any) {
            callToast({ type: 'error', text1: "Yalla Moba", text2: err })

        }
    }

    async function FatchProfile() {
        try {
            console.log(`${API_BASE_URL}/profiles/${uid}`);

            const res = await axios.get(`${API_BASE_URL}/profiles/${uid}`, { headers })
            const data: ProfileFace = res.data
            // console.log(data.ownerPosts);


            dispatch(fillProfile({
                ownerData: data.ownerData,
                ownerPosts: data.ownerPosts,
            }));

            setPageLoading(false)
            return data
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        CheckMyProfile();

        if (isMyProfile) {
            dispatch(fillProfile({
                ownerData: userData,
                ownerPosts: [],
            }));
            setPageLoading(false);
        }
        FatchProfile()



        return () => {
            setIsMyProfile(false);
            setPageLoading(true);
        };
    }, []);

    if (pageLoading) {
        return <SpinnerLoading />
    }

    return (
        <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <View className='flex justify-between flex-row border-b-2  border-slate-200'>
                <View style={{ width: 60 }} className='flex-row items-center text-center pl-2 '>
                    <View onTouchStart={() => router.back()}>
                        <Icon size={40} source="less-than" />
                    </View>

                    {/* <Text onPress={() => router.back()} className='text-6xl font-normal' >{"<"}</Text> */}
                    <Icon size={80} source={require('../../../../assets/splash.png')} />
                </View>
                <Text style={{ width: 200 }} className='text-2xl items-center  text-center mt-8'>{ownerData?.username.toLocaleUpperCase()}</Text>
                <View className=''>
                    <Text onPress={() => router.push("/menu")} className='text-5xl items-center  text-center'>...!</Text>
                </View>
            </View>
            {/*Posts */}
            <View className=''>
                {ownerPosts ? <FlatList
                    data={ownerPosts}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PostView post={item} />}
                    columnWrapperStyle={{}}
                    style={{ backgroundColor: '#ffffff' }}
                    ListHeaderComponent={<>
                        {/* Info Box */}
                        <View style={{ marginBottom: 100, marginTop: 25 }}>
                            <View className='flex-row items-center justify-around pr-10 '>
                                <Avatar.Image size={115} source={{ uri: ownerData?.avatar }} />
                                <View>
                                    <Text style={Style.headerTextTop}>{ownerPosts?.length ?? 0}</Text>
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
                            <View className=''>
                                <View className='flex-row pl-[185px] gap-2 '>
                                    {isMyProfile ? <Button textColor='white' style={Style.buttonsMain}>Edit Profile</Button> : <Button textColor='white' style={Style.buttonsMain}>Follow</Button>}
                                    <Avatar.Icon onTouchStart={() => router.push({ pathname: "/ShareProfile", params: { username: ownerData?.username ?? "empty", uid: ownerData?.UID ?? 0 } })} size={45} style={{ backgroundColor: "#ce4500", borderRadius: 20, width: 65, height: 40, marginLeft: 5 }} icon={"share"} />
                                </View>
                                <View className='flex-row pl-[185px] gap-2 mt-6 '>
                                    <Button onPress={() => { CopyID(ownerData?.UID ?? null) }} textColor='white' style={Style.buttonsMain}>{ownerData?.uid}</Button>
                                </View>
                                {/* Role ICON */}
                                <View className=' absolute top-[50px] left-[385px]'>
                                    <IconRole Role={ownerData?.role ?? "Roam"} />
                                </View>

                            </View>
                        </View>
                    </>}
                /> : <View className='flex-1 justify-center items-center'>
                    <Text className='text-2xl text-gray-500'>No Posts Yet</Text></View>}


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
//   < View className = ' absolute left-[120px]' >
//                     <Icon
//                         color={ownerData?.gender == "Male" ? "blue" : "deeppink"}
//                         source={ownerData?.gender == "Male" ? "gender-male" : "gender-female"}
//                         size={25}
//                     />
//                 </>