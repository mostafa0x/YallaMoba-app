import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { ProfileContextFace } from 'types/interfaces/Contexts/ProfileContextFace'


export const profileContext = createContext<ProfileContextFace>({
    isMyProfile: false,
    setIsMyProfile: () => { }

})

export default function ProfileContextProvider({ children }: { children: React.ReactNode }) {
    const [isMyProfile, setIsMyProfile] = useState(false)

    return (
        <profileContext.Provider value={{ isMyProfile, setIsMyProfile }}>{children}</profileContext.Provider>
    )
}