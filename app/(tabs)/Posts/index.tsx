import { View, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'types/interfaces/store/StateFace'
import AllPost from 'components/Post/AllPost'
import { ActivityIndicator, Avatar, Button, Icon, TextInput, Menu, Divider, PaperProvider } from 'react-native-paper'
import { CommentFace, PostFace } from 'types/interfaces/store/ProfileFace'
import ImageViewing from 'react-native-image-viewing';
import { useLocalSearchParams } from 'expo-router'
import { Modalize } from 'react-native-modalize';
import axiosClient from 'lib/api/axiosClient'
import callToast from 'components/toast'
import { ChangeCommentsCurrentPost } from 'lib/Store/slices/ProfileSlice'


export default function Post() {
    const { userData } = useSelector((state: StateFace) => state.UserReducer)
    const { ownerData, ownerPosts, commentsCurrentPost } = useSelector((state: StateFace) => state.ProfileReducer)
    const dispatch = useDispatch()
    const flatListRef = useRef<FlatList | null>(null)
    const { index } = useLocalSearchParams()
    const [isVisible, setVisibleIndex] = useState(0)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const modalRef = useRef<Modalize>(null);

    const openModal = async (idPost: number) => {

        modalRef.current?.open();
        setIsMenuOpen(true)
        try {
            const res = await axiosClient.get(`/posts/${idPost}/comments/`)
            console.log(res.data);
            dispatch(ChangeCommentsCurrentPost(res.data))
        } catch (err: any) {
            console.log(err);
            callToast({ type: 'error', text1: "Yalla Moba", text2: err.message ?? "Error Comments !" })

        }
    };
    const closeModle = async () => {

        modalRef.current?.close();
        setIsMenuOpen(false)
        dispatch(ChangeCommentsCurrentPost(null))

    }

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const handleDeleteComment = async (postID: number, commentID: number) => {
        try {
            const res = await axiosClient.delete(`/posts/${postID}/comments/${commentID}`)
            callToast({ type: 'success', text1: "Yalla Moba", text2: res.data.message ?? "Comment deleted successfully" })
        } catch (err: any) {
            console.log(err);
            callToast({ type: 'error', text1: "Yalla Moba", text2: err.message ?? "Error Delete Comments !" })
        }
    }

    return (
        <PaperProvider >
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
                        onClosed={closeModle}
                        panGestureComponentEnabled={false}

                        flatListProps={{
                            data: commentsCurrentPost,
                            keyExtractor: (item) => item.id,
                            renderItem: ({ item }: { item: CommentFace }) => (
                                <View style={Style.menu} >
                                    <View className='flex-row justify-between'>
                                        <TouchableOpacity
                                            className='flex-row items-center gap-2'>

                                            <Avatar.Image size={30} source={{ uri: item.avatar }} />
                                            <Text className='text-2xl'>{item.username}.</Text>

                                        </TouchableOpacity>
                                        {item.username === userData?.username}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                            }}>
                                            <Menu
                                                visible={visible}
                                                onDismiss={closeMenu}
                                                anchor={<Button onPress={openMenu}>.....</Button>}>
                                                <Menu.Item onPress={() => { }} title="Edit (onWork)" />
                                                <Menu.Item title="User Profile" />
                                                <Divider />
                                                <Menu.Item style={{}} titleStyle={{ color: "red" }} onPress={() => handleDeleteComment(item.post_id, item.id)} title="Delete" />
                                            </Menu>
                                        </View>
                                    </View>
                                    <View className='w-full'>
                                        <Text className=' pl-5 text-xl'>{item.content}</Text>
                                    </View>
                                </View >


                            ),
                            ListEmptyComponent: () => (
                                commentsCurrentPost === null ? (
                                    <ActivityIndicator size={100} animating={true} className='mt-20' />
                                ) : (
                                    <View className='mt-20 items-center'>
                                        <Text className='text-2xl text-gray-500'>No Comments yet..</Text>
                                    </View>
                                )
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
        </PaperProvider>
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