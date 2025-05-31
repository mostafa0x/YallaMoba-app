import { View, Text, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity>
          <Icon color="white" size={37} source={'cards-heart-outline'} />
        </TouchableOpacity>
        <Text className="text-2xl text-white">{countLikes}</Text>
      </View>
      <View className="items-center">
        <TouchableOpacity>
          <Icon color="white" size={37} source={'chat-outline'} />
        </TouchableOpacity>
        <Text className="text-2xl text-white">{countComment}</Text>
      </View>
      <View className="items-center">
        <TouchableOpacity>
          <Icon color="white" size={37} source={'share-outline'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
