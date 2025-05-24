import { View, Text } from 'react-native'
import React from 'react'
import { Button, Drawer } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import handleLoutOut from 'services/handleLogOut'

export default function Menu() {
    const [active, setActive] = React.useState('')
    const router = useRouter()
    const dispatch = useDispatch() // تصحيح typo من dispath إلى dispatch

    return (
        <View className="flex-1 justify-between">
            <View>
                <Button
                    className="items-start my-5"
                    onPress={() => router.back()}
                    icon="keyboard-return"
                >
                    <Text className="text-black" style={{ fontSize: 28 }}>Menu</Text>
                </Button>

                <Drawer.Section className='mt-8'>
                    <Drawer.Item
                        label="Search"
                        active={active === '1'}
                        onPress={() => setActive('1')}
                    />
                    <Drawer.Item
                        label="Settings"
                        active={active === '2'}
                        onPress={() => setActive('2')}
                    />
                </Drawer.Section>
            </View>

            <View className="mb-6">
                <Drawer.Item
                    label="Logout"
                    active={active === '3'}
                    onPress={() => {
                        setActive('3')
                        handleLoutOut(dispatch, router)
                    }}
                    style={{ backgroundColor: '#ffeeee' }}
                />
            </View>
        </View>
    )
}