import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { Button, Drawer } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';


export default function Proflie() {
    const { uid } = useLocalSearchParams()
    const { userData } = useSelector((state: StateFace) => state.UserReducer)
    const router = useRouter()
    return (
        <View className=''>
            <View className='felx justify-between flex-row mt-5'>
                <Button onPress={() => router.back()} icon="keyboard-return"><Text className='text-black' style={{ fontSize: 28 }}>{userData?.username}</Text></Button>
                <Button onPress={() => router.push("/menu")} ><Text className='text-black' style={{ fontSize: 28 }}>...</Text></Button>
            </View>
            <View className='mt-14 '>
                <Avatar.Image size={124} source={{ uri: userData?.avatar }} />
                <Text className='text-blue-600'>XXX</Text>
            </View>

        </View >
    )
}