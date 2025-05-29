import { View, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { StateFace } from 'types/interfaces/store/StateFace'
import AllPost from 'components/Post/AllPost'
import { Avatar, Button, Icon, TextInput } from 'react-native-paper'
import { PostFace } from 'types/interfaces/store/ProfileFace'
import ImageViewing from 'react-native-image-viewing';
import { useLocalSearchParams } from 'expo-router'
import { Modalize } from 'react-native-modalize';

const comments = [
    { id: '1', user: 'Ali', text: 'رائع جدًا 👍' },
    { id: '2', user: 'Sara', text: 'فين ده؟' },
    // ... ممكن تعليقات أكتر
];

export default function Post() {
    const { ownerData, ownerPosts } = useSelector((state: StateFace) => state.ProfileReducer)
    const [imagePosts, setImagePost] = useState<PostFace[]>([])
    const flatListRef = useRef<FlatList | null>(null)
    const { index } = useLocalSearchParams()
    const [isVisible, setVisibleIndex] = useState(0)
    const parsedIndexRaw = Array.isArray(index) ? index[0] : index;
    const parsedIndex = imagePosts.length != 0 ? Math.min(
        imagePosts.length - 1,
        Math.max(0, Number(parsedIndexRaw))
    ) : 0

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const modalRef = useRef<Modalize>(null);

    const openModal = () => {
        modalRef.current?.open();
        setIsMenuOpen(true)
    };

    // useEffect(() => {
    //     if (ownerPosts) {
    //         const ImgPosts = ownerPosts
    //             ?.map((post) => {
    //                 if (post.files?.[0]) {
    //                     const path = post.files?.[0]
    //                     const type = post.files?.[0].split(".").pop()
    //                     const isVideo = ['mp4', 'mov', 'webm'].includes(type ?? '')

    //                     if (!isVideo) return post
    //                 }

    //             })
    //             .filter((post): post is PostFace => post !== undefined)
    //         setImagePost(ImgPosts)
    //     }

    // }, [ownerPosts])

    // useEffect(() => {

    //     flatListRef.current?.scrollToIndex({ index: parsedIndex, animated: true })
    // }, [imagePosts])


    return (
        <View style={Style.continer}>
            <View className=' flex-row  items-center  border-b-2 border-gray-200'>
                <Icon size={50} source={'arrow-left-thin'} />
                <Text className='text-2xl pl-5 '>Posts</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <FlatList
                    ref={flatListRef}
                    data={ownerPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) =>
                        ownerData ? (
                            <AllPost
                                post={item}
                                ownerData={ownerData}
                                isVisible={index === isVisible}
                                openModal={openModal}
                            />
                        ) : null
                    }
                    onViewableItemsChanged={({ viewableItems }) => {
                        if (viewableItems.length > 0) {
                            setVisibleIndex(viewableItems[0].index ?? 0);
                        }
                    }}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 80,
                    }}
                    getItemLayout={(data, index) => ({
                        length: 650,
                        offset: 650 * index,
                        index,
                    })}
                />


                <Modalize
                    ref={modalRef}
                    modalHeight={500}
                    handleStyle={{ backgroundColor: '#ccc' }}
                    withHandle={true}
                    onClosed={() => setIsMenuOpen(false)}
                    panGestureComponentEnabled={false}
                    flatListProps={{
                        data: comments,
                        keyExtractor: (item) => item.id,
                        renderItem: ({ item }) => (
                            <View style={Style.menu}>
                                <TouchableOpacity className='mb-5'>
                                    <View className='flex-row items-center gap-2'>
                                        <Avatar.Image size={30} source={{ uri: 'camera' }} />
                                        <Text className='text-2xl'>{item.user}.</Text>
                                    </View>
                                </TouchableOpacity>
                                <View className='w-full'>
                                    <Text className=' pl-5 text-xl'>{item.text}</Text>
                                </View>
                            </View>
                        ),
                        keyboardShouldPersistTaps: 'handled',

                    }}
                />

            </KeyboardAvoidingView >
            {
                isMenuOpen && <View className=' m-2 border-2 p-2 bg-white items-center border-gray-500 justify-between flex-row '>
                    <TextInput className='w-[400px]' placeholder="comment here" />
                    <TouchableOpacity>
                        <Icon color='blue' size={50} source={'send'} />
                    </TouchableOpacity>
                </View>
            }


        </View >
    )
}

const Style = StyleSheet.create({
    continer: {
        flex: 1,
        backgroundColor: "white"
    },
    menu: {
        flex: 1,
        margin: 20,
        marginLeft: 10
    }
})