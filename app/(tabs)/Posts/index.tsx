import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { StateFace } from 'types/interfaces/store/StateFace'
import AllPost from 'components/Post/AllPost'
import { Icon } from 'react-native-paper'
import { PostFace } from 'types/interfaces/store/ProfileFace'
import ImageViewing from 'react-native-image-viewing';
import { useLocalSearchParams } from 'expo-router'


export default function Post() {
    const { ownerData, ownerPosts } = useSelector((state: StateFace) => state.ProfileReducer)
    const [imagePosts, setImagePost] = useState<PostFace[]>([])
    const flatListRef = useRef<FlatList | null>(null)
    const { index } = useLocalSearchParams()

    const parsedIndexRaw = Array.isArray(index) ? index[0] : index;
    const parsedIndex = imagePosts.length != 0 ? Math.min(
        imagePosts.length - 1,
        Math.max(0, Number(parsedIndexRaw))
    ) : 0
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
    // useEffect(() => {
    //     if (imagePosts.length > 0) {
    //         const parsedIndexRaw = Array.isArray(index) ? index[0] : index;
    //         const parsedIndex = Math.min(
    //             imagePosts.length - 1,
    //             Math.max(0, Number(parsedIndexRaw))
    //         ); setTimeout(() => {
    //             flatListRef.current?.scrollToIndex({ index: parsedIndex, animated: true });
    //         }, 100);
    //     }
    // }, [imagePosts, index])

    return (
        <View style={Style.continer}>
            <View className=' flex-row  items-center  border-b-2 border-gray-200'>
                <Icon size={50} source={'arrow-left-thin'} />
                <Text className='text-2xl pl-5 '>Posts</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={imagePosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    ownerData ? <AllPost post={item} ownerData={ownerData} /> : null
                }
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                initialScrollIndex={parsedIndex}
                onScrollToIndexFailed={(info) => {
                    setTimeout(() => {
                        flatListRef.current?.scrollToIndex({
                            index: info.index,
                            animated: true,
                        });
                    }, 500);
                }}
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