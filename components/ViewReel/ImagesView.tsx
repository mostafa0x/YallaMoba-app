import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import ImageViewing from 'react-native-image-viewing';

interface Props {
  fileUrl: string;
  POST_HEIGHT: number;
}

export default function ImagesView({ fileUrl, POST_HEIGHT }: Props) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={{ width: screenWidth, height: screenHeight, backgroundColor: 'black' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
          <Image
            source={{ uri: fileUrl }}
            style={{ width: '100%', height: POST_HEIGHT - 100 }}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
      <ImageViewing
        images={[{ uri: fileUrl }]}
        doubleTapToZoomEnabled
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </>
  );
}
