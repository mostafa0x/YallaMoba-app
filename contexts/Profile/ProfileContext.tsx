import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { ProfileContextFace } from 'types/interfaces/Contexts/ProfileContextFace'


export const profileContext = createContext<ProfileContextFace>({
    isMyProfile: false,
    setIsMyProfile: () => { },
    pageLoading: true,
    setPageLoading: () => { }
})

export default function ProfileContextProvider({ children }: { children: React.ReactNode }) {
    const [isMyProfile, setIsMyProfile] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)

    return (
        <profileContext.Provider value={{ isMyProfile, setIsMyProfile, pageLoading, setPageLoading }}>{children}</profileContext.Provider>
    )
}