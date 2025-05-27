import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface MediaAsset {
    uri: string;
    type: 'image' | 'video';
    fileName?: string | null;
}

const AddPostScreen: React.FC = () => {
    const [media, setMedia] = useState<MediaAsset | null>(null);
    const [caption, setCaption] = useState<string>('');
    const { showActionSheetWithOptions } = useActionSheet();
    const router = useRouter()
    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const mediaType = asset.type === 'video' ? 'video' : 'image';

            setMedia({
                uri: asset.uri,
                type: mediaType,
                fileName: asset.fileName,
            });
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const mediaType = asset.type === 'video' ? 'video' : 'image';

            setMedia({
                uri: asset.uri,
                type: mediaType,
                fileName: asset.fileName,
            });
        }
    };
    const DeletMedia = () => {
        setMedia(null)
    }
    const openActionSheet = () => {
        const options = media ? ['❌ Delete Media', '❌ Close'] : ['📸 Camera', '🖼️ Gallery', '❌ Close'];
        const cancelButtonIndex = media ? 1 : 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (selectedIndex) => {
                switch (selectedIndex) {

                    case 0:
                        media ? DeletMedia() : takePhoto();
                        break;
                    case 1:
                        media ? null : pickFromGallery();
                        break;
                    case 2:
                        // Cancel
                        break;
                }
            }
        );
    };

    const handlePost = () => {
        if (!media) return;
        console.log('Posting:', { media, caption });
    };

    return (
        <View style={styles.container}>
            <View className='flex-row justify-between border-b-2 border-gray-200 p-2 items-center mb-5'>
                <View className='flex-row  items-center '>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View className=''>
                            <Icon size={40} source={"close"} />
                        </View>
                    </TouchableOpacity>
                    <Text>NEW POST</Text>
                </View>
            </View>

            <View className='m-10'>
                <TouchableOpacity style={styles.mediaBox} onPress={openActionSheet}>
                    {media ? (
                        media.type === 'video' ? (
                            <Video
                                source={{ uri: media.uri }}
                                style={styles.media}
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                isLooping
                            />
                        ) : (
                            <Image source={{ uri: media.uri }} style={styles.media} />
                        )
                    ) : (
                        <Text style={styles.placeholder}>Select Galley or Camera</Text>
                    )}
                </TouchableOpacity>

                <TextInput
                    placeholder="describe your post..."
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    value={caption}
                    onChangeText={setCaption}
                />
                <View className='items-center mt-10'>
                    <View className=' w-[180px]'>

                        <Button color={"green"} title="Post Now" onPress={handlePost} disabled={!media || caption.trim() === ''} />
                    </View>
                </View>

            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mediaBox: {
        width: '100%',
        height: 500,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderRadius: 10,
        overflow: 'hidden',
    },
    placeholder: {
        color: '#999',
        fontSize: 16,
    },
    media: {
        width: '100%',
        height: '100%',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 16,
        borderRadius: 8,
        textAlignVertical: 'top',

    },
});

export default function AppWithActionSheetProvider() {
    const { ActionSheetProvider } = require('@expo/react-native-action-sheet');
    return (
        <ActionSheetProvider>
            <AddPostScreen />
        </ActionSheetProvider>
    );
}
