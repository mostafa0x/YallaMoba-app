import AvatarUser from "components/AvatarUser/AvatarUser";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { useSelector } from "react-redux";
import { StateFace } from "types/interfaces/store/StateFace";
export default function EditAvatar() {
    const { avatars, currentAvatarIndex } = useSelector((state: StateFace) => state.AvatarReducer)


    useEffect(() => {


        return () => {

        }
    }, [])

    return <View className='flex-row gap-10 items-center justify-between'>
        <TouchableOpacity>
            <Icon size={40} source="less-than" />
        </TouchableOpacity>
        <AvatarUser url={avatars[currentAvatarIndex]} size={150} />
        <TouchableOpacity>
            <Icon size={40} source="greater-than" />
        </TouchableOpacity>
    </View>;
}
