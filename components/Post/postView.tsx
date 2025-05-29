import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { PostFace } from 'types/interfaces/store/ProfileFace';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PostViewProps {
    post: PostFace;
    Index: number
}

export default function PostView({ post, Index }: PostViewProps) {
    const thumbnailPlaceholder =
        'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
    const router = useRouter()
    const firstFile = post.files?.[0] ?? thumbnailPlaceholder;

    const isVideo = /\.(mp4|mov|webm)$/i.test(firstFile);


    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/Posts", params: { index: Index.toString() } })}>
            <View style={{ position: 'relative' }} >
                {isVideo ? (
                    <>
                        <Image
                            source={{ uri: post.icon }}
                            style={styles.image}
                            contentFit="cover"
                        />
                        <MaterialIcons
                            name="play-circle-outline"
                            size={50}
                            color="white"
                            style={styles.playIcon}
                        />
                    </>
                ) : (

                    <Image
                        source={{ uri: firstFile }}
                        style={styles.image}
                        contentFit="cover"
                    />

                )
                }


            </View >
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 161,
        height: 280,
        margin: 5,
        marginBottom: 25,
        borderRadius: 10,
    },
    playIcon: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        zIndex: 1,
    },
});
