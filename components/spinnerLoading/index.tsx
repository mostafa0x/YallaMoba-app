import { View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { Text } from 'react-native-paper';

interface props {
  txt?: string;
}
export default function SpinnerLoading({ txt }: props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} className="items-center justify-center">
      <Image
        source={require('../../assets/gifs/Loading.gif')}
        contentFit="contain"
        style={{ width: 550, height: 400 }}
        alt="Loading..."
      />
      <Text style={{ fontSize: 28 }}>{txt ?? 'Loading...'}</Text>
    </View>
  );
}
