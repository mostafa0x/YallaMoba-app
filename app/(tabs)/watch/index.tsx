import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, Button, Icon } from 'react-native-paper';

export default function Watch() {
  return (
    <View className="flex-1 bg-white">
      <View className="m-2 ">
        <Text className="text-3xl">Reels</Text>
      </View>
      <View className="absolute top-[900px] z-[1] ml-6 flex-row items-center gap-2">
        <Avatar.Image source={{ uri: '' }} size={50} />
        <Text className="text-lg text-white">NamePlayer</Text>
        <View className="ml-2 rounded-xl border-2 border-white">
          <Button textColor="white">Follow</Button>
        </View>
      </View>
      <View className="absolute left-[450px] top-[700px] z-[1]  flex-col items-center gap-10">
        <Icon color="white" size={40} source={'cards-heart-outline'} />
        <Icon color="white" size={40} source={'chat-outline'} />
        <Icon color="white" size={30} source={'share-outline'} />
      </View>
      <View className="">
        <View className="h-[950px] w-full bg-black"></View>
      </View>
    </View>
  );
}
