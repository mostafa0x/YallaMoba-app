import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Icon } from 'react-native-paper'
import { RoleFace, userDataFace } from 'types/interfaces/store/UserFace'
import RootLayout from 'app/_layout'

type props = {
    Role: RoleFace
}

export default function IconRole({ Role }: props) {
    const RolesIcons = {
        MM: require(`../../assets/roles/MM.png`),
        jg: require(`../../assets/roles/jg.png`),
        exp: require(`../../assets/roles/exp.png`),
        Mid: require(`../../assets/roles/mid.png`),
        Roam: require(`../../assets/roles/Roam.png`)
    }
    const CurrentIcon = RolesIcons[Role]


    useEffect(() => {
    }, [])
    return (
        <Icon

            source={CurrentIcon}
            size={60}
        />
    )
}