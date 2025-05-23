import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { usePathname, useRouter } from 'expo-router'

export default function BottomNav() {
    const { colors } = useTheme()
    const path = usePathname()
    const router = useRouter()
    const goToPage = (url: string) => {
        router.push(url)
    }


    if (['/login', '/register'].includes(path)) {
        return null;
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <View style={styles.navContainer}>
                <Button
                    onPress={() => goToPage("/")}
                    mode={path == "/" ? 'contained-tonal' : 'outlined'}
                    icon={path == "/" ? "home" : "home-outline"}
                >
                    Home
                </Button>

                <Button
                    onPress={() => goToPage("/watch")}
                    mode={path == "/watch" ? 'contained-tonal' : 'outlined'}
                    icon={path == "/watch" ? "play-circle" : "play-circle-outline"}
                >
                    Watch
                </Button>
                <Button
                    onPress={() => goToPage("profile")}
                    mode={path == "/profile" ? 'contained-tonal' : 'outlined'}
                    icon={path == "/profile" ? 'account' : 'account-outline'}
                >
                    Profile
                </Button>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0'
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
        height: 60
    },



})