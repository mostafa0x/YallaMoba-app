import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createContext } from "react";
interface AuthContextFace {
    isSubmiting: boolean;
    setIsSubmiting: React.Dispatch<React.SetStateAction<boolean>>;
}
export const authContext = createContext<AuthContextFace>({
    isSubmiting: false,
    setIsSubmiting: () => { }
})

export default function AuthContextProvider({ children }: any) {
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    return (
        <authContext.Provider value={{ isSubmiting, setIsSubmiting }}>{children}</authContext.Provider>
    )
}