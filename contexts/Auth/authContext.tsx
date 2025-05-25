import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createContext } from "react";


interface AuthContextFace {
    isSubmiting: boolean;
    setIsSubmiting: React.Dispatch<React.SetStateAction<boolean>>;
    apiError: string | null, setApiError: React.Dispatch<React.SetStateAction<string | null>>
}
export const authContext = createContext<AuthContextFace>({
    isSubmiting: false,
    setIsSubmiting: () => { }
    , apiError: null,
    setApiError: () => { }
})

export default function AuthContextProvider({ children }: any) {
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    const [apiError, setApiError] = useState<string | null>(null)
    return (
        <authContext.Provider value={{ isSubmiting, setIsSubmiting, apiError, setApiError }}>{children}</authContext.Provider>
    )
}