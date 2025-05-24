import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { Button, Icon } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';


export default function Proflie() {
    const { uid } = useLocalSearchParams()
    const { userData } = useSelector((state: StateFace) => state.UserReducer)
    const router = useRouter()
    return (
        <View className=''>
            <View className='flex justify-between flex-row mt-5'>
                <Button onPress={() => router.back()} icon="keyboard-return"><Text className='text-black' style={{ fontSize: 28 }}>{userData?.username}</Text></Button>
                <Button onPress={() => router.push("/menu")} ><Text className='text-black' style={{ fontSize: 28 }}>...</Text></Button>
            </View>
            <View className='flex justify-around flex-row items-center mt-8'>
                <View className=''>
                    <View className=' absolute left-36'>
                        <Icon
                            color={userData?.gender == "Male" ? "green" : "deeppink"}
                            source={userData?.gender == "Male" ? "gender-male" : "gender-female"}
                            // source={userData?.gender == "Male" ? "face-man" : "face-woman"}

                            size={20}
                        />
                    </View>
                    <View className=' absolute top-28 left-32'>
                        <Icon
                            source={userData?.gender == "Male" ? "gender-male" : "gender-female"}
                            // source={userData?.gender == "Male" ? "face-man" : "face-woman"}

                            size={20}
                        />
                    </View>
                    <Avatar.Image size={124} source={{ uri: userData?.avatar }} />



                </View>
                <View className='text-center'>
                    <Text className='text-center'>9999</Text>
                    <Text>posts</Text>
                </View>
                <View className='text-center'>
                    <Text className='text-center'>9999</Text>
                    <Text>Followers</Text>
                </View>
                <View className='text-center'>
                    <Text className='text-center'>9999</Text>
                    <Text>Following</Text>
                </View>
            </View>
            <View className=' absolute top-[175px] left-56'>
                <Button style={{ backgroundColor: "royalblue", width: 240 }}><Text className='text-white'>Follow</Text></Button>

            </View>


        </View >
    )
}