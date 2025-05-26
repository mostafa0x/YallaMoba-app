import React, { useRef, useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { Icon } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function ShareProfile() {
    const qrRef = useRef(null);
    const { username } = useLocalSearchParams();
    const router = useRouter()
    const randomBg =
        ["#61630a", "#ce4500", "#572911", "#11411f", "#d128bb", "#0e205e", "#25412e", "#550624", "#5620b9", "#850966", "#970000"]
    const [bgColor, setBgColor] = useState(1)

    function getRandomInt(min: number, max: number) {
        const index = Math.floor(Math.random() * (max - min + 1)) + min;
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

            await Sharing.shareAsync(newPath);
        } catch (error) {
            console.error('Sharing Error ', error);
        }
    };

    return (
        <View onTouchStart={() => getRandomInt(1, randomBg.length - 1)} style={{ flex: 1, backgroundColor: randomBg[bgColor] }}>
            <View className='flex-row justify-start'>
                <View onTouchStart={() => router.back()} className='p-2 '>
                    <Icon size={50} source={"close"} />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View className='mb-10'>
                    <Text className='text-6xl'>{username}</Text>
                </View>
                <View className='border-white border-[30px]  ' ref={qrRef} collapsable={false}>
                    <QRCode value="https://github.com/mostafa0x" size={300} />
                </View>
                <View style={{ marginTop: 40 }}>
                    <Button title="Share QR Code" onPress={shareQR} />
                </View>
            </View>
        </View >
    );
}
