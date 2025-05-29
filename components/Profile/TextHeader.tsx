import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'

interface props {
    count: number | null | undefined
}
export default function TextHeader({ count }: props) {

    return (
        count ? <Text style={Style.headerTextTop
        } > {count}</Text > : <ActivityIndicator animating={true} />

    )
}


const Style = StyleSheet.create({

    headerTextTop: {
        color: "#000000",
        fontSize: 20,
    }
})
