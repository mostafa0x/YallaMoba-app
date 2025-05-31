import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, Button } from 'react-native-paper';

export default function InfoBox() {
  return (
    <View className="absolute top-[820px] z-[1] ml-6 gap-2">
      <View className="flex-row items-center gap-2">
        <Avatar.Image source={{ uri: '' }} size={50} />
        <Text className="text-lg text-white">NamePlayer</Text>
        <View className="ml-2 rounded-xl border-2 border-white">
          <Button textColor="white">Follow</Button>
        </View>
      </View>
      <Text className="text-white">Dessasasasassa3123213232dsadsadasd</Text>
      <Text className="text-white">more...</Text>
    </View>
  );
}
