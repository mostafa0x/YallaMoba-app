import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'react-native-paper'

export default function Menu() {
    const [active, setActive] = React.useState('');

    return (
        <View>
            <Drawer.Section title="Menu" >
                <Drawer.Item
                    label="First Item"
                    active={active === 'first'}
                    onPress={() => setActive('first')}
                />
                <Drawer.Item
                    label="Second Item"
                    active={active === 'second'}
                    onPress={() => setActive('second')}
                />
            </Drawer.Section>
        </View>
    )
}