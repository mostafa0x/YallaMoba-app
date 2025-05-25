import { View, StyleSheet } from 'react-native'
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


    if (['/login', '/register'].includes(path)) {
        return null;
    }

    return (
        <SafeAreaView edges={['right', 'left']} style={styles.container}>
            <View style={styles.navContainer}>
                {/* <Button
                    onPress={() => goToPage("/")}
                    mode={path == "/" ? 'contained-tonal' : 'outlined'}
                    icon={path == "/" ? "home" : "home-outline"}
                >
                    Home
                </Button> */}
                <View onTouchStart={() => goToPage("/")}
                >
                    <Icon size={42} source={path == "/" ? "home" : "home-outline"} />
                </View>
                <View onTouchStart={() => goToPage("/watch")}
                >
                    <Icon size={42} source={path.startsWith("/watch") ? "movie" : "movie-outline"} />
                </View>


                {/* <Button
                    onPress={() => goToPage("/watch")}
                    mode={path == "/watch" ? 'contained-tonal' : 'outlined'}
                    icon={path == "/watch" ? "play-circle" : "play-circle-outline"}
                >
                    x
                </Button> */}

                <Avatar.Image onTouchStart={() => goToPage(`/profile/${userData?.UID}`)} size={42} source={{ uri: userData?.avatar }} />
                {/* <Button
                    onPress={() => goToPage(`/profile/${userData?.UID}`)}
                    mode={path.startsWith("/profile/") ? 'contained-tonal' : 'outlined'}
                    icon={() => (
                        <Image
                            source={{ uri: userData?.avatar }}
                            style={{ width: 34, height: 34, borderRadius: 12 }}
                        />
                    )}

                >

                    profile
                </Button> */}

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