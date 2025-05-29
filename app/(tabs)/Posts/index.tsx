import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StateFace } from 'types/interfaces/store/StateFace'
import AllPost from 'components/Post/AllPost'
import { Icon } from 'react-native-paper'
import { PostFace } from 'types/interfaces/store/ProfileFace'
import ImageViewing from 'react-native-image-viewing';


export default function Post() {
    const { ownerData, ownerPosts } = useSelector((state: StateFace) => state.ProfileReducer)
    const [imagePosts, setImagePost] = useState<PostFace[]>([])


    useEffect(() => {
        if (ownerPosts) {
            const ImgPosts = ownerPosts
                ?.map((post) => {
                    if (post.files?.[0]) {
                        const path = post.files?.[0]
                        const type = post.files?.[0].split(".").pop()
                        const isVideo = ['mp4', 'mov', 'webm'].includes(type ?? '')

                        if (!isVideo) return post
                    }

                })
                .filter((post): post is PostFace => post !== undefined)
            setImagePost(ImgPosts)
        }

    }, [ownerPosts])
    return (
        <View style={Style.continer}>
            <View className=' flex-row  items-center  border-b-2 border-gray-200'>
                <Icon size={50} source={'arrow-left-thin'} />
                <Text className='text-2xl pl-5 '>Posts</Text>
            </View>
            <FlatList
                style={{ marginVertical: 20 }}
                data={imagePosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    ownerData ? <AllPost post={item} ownerData={ownerData} /> : null
                }
            />
        </View>
    )
}

const Style = StyleSheet.create({
    continer: {
        flex: 1,

        backgroundColor: "white"
    }
})