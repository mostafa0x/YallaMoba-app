import { View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { Text } from 'react-native-paper';
export default function SpinnerLoading() {
    return (
        <View className='flex-1 justify-center items-center'>
            <Image
                source={require('../../assets/gifs/Loading.gif')}
                contentFit="contain"
                style={{ width: 550, height: 400 }}
                alt='Loading...'
            />
            <Text style={{ fontSize: 28 }} >Loading...</Text>
        </View>)
}