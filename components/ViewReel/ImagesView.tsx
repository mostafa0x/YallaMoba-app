import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { Image } from 'expo-image';

interface Props {
  fileUrl: string;
}

export default function ImagesView({ fileUrl }: Props) {
  const [visible, setVisible] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return (
    <View style={{ width: screenWidth, height: screenHeight - 35, backgroundColor: 'black' }}>
      <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => setVisible(true)}>
        <Image
          source={{ uri: fileUrl }}
          style={{ width: '100%', height: '90%' }}
          contentFit="contain"
        />
      </TouchableOpacity>

      <ImageView
        images={[{ uri: fileUrl }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
      />
    </View>
  );
}
