import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Button } from 'react-native-paper';
import { ReelPostFace } from 'types/interfaces/store/ReelsFace';

export default function InfoBox({ post }: { post: ReelPostFace }) {
  const [isShowMore, setIsShowMore] = useState(false);
  return (
    <View className="absolute top-[845px] z-[1] ml-6 gap-2">
      <View className="flex-row items-center gap-2">
        <Avatar.Image source={{ uri: post.avatar }} size={50} />
        <View>
          <Text className="absolute left-[1px] top-[-0.5px] text-[14px] font-bold  text-black">
            {post.username}
          </Text>
          <Text className=" text-white">{post.username}</Text>
        </View>
        <View className="ml-2 rounded-xl border-2 border-white">
          <Button textColor="white">Follow</Button>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={isShowMore ? 0 : 0.5}
        onPress={() => (isShowMore ? setIsShowMore(false) : setIsShowMore(true))}>
        <Text className="w-[400px] text-white">
          {isShowMore ? post.body : post.body.split(' ').splice(0, 2).join(' ')}
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
