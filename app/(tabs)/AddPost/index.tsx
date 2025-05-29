import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Icon, Button, HelperText, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { validationSchemaAddPost } from 'lib/Validations/AddPostSchema';
import axiosClient from 'lib/api/axiosClient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';

interface fromFace {
    body: string
    files: any
}

interface MediaAsset {
    uri: string;
    type: 'image' | 'video';
    fileName?: string | null;
}

const AddPostScreen: React.FC = () => {
    const { userToken } = useSelector((state: StateFace) => state.UserReducer)
    const [media, setMedia] = useState<MediaAsset | null>(null);
    const [caption, setCaption] = useState<string>('');
    const { showActionSheetWithOptions } = useActionSheet();
    const router = useRouter()
    const player = useVideoPlayer(media?.uri ?? '', player => {
        player.loop = true;
        player.play();
    });
    function handleFormData(formValues: fromFace) {
        const formData = new FormData();
        formData.append("body", formValues.body);

        const file = formValues.files;
        if (file) {
            const uriParts = file.uri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            formData.append("files", {
                uri: file.uri,
                name: file.fileName || `upload.${fileType}`,
                type: file.type === 'video' ? `video/${fileType}` : `image/${fileType}`,
            } as any); // `as any` to bypass TypeScript warning
        }

        handleAddPost(formData);
    }

    const handleAddPost = async (formvalues: any) => {

        try {
            const res = await axios.post('https://yalla-moba-v2.vercel.app/api/posts/', formvalues, {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res.data.message);
        } catch (err: any) {
            console.log(err?.response?.data);
        }

    }

    const formik = useFormik({
        initialValues: {
            body: '',
            files: null
        }, validationSchema: validationSchemaAddPost,
        onSubmit: handleFormData
    })




    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const mediaType = asset.type === 'video' ? 'video' : 'image';
            formik.setFieldValue('files', asset)
            console.log(asset);

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
            formik.setFieldValue('files', asset)
            setMedia({
                uri: asset.uri,
                type: mediaType,
                fileName: asset.fileName,
            });
        }
    };
    const DeletMedia = () => {
        formik.resetForm()
        setMedia(null)
    }
    const openActionSheet = () => {
        const options = media ? ['❌ Delete Media', 'Close'] : ['📸 Camera', '🖼️ Gallery', '❌ Close'];
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

                <View className='h-[500px] mb-10'>

                    {!media ? <TouchableOpacity onPress={openActionSheet} style={styles.mediaBox}>
                        <Text style={styles.placeholder}>Select Galley or Camera</Text>

                    </TouchableOpacity>
                        : media && media.type == 'video' ?
                            <View style={styles.media} className='gap-5'>
                                <VideoView

                                    player={player}
                                    style={styles.media}
                                    allowsFullscreen
                                    allowsPictureInPicture
                                />

                                <Button onPress={DeletMedia} buttonColor='red' textColor='white'>Delete Video</Button>

                            </View>

                            :
                            <TouchableOpacity onPress={openActionSheet} >
                                <Image resizeMode='contain' source={{ uri: media?.uri }} style={styles.media} />
                            </TouchableOpacity>
                    }

                </View>


                <View className='mt-16'>
                    <TextInput
                        onChangeText={formik.handleChange("body")}
                        onBlur={formik.handleBlur("body")}
                        placeholder="describe your post..."
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                        value={formik.values.body}
                    />
                    <View className='items-center mt-10'>
                        <View className=' w-[180px]'>
                            <Button disabled={!media} textColor='white' buttonColor='green' onPress={() => formik.handleSubmit()}  >{!media ? "Select Media" : " Post Now"}</Button>
                        </View>
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
        height: 400,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
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
