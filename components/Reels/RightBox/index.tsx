import { View, Text } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-paper';

interface props {
  countLikes: number;
  countComment: number;
}

export default function RightBox({ countLikes, countComment }: props) {
  return (
    <View className="absolute left-[450px] top-[700px] z-[1]  flex-col gap-5">
      <View className="items-center">
        <Icon color="white" size={40} source={'cards-heart-outline'} />
        <Text className="text-2xl text-white">{countLikes}</Text>
      </View>
      <View className="items-center">
        <Icon color="white" size={40} source={'chat-outline'} />
        <Text className="text-2xl text-white">{countComment}</Text>
      </View>
      <View className="items-center">
        <Icon color="white" size={40} source={'share-outline'} />
      </View>
    </View>
  );
}
