import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Icon, Button, HelperText, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { validationSchemaAddPost } from 'lib/Validations/AddPostSchema';
import axiosClient from 'lib/api/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';
import LoadingPop from 'components/LoadingPop/LoadingPop';
import { ChangeTV } from 'lib/Store/slices/UserSlice';
import callToast from 'components/toast';

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
    const { userToken, tv } = useSelector((state: StateFace) => state.UserReducer)
    const [media, setMedia] = useState<MediaAsset | null>(null);
    const dispatch = useDispatch()
    const [errorMes, setErrorMes] = useState<string | null>(null)
    const { showActionSheetWithOptions } = useActionSheet();
    const router = useRouter()
    const player = useVideoPlayer(media?.uri ?? '', (player: VideoPlayer) => {
        player.loop = true;
        player.play();
    });
    function handleFormData(formValues: fromFace) {
        dispatch(ChangeTV(true))
        const formData = new FormData();
        formData.append("body", formValues.body);
        const file = formValues.files;
        if (file) {
            const fileType = file.uri.split('.').pop()
            formData.append("files", {
                uri: media?.uri,
                name: media?.fileName,
                type: media?.type === 'video' ? `video/${fileType}` : `image/${fileType}`,
            } as any);
        }

        handleAddPost(formData);
    }

    const handleAddPost = async (formData: any) => {
        setErrorMes(null)
        try {
            const res = await axiosClient.post('/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data.message);
        } catch (err: any) {
            console.log("Upload Error:", err?.response?.data || err.message);
            setErrorMes(err?.response?.data || err.message)
            callToast({ type: 'error', text1: "Yalla Moba", text2: err?.response?.data || err.message })

        } finally {
            dispatch(ChangeTV(false))

        }
    };


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
            console.log(asset.type);

            const mediaType = asset.type === 'video' ? 'video' : 'image';
            formik.setFieldValue('files', asset)
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
                    <TouchableOpacity onPress={() => !tv && router.back()}>
                        <View className=''>
                            <Icon size={40} source={"close"} />
                        </View>
                    </TouchableOpacity>
                    <Text>NEW POST</Text>
                </View>
            </View>
            <View className='m-10'>
                <View className='h-[500px] mb-10'>
                    {!media ? <View className='flex justify-center items-center text-center'>
                        <TouchableOpacity onPress={openActionSheet} style={styles.mediaBoxBefor} >
                            <Text style={styles.placeholder}>+</Text>
                        </TouchableOpacity>
                    </View>
                        : media && media.type == 'video' ?
                            <View style={styles.media} className='gap-5'>
                                <VideoView
                                    player={player}
                                    style={styles.media}
                                    allowsFullscreen
                                    allowsPictureInPicture
                                    contentFit={'cover'}
                                />
                                <View className='items-end'>

                                    <Button icon={'close'} className='w-[100px]' onPress={DeletMedia} buttonColor='red' textColor='white'>Delete</Button>
                                </View>

                            </View>

                            :
                            <TouchableOpacity onPress={openActionSheet} >
                                <Image resizeMode='contain' source={{ uri: media?.uri }} style={styles.media} />
                            </TouchableOpacity>
                    }

                </View>
                <View className='mt-16'>
                    {media && <>
                        <TextInput
                            onChangeText={formik.handleChange("body")}
                            onBlur={formik.handleBlur("body")}
                            placeholder="describe your post..."
                            style={styles.input}
                            multiline
                            numberOfLines={4}
                            value={formik.values.body}
                        />
                        {!tv ? <Button disabled={!media} textColor='white' buttonColor='blue' onPress={() => formik.handleSubmit()}  >{!media ? "Select Media" : " Post Now"}</Button>
                            : <LoadingPop />}
                        <HelperText style={{ textAlign: 'center' }} type='error' visible={!!errorMes}>{errorMes}</HelperText>
                    </>}

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
    mediaBoxBefor: {
        width: 154,
        height: 154,
        backgroundColor: '#9470dbd1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
    },
    mediaBox: {
        width: '100%',
        height: 400,
        backgroundColor: '#9470dbd1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden',

    },
    placeholder: {
        color: '#000000',
        fontSize: 74,

    },
    media: {
        width: '100%',
        height: '100%',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 5,
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
