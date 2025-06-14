import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

interface Props {
  fileUrl: string;
}

export default function ImagesView({ fileUrl }: Props) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return (
    <View style={{ width: screenWidth, height: screenHeight, backgroundColor: 'black' }}>
      <Image
        source={{ uri: fileUrl }}
        style={{ width: '100%', height: '90%' }}
        contentFit="contain"
      />
    </View>
  );
}
