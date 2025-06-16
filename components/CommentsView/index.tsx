import { View, Text } from 'react-native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { userDataFace } from 'types/interfaces/store/UserFace';
import callToast from 'components/toast';
import { useDispatch } from 'react-redux';
import axiosClient from 'lib/api/axiosClient';
import { addComment } from 'lib/Store/slices/ReelsSlice';
import NewCommentCard from 'components/CommentCard';

interface props {
  commentsX: any;
  userData: userDataFace | null;
  PostId: number;
  isMenuOpen: boolean;
  setIsMenuOpen: any;
}
function CommentsView({ commentsX, userData, PostId, isMenuOpen, setIsMenuOpen }: props) {
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>(null);
  const [content, setContent] = useState<string | null>('');
  const textboxRef = useRef<any | null>(null);
  const [isSubmitComment, setIsSubmitComment] = useState(false);

  //   async function handleAddComment() {
  //     if (!textboxRef.current || !content) {
  //       callToast({
  //         type: 'error',
  //         text1: 'Comment cannot be empty',
  //         text2: 'Please enter a comment.',
  //       });
  //       return;
  //     }

  //     if (textboxRef.current) {
  //       if (isSubmitComment) return;
  //       setIsSubmitComment(true);
  //       try {
  //         const res = await axiosClient.post(`/posts/${PostId}/comments/`, { content });
  //         setContent(null);
  //         dispatch(addComment(PostId));
  //         console.log(res.data);
  //         commentsX.refetch();
  //       } catch (err) {
  //         console.error('Error adding comment:', err);
  //         callToast({
  //           type: 'error',
  //           text1: 'Error adding comment',
  //           text2: 'Please try again later.',
  //         });
  //       } finally {
  //         setIsSubmitComment(false);
  //       }
  //     }
  //   }
  const handleAddComment = useCallback(async () => {
    if (!textboxRef.current || !content) {
      callToast({
        type: 'error',
        text1: 'Comment cannot be empty',
        text2: 'Please enter a comment.',
      });
      return;
    }

    if (textboxRef.current) {
      if (isSubmitComment) return;
      setIsSubmitComment(true);
      try {
        const res = await axiosClient.post(`/posts/${PostId}/comments/`, { content });
        setContent(null);
        dispatch(addComment(PostId));
        commentsX.refetch();
      } catch (err) {
        console.error('Error adding comment:', err);
        callToast({
          type: 'error',
          text1: 'Error adding comment',
          text2: 'Please try again later.',
        });
      } finally {
        setIsSubmitComment(false);
      }
    }
  }, [textboxRef, content, isSubmitComment, PostId, commentsX, dispatch]);

  useEffect(() => {
    if (!modalRef.current) return;
    isMenuOpen && modalRef.current?.open();
    setIsMenuOpen(false);
    return () => {};
  }, [isMenuOpen]);

  return (
    <Modalize
      ref={modalRef}
      modalHeight={900}
      handleStyle={{ backgroundColor: '#b9b3b3' }}
      withHandle={true}
      panGestureComponentEnabled={false}
      FooterComponent={
        <View className="flex-row gap-4 pb-2">
          <TextInput
            onChange={(e) => setContent(e.nativeEvent.text)}
            value={content ?? ''}
            ref={textboxRef}
            className="w-[385px]"
            style={{ borderRadius: 20 }}
            placeholder="Add a comment..."
            onFocus={() => setIsMenuOpen(true)}
            onSubmitEditing={handleAddComment}
          />
          {isSubmitComment ? (
            <ActivityIndicator size={30} color="black" />
          ) : (
            <Button
              style={{ padding: 5 }}
              mode="contained"
              onPress={() => {
                handleAddComment();
                setIsMenuOpen(false);
              }}>
              Submit
            </Button>
          )}
        </View>
      }
      flatListProps={{
        data: commentsX.data,

        keyExtractor: (item) => item.id.toString(),
        ListEmptyComponent: () => {
          return (
            !commentsX.isLoading && (
              <View className="mt-20 items-center">
                <Text className="text-2xl text-gray-500">No Comments yet..</Text>
              </View>
            )
          );
        },
        ListHeaderComponent: () => {
          return (
            commentsX.isLoading && (
              <View className="mt-[200px] flex-row items-center justify-center">
                <ActivityIndicator size={100} />
              </View>
            )
          );
        },
        renderItem: ({ item }) => (
          <View className="mx-5 my-10">
            <NewCommentCard
              item={item}
              userData={userData}
              postId={PostId}
              refetch={commentsX.refetch}
            />
          </View>
        ),
        keyboardShouldPersistTaps: 'handled',
      }}
    />
  );
}

export default memo(CommentsView);
