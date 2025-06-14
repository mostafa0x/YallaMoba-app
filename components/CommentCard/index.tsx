import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Button, Divider, Menu } from 'react-native-paper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import callToast from 'components/toast';
import axiosClient from 'lib/api/axiosClient';
import { useDispatch } from 'react-redux';
import { deleteComment } from 'lib/Store/slices/ReelsSlice';
dayjs.extend(relativeTime);

export default function NewCommentCard({ item, userData, postId, refetch }: any) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleDeleteComment = async (postId: number, commentID: number) => {
    try {
      const res = await axiosClient.delete(`/posts/${postId}/comments/${commentID}`);
      closeMenu();
      dispatch(deleteComment(postId));
      refetch();
      callToast({
        type: 'success',
        text1: 'Yalla Moba',
        text2: res.data.message ?? 'Comment deleted successfully',
      });
    } catch (err: any) {
      console.log(err);
      callToast({
        type: 'error',
        text1: 'Yalla Moba',
        text2: err.message ?? 'Error Delete Comments !',
      });
    }
  };
  return (
    <View className="flex-row gap-4">
      <Avatar.Image source={{ uri: item.avatar }} size={60} />
      <View className="w-[400px] gap-2">
        <View className=" flex-row justify-between ">
          <Text className="text-lg font-extrabold">{item.username}</Text>
          <View className="mr-2 w-[120px] flex-row items-center">
            <Text className=" text-right text-sm opacity-60">
              {dayjs(item.updated_at).fromNow()}{' '}
            </Text>
            {item.username === userData?.username && (
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Button className="text-2xl" onPress={openMenu}>
                    .....
                  </Button>
                }>
                <Menu.Item
                  titleStyle={{ color: 'red' }}
                  onPress={() => handleDeleteComment(item.post_id, item.id)}
                  title="Delete"
                />
              </Menu>
            )}
          </View>
        </View>
        <Text>{item.content}</Text>
      </View>
    </View>
  );
}
