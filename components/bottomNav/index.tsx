import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, Icon } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { StateFace } from 'types/interfaces/store/StateFace'
import { Image } from 'expo-image'

export default function BottomNav() {
    const { userData } = useSelector((state: StateFace) => state.UserReducer)
    const path = usePathname()
    const router = useRouter()
    const { uid } = useLocalSearchParams()
    const goToPage = (url: string) => {
        router.push(url)
    }
    const IconSize = 35


    if (['/login', '/register'].includes(path)) {
        return null;
    }

    return (
        <SafeAreaView edges={['right', 'left']} style={styles.container}>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={() => goToPage("/")}
                >
                    <Icon color="#ce4500" size={IconSize} source={path == "/" ? "home" : "home-outline"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage("/watch")}
                >
                    <Icon color="#ce4500" size={IconSize} source={path.startsWith("/watch") ? "wrench" : "wrench-outline"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage("/AddPost")}
                >
                    <Icon color="#ce4500" size={IconSize} source={path.startsWith("/AddPost") ? "movie" : "movie-outline"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage("/watch")}
                >
                    <Icon color="#ce4500" size={IconSize} source={path.startsWith("/watch") ? "movie" : "movie-outline"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage(`/profile/${userData?.UID}`)}>
                    <Avatar.Image size={42} source={{ uri: userData?.avatar }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',

    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 4,
        paddingBottom: 0,

    },
});