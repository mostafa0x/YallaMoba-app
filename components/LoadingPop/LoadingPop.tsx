import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

export default function LoadingPop() {

    const loadingGif = require('../../assets/gifs/kagura.gif')
    return (
        <View className='flex-row items-center justify-center'>
            <Text className='text-4xl'>Loading...</Text>
            <Image contentFit='cover' source={loadingGif} style={Style.icon} />
        </View>
    )
}

const Style = StyleSheet.create({
    icon: {
        width: 200,
        height: 200
    }
})