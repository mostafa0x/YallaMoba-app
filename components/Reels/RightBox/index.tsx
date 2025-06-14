import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-paper';

interface props {
  countLikes: number;
  countComment: number;
}

export default function RightBox({ countLikes, countComment }: props) {
  const iconSize = 30;

  return (
    <View className="absolute left-[470px] top-[720px] z-[1]  flex-col gap-5">
      <View className="items-center">
        <TouchableOpacity>
          <Icon color="white" size={iconSize} source={'cards-heart-outline'} />
        </TouchableOpacity>
        <Text className="text-lg text-white">{countLikes}</Text>
      </View>
      <View className="items-center">
        <TouchableOpacity>
          <Icon color="white" size={iconSize} source={'chat-outline'} />
        </TouchableOpacity>
        <Text className="text-lg text-white">{countComment}</Text>
      </View>
      <View className="items-center">
        <TouchableOpacity>
          <Icon color="white" size={iconSize} source={'share-outline'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
