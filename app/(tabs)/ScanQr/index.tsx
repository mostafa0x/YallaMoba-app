import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import callToast from 'components/toast';

export default function ScanQr() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need camera permission</Text>
                <Button onPress={requestPermission} title="camera permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function handleBarCodeScanned({ data }: { data: string }) {
        if (!scanned) {
            setScanned(true);
            try {
                const url = new URL(data);
                const path = url.pathname;
                router.push(path);
            } catch (err) {
                console.warn("Invalid QR code or not a valid app link");
                callToast({ type: 'error', text1: "Yalla Moba", text2: "Invalid QR code or not a valid app link" });
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            >


            </CameraView>
            <View className='flex justify-center items-center absolute left-[175px] mt-5'>
                <Text className='text-4xl text-white '>Yalla Moba Scan</Text>
            </View>
            <View className='flex justify-center items-center absolute top-[600px] left-[225px] mt-5'>
                <Text className='text-xl opacity-50 text-white '>scan  code</Text>
            </View>
            {scanned && (
                <View style={{ padding: 20 }}>
                    <Button title="Scan QR Again" onPress={() => setScanned(false)} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
});
