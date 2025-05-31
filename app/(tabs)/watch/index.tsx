import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, Button, Icon } from 'react-native-paper';
import ReelBox from 'components/Reels/layout';
import RootReel from 'components/Reels/layout';

export default function Watch() {
  return (
    <View className="flex-1 bg-white">
      <View className="m-2 ">
        <Text className="text-3xl">Reels</Text>
      </View>

      <RootReel countLikes={0} countComment={0} />
      <View className="">
        <View className="mt-2 h-[1024px] w-full bg-black"></View>
      </View>
    </View>
  );
}
