import { View, Text } from 'react-native'
import React from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet';


export default function ActionSheet({ children }: { children: React.ReactNode }) {
    const { ActionSheetProvider } = require('@expo/react-native-action-sheet');

    return (
        <ActionSheetProvider>
            {children}
        </ActionSheetProvider>
    )
}