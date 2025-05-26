import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { Icon } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function ShareProfile() {
    const qrRef = useRef(null);
    const { username, uid } = useLocalSearchParams();
    const router = useRouter()
    const randomBg =
        ["#61630a", "#ce4500", "#773511", "#11411f", "#d128bb", "#0e205e", "#25412e", "#550624", "#5620b9", "#850966", "#970000", "#ff0095", "#00d9ff", "#033a5f", "#25bb00", "#5800bd", "#380092"]
    const [bgColor, setBgColor] = useState(1)

    function getRandomInt(min: number, max: number) {
        const index = Math.floor(Math.random() * (max - min + 1)) + min;
        if (index === bgColor) {
            return getRandomInt(0, randomBg.length - 1)
        }
        return setBgColor(index)
    }

    const shareQR = async () => {
        try {
            const uri = await captureRef(qrRef, {
                format: 'png',
                quality: 1,
            });

            const newPath = `${FileSystem.cacheDirectory}qr-code.png`;
            await FileSystem.copyAsync({
                from: uri,
                to: newPath,
            });

            const canShare = await Sharing.isAvailableAsync();
            if (!canShare) {
                Alert.alert('Sharing is not supported on this device');
                return;
            }

            await Sharing.shareAsync(newPath, { dialogTitle: "xxxxxx" });
        } catch (error) {
            console.error('Sharing Error ', error);
        }
    };

    useEffect(() => {
        getRandomInt(0, randomBg.length - 1)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: randomBg[bgColor] }} >
            <View>
                <View className='flex-row justify-start'>
                    <View onTouchStart={() => router.back()} className='m-5 bg-white border-white border-[1px] rounded-[50px]'>
                        <Icon size={50} source={"close"} />
                    </View>

                </View>
            </View>
            <View ref={qrRef} onTouchStart={() => getRandomInt(0, randomBg.length - 1)} style={{ flex: 1, backgroundColor: randomBg[bgColor] }}>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <View className='border-white border-[30px]  bg-white ' collapsable={false}>
                        <Text className='text-6xl text-center mb-5'>YALLA MOBA</Text>
                        <QRCode value={`yallamoba:///profile/${uid}`} size={300} />
                        <Text className='text-6xl text-center mt-5'>{username.toString().toLocaleUpperCase()}</Text>

                    </View>

                </View>
            </View >
            <View style={{ marginTop: 65 }} className='w-[250px]  absolute top-[750px] left-[130px]'>
                <Button title="Share QR Code" onPress={shareQR} />
            </View>
        </View>
    );
}
