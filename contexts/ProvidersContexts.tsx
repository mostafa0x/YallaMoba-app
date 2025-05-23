import { View, Text } from 'react-native'
import React from 'react'
import AuthContextProvider from './Auth/authContext'

export default function ProvidersContexts({ children }: any) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}