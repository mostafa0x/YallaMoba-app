import { View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-paper';
import RightBox from './RightBox';
import InfoBox from './InfoBox';
import { ReelPostFace } from 'types/interfaces/store/ReelsFace';

interface props {
  post: ReelPostFace;
}

export default function RootReel({ post }: props) {
  return (
    <View>
      <InfoBox post={post} />
      <RightBox countLikes={post.likeCount} countComment={post.commentCount} />
      <View className={`mt-2 h-[1024px] w-full bg-black`}></View>
    </View>
  );
}
