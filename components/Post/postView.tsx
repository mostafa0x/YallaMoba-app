import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { PostFace } from 'types/interfaces/store/ProfileFace';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

interface PostViewProps {
    post: PostFace;
}

export default function PostView({ post }: PostViewProps) {
    const [showVideo, setShowVideo] = useState(false);
    const thumbnailPlaceholder =
        'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='

    const firstFile = post.files?.[0] ?? thumbnailPlaceholder;

    const isVideo = /\.(mp4|mov|webm)$/i.test(firstFile);


    return (
        <View style={{ position: 'relative' }}>
            {isVideo ? (
                <TouchableOpacity onPress={() => setShowVideo(true)}>
                    <Image
                        source={{ uri: thumbnailPlaceholder }}
                        style={styles.image}
                        contentFit="cover"
                    />
                    <MaterialIcons
                        name="play-circle-outline"
                        size={50}
                        color="white"
                        style={styles.playIcon}
                    />
                </TouchableOpacity>
            ) : (
                <Image
                    source={{ uri: firstFile }}
                    style={styles.image}
                    contentFit="cover"
                />
            )}


        </View>
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
