import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Button, Divider, Icon, Menu, TextInput } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { StateFace } from 'types/interfaces/store/StateFace';
import { addComment, cheangeReelsData } from 'lib/Store/slices/ReelsSlice';
import { useVideoPlayer, VideoView } from 'expo-video';
import RootReel from 'components/Reels/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Modalize } from 'react-native-modalize';
import useGetComments from 'Hooks/useGetComments';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import callToast from 'components/toast';
import axiosClient from 'lib/api/axiosClient';
import NewCommentCard from 'components/CommentCard';
import ImagesView from 'components/ViewReel/ImagesView';
import ReelItem from 'components/ReelItem';
import CommentsView from 'components/CommentsView';
dayjs.extend(relativeTime);

export default function Watch() {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const POST_HEIGHT = height - insets.bottom;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { ReelsData } = useSelector((state: StateFace) => state.ReelsReducer);
  const { userData } = useSelector((state: StateFace) => state.UserReducer, shallowEqual);

  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [file, setFile] = useState('');
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 1, height: 1 });
  const [PostId, setPostId] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitComment, setIsSubmitComment] = useState(false);
  const textboxRef = useRef<any | null>(null);
  const modalRef = useRef<Modalize>(null);
  const [content, setContent] = useState<string | null>('');
  const commentsX = useGetComments(PostId, dispatch);
  const memoizedCommentsX = useMemo(() => commentsX, [commentsX.data, commentsX.isLoading]);

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

  const openModal = useCallback((postId: number) => {
    setPostId(postId);
    setIsMenuOpen(true);
  }, []);

  useEffect(() => {
    if (PostId === -1) return;
    commentsX.refetch();
    return () => {};
  }, [PostId]);

  const player = useVideoPlayer(file, (player) => {
    player.loop = true;
    player.play();
  });

  const { data, isError, error, refetch } = useReels(page);
  useEffect(() => {
    if (page > 1) refetch();
  }, [page]);

  async function handleAddComment() {
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
        console.log(res.data);
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
  }

  useEffect(() => {
    if (data) {
      setPage(data.currentPage);
      setTotalPage(data.totalPages);
      dispatch(cheangeReelsData(data.posts));
      setPageLoading(false);
      setIsFetchingMore(false);
    }
  }, [data]);

  const getFileType = (url: string): 'video' | 'image' => {
    if (!url) return 'image';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.mov') || lowerUrl.endsWith('.webm')) {
      return 'video';
    }
    return 'image';
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0].item;
      const fileUrl = firstVisibleItem.files?.[0] ?? null;
      const fileType = getFileType(fileUrl);
      if (fileType === 'video') {
        setFile(fileUrl);
        setIsVideoLoading(true);
      } else {
        setFile('');
        setIsVideoLoading(false);
      }
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: any) => (
      <ReelItem
        file={file}
        player={player}
        item={item}
        PostId={PostId}
        openModal={openModal}
        POST_HEIGHT={POST_HEIGHT}
      />
    ),
    [file, POST_HEIGHT]
  );

  const LoaderFooter = useCallback(() => {
    if (!isFetchingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size={30} color={'white'} />
      </View>
    );
  }, [isFetchingMore]);

  const loadMore = useCallback(() => {
    if (isFetchingMore || pageLoading) return;
    if (page >= totalPage) {
      setIsFetchingMore(false);
      console.log('No more pages');
      return;
    }
    setIsFetchingMore(true);
    setPage((curr) => curr + 1);
  }, [page, isFetchingMore, pageLoading]);

  return (
    <View className="flex-1 bg-black">
      {isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl text-white">Error: {error?.message}</Text>
          <Button mode="contained" onPress={() => refetch()}>
            Retry
          </Button>
        </View>
      ) : pageLoading ? (
        <View className="flex-1  items-center justify-center">
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <>
          <View>
            <Text className="p-3 text-3xl text-white">Reels</Text>
          </View>
          {/* <Modalize
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
          /> */}
          <CommentsView
            commentsX={memoizedCommentsX}
            userData={userData}
            PostId={PostId}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          <FlatList
            data={ReelsData}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            snapToInterval={POST_HEIGHT}
            snapToAlignment="start"
            decelerationRate="fast"
            pagingEnabled
            removeClippedSubviews={true}
            windowSize={5}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: ReelsData.length * POST_HEIGHT }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            ListFooterComponent={LoaderFooter}
            getItemLayout={(data, index) => ({
              length: POST_HEIGHT,
              offset: POST_HEIGHT * index,
              index,
            })}
          />
        </>
      )}
    </View>
  );
}
