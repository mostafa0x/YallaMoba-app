import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { PostFace } from 'types/interfaces/store/ProfileFace';
import { Avatar, Icon } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';
import { userDataFace } from 'types/interfaces/store/UserFace';
import { Image } from 'expo-image';
import ImageViewing from 'react-native-image-viewing';

interface propsFace {
    post: PostFace;
    ownerData: userDataFace;
}

export default function AllPost({ post, ownerData }: propsFace) {
    const imageUrl = post.files?.[0];
    const [visible, setVisible] = useState(false);

    const images = imageUrl ? [{ uri: imageUrl }] : [];

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

            <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
                <Image
                    contentFit='contain'
                    style={Style.img}
                    source={{ uri: imageUrl }}
                />
            </TouchableOpacity>

            <ImageViewing
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />

            <View className='flex-row justify-start gap-5 pl-5'>
                <Icon size={30} source={'cards-heart-outline'} />
                <Icon size={30} source={'comment-outline'} />
                <Icon size={30} source={'share'} />
            </View>
        </View >
    );
}

const Style = StyleSheet.create({
    img: {
        width: '100%',
        height: 650,
        borderRadius: 10,
    },
});
