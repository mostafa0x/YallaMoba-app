import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { LikeReelPost, unLikeReelPost } from 'lib/Store/slices/ReelsSlice';
import axiosClient from 'lib/api/axiosClient';
import callToast from 'components/toast';

interface props {
  countLikes: number;
  countComment: number;
  isLiked: boolean;
  postId: number;
}

export default function RightBox({ countLikes, countComment, isLiked, postId }: props) {
  const dispatch = useDispatch();
  const iconSize = 30;
  const [likeLoading, setLikeLoading] = React.useState(false);

  async function handleLike() {
    if (likeLoading) return;
    setLikeLoading(true);
    if (isLiked) {
      try {
        const res = await axiosClient.delete(`/posts/${postId}/like/`);
        dispatch(unLikeReelPost(postId));
      } catch (err) {
        console.error('Error liking post:', err);
        callToast({
          type: 'error',
          text1: 'Error delete post',
          text2: 'Please try again later.',
        });
      } finally {
        setLikeLoading(false);
      }
    } else {
      try {
        const res = await axiosClient.post(`/posts/${postId}/like/`);
        dispatch(LikeReelPost(postId));
      } catch (err) {
        console.error('Error liking post:', err);
        callToast({
          type: 'error',
          text1: 'Error liking post',
          text2: 'Please try again later.',
        });
      } finally {
        setLikeLoading(false);
      }
    }
  }

  return (
    <View className="absolute left-[470px] top-[720px] z-[1]  flex-col gap-5">
      <View className="items-center">
        {isLiked ? (
          <TouchableOpacity onPress={handleLike}>
            {likeLoading ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <Icon color="red" size={iconSize} source={'cards-heart'} />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLike}>
            {likeLoading ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <Icon color="white" size={iconSize} source={'cards-heart-outline'} />
            )}
          </TouchableOpacity>
        )}

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
