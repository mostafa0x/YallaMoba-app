import { View, Text } from 'react-native';
<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import useGetComments from 'Hooks/useGetComments';
import { useDispatch } from 'react-redux';
import callToast from 'components/toast';
import { addComment } from 'lib/Store/slices/ReelsSlice';
import NewCommentCard from 'components/CommentCard';
import axiosClient from 'lib/api/axiosClient';

export default function CommentsView({ userData, postId, isMenuOpen, setIsMenuOpen }: any) {
  const dispatch = useDispatch();
  const [isSubmitComment, setIsSubmitComment] = useState(false);
  const modalRef = useRef<Modalize>(null);
  const textboxRef = useRef<any | null>(null);
  const [content, setContent] = useState<string | null>('');
  const [PostId, setPostId] = useState(-1);

  const commentsX = useGetComments(PostId, dispatch);

  async function handleAddComment() {
=======
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
>>>>>>> 63be14c
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
<<<<<<< HEAD
        console.log(res.data);
=======
>>>>>>> 63be14c
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
<<<<<<< HEAD
  }

  useEffect(() => {
    if (isMenuOpen) {
      modalRef.current?.open();
      setIsMenuOpen(false);
    }

=======
  }, [textboxRef, content, isSubmitComment, PostId, commentsX, dispatch]);

  useEffect(() => {
    if (!modalRef.current) return;
    isMenuOpen && modalRef.current?.open();
    setIsMenuOpen(false);
>>>>>>> 63be14c
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
<<<<<<< HEAD
            onFocus={() => isMenuOpen}
=======
            onFocus={() => setIsMenuOpen(true)}
>>>>>>> 63be14c
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
<<<<<<< HEAD
                // setIsMenuOpen(false);
=======
                setIsMenuOpen(false);
>>>>>>> 63be14c
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
<<<<<<< HEAD
=======

export default memo(CommentsView);
>>>>>>> 63be14c
