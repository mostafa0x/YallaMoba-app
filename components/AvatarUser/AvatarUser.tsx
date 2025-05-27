import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'


interface PropsFace {
    url: string
    size: number
}
export default function AvatarUser({ url, size }: PropsFace) {

    return (
        <Avatar.Image source={{ uri: url }} size={size} />
    )
}