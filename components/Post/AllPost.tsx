import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import React, { useEffect, useState } from 'react';
import { PostFace } from 'types/interfaces/store/ProfileFace';
import { Avatar, Icon } from 'react-native-paper';
import { userDataFace } from 'types/interfaces/store/UserFace';
import { Image } from 'expo-image';
import ImageViewing from 'react-native-image-viewing';
import { useVideoPlayer, VideoView } from 'expo-video';
import axiosClient from 'lib/api/axiosClient';
import callToast from 'components/toast';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';

interface propsFace {
    post: PostFace;
    ownerData: userDataFace;
    isVisible: any
    openModal: any
}


const comments = [
    { id: '1', user: 'Ali', text: 'رائع جدًا 👍' },
    { id: '2', user: 'Sara', text: 'فين ده؟' },
    // ... ممكن تعليقات أكتر
];


export default function AllPost({ post, ownerData, isVisible, openModal }: propsFace) {
    const noImg =
        "data:image/png;base64,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"
    const imageUrl = post.files?.[0];
    const [visible, setVisible] = useState(false);
    const [isshowMoreTxt, setIsShowMoreTxt] = useState(false)
    const { commentsCurrentPost } = useSelector((state: StateFace) => state.ProfileReducer)
    const images = imageUrl ? [{ uri: imageUrl }] : [];
    const path = post.files?.[0]
    const type = post.files?.[0] && post.files?.[0].split(".").pop()
    const isVideo = ['mp4', 'mov', 'webm'].includes(type ?? '')
    const player = useVideoPlayer(path ?? '', (player) => {
        player.loop = true
        player.pause()
    })


    async function handleLiksPost() {
        try {
            const res = await axiosClient.post(`/posts/${post.id}/like/`)
            callToast({ type: 'success', text1: "Yalla Moba", text2: res.data.message ?? "Post liked successfully" })

        } catch (err: any) {
            console.log(err);

        }
    }


    useEffect(() => {
        if (isVisible) {
            player.play();
        } else {
            player.pause();
        }

    }, [isVisible]);


    return (

        <View className=' p-5 mb-2'>

            <View className='flex-row justify-between'>
                <View className='flex-row items-center tex '>
                    <Avatar.Image size={50} source={{ uri: ownerData?.avatar }} />
                    <Text className='pl-2'>{ownerData?.username}</Text>
                </View>
                <View className=''>
                    <TouchableOpacity>
                        <Icon size={30} source={'format-list-bulleted'} />
                    </TouchableOpacity>
                </View>
            </View>


            {isVideo ?
                <VideoView
                    style={Style.img}
                    allowsFullscreen
                    contentFit={'cover'}
                    player={player} />
                :
                <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
                    <Image
                        contentFit='contain'
                        style={Style.img}
                        source={{ uri: imageUrl ?? noImg }}
                    />
                </TouchableOpacity>}

            <ImageViewing
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
            <View className='flex-row justify-start gap-10  items-center'>
                <View className=' gap-2'>
                    <TouchableOpacity className='flex-row items-center gap-2' onPress={() => handleLiksPost()} >
                        <Icon size={35} source={'cards-heart-outline'} />
                        <Text className='text-xl'>{post.likecount}</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex-row items-center gap-2'>
                    <TouchableOpacity className='flex-row items-center gap-2' onPress={() => openModal(post.id)}>
                        <Icon size={35} source={'comment-outline'} />
                        <Text className='text-xl'>{post.commentcount}</Text>
                    </TouchableOpacity>
                </View>
                <Icon size={35} source={'share'} />
            </View>
            {isshowMoreTxt ?
                <View className='flex-col'>
                    <TouchableOpacity onPress={() => setIsShowMoreTxt(false)}>
                        <Text className='text-lg'>{post.body}</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text className='text-lg'>{post.body.split(" ").splice(0, 4).join(" ")}{post.body.split(" ").length > 5 && <TouchableOpacity onPress={() => setIsShowMoreTxt(true)}><Text className=' opacity-50'>...more.</Text></TouchableOpacity>}</Text>
            }



        </View >
    );
}

const Style = StyleSheet.create({
    img: {
        width: '100%',
        height: 650,
        borderRadius: 20,
        marginTop: 10
    }, bot: {

        borderRadius: 20,
        marginTop: 10
    },
});
