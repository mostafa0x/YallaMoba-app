import { View, Text } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-paper';
import RightBox from './RightBox';
import InfoBox from './InfoBox';

interface props {
  countLikes: number;
  countComment: number;
}

export default function RootReel({ countLikes, countComment }: props) {
  return (
    <View>
      <InfoBox />
      <RightBox countLikes={countLikes} countComment={countComment} />
      <View className="mt-2 h-[1024px] w-full bg-black"></View>
    </View>
  );
}
