import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Button } from 'react-native-paper';

export default function InfoBox() {
  const [isShowMore, setIsShowMore] = useState(false);
  const txt = 'Dessasa sasassa31 23213232dsa dsadasdDessa sasasassa3123213232dsadsadasd';
  return (
    <View className="absolute top-[820px] z-[1] ml-6 gap-2">
      <View className="flex-row items-center gap-2">
        <Avatar.Image source={{ uri: '' }} size={50} />
        <Text className="text-lg text-white">NamePlayer</Text>
        <View className="ml-2 rounded-xl border-2 border-white">
          <Button textColor="white">Follow</Button>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={isShowMore ? 0 : 0.5}
        onPress={() => (isShowMore ? setIsShowMore(false) : setIsShowMore(true))}>
        <Text className="w-[400px] text-white">
          {isShowMore ? txt : txt.split(' ').splice(0, 2).join(' ')}
          {!isShowMore && ' ...'}
        </Text>
      </TouchableOpacity>
      {/* {!isShowMore && (
        <TouchableOpacity onPress={() => setIsShowMore(true)}>
          <Text className="text-white opacity-70">more...</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
}
