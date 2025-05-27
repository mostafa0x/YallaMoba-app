import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { followersFace } from 'types/interfaces/store/ProfileFace'

interface props {
    count: followersFace[] | null
}
export default function TextHeader({ count }: props) {



    return (

        <ActivityIndicator animating={count ? false : true} >
            <Text style={Style.headerTextTop}>{count?.length}</Text>
        </ActivityIndicator>

    )
}


const Style = StyleSheet.create({

    headerTextTop: {
        color: "#000000",
        fontSize: 20,
    }
})
