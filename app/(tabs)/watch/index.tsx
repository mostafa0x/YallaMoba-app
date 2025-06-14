import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Divider, Icon, Menu, TextInput } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { useDispatch, useSelector } from 'react-redux';
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
dayjs.extend(relativeTime);

export default function Watch() {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const POST_HEIGHT = height - insets.bottom;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { ReelsData } = useSelector((state: StateFace) => state.ReelsReducer);
  const { userData } = useSelector((state: StateFace) => state.UserReducer);

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
  const modalRef = useRef<Modalize>(null);
  const textboxRef = useRef<any | null>(null);
  const [content, setContent] = useState<string | null>('');

  const commentsX = useGetComments(PostId, dispatch);
  const openModal = (postId: number) => {
    setPostId(postId);
    modalRef.current?.open();
    setIsMenuOpen(true);
    textboxRef.current && textboxRef.current?.focus();
  };

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
  const VideoPlayerStatus = player.status;
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

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

  useEffect(() => {
    if (VideoPlayerStatus === 'readyToPlay' || VideoPlayerStatus == 'idle') {
      setIsVideoLoading(false);
    }
  }, [VideoPlayerStatus, file]);

  const renderItem = useCallback(
    ({ item }: any) => {
      const fileUrl = item.files?.[0] ?? null;
      const fileType = getFileType(fileUrl);

      const videoAspectRatio = videoSize.width / videoSize.height;
      const calculatedWidth = POST_HEIGHT * videoAspectRatio;

      return (
        <View>
          <RootReel post={item} openModal={openModal} />
          <View
            style={{
              height: POST_HEIGHT,
              width: '100%',
            }}>
            {fileType === 'video' ? (
              fileUrl === file ? (
                <>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}>
                    {isVideoLoading ? (
                      <View className=" h-full w-full items-center justify-center">
                        <ActivityIndicator size={50} color={'white'} />
                      </View>
                    ) : (
                      <VideoView
                        player={player}
                        style={{ width: calculatedWidth, height: POST_HEIGHT - 100 }}
                        //   onLoad={handleVideoLoad}
                        allowsFullscreen={false}
                        nativeControls={false}
                        contentFit="fill"
                      />
                    )}
                  </View>
                </>
              ) : null
            ) : (
              <Image
                source={{ uri: fileUrl }}
                style={{ width: '100%', height: '90%' }}
                contentFit="fill"
              />
            )}
          </View>
        </View>
      );
    },
    [file, isVideoLoading]
  );

  const handleVideoLoad = (status: any) => {
    const { videoWidth, videoHeight } = status;
    if (videoWidth && videoHeight) {
      setVideoSize({ width: videoWidth, height: videoHeight });
    }
  };

  function loadMore() {
    if (isFetchingMore || pageLoading) return;
    if (page >= totalPage) {
      setIsFetchingMore(false);
      console.log('No more pages');
      return;
    }
    setIsFetchingMore(true);
    setPage((curr) => curr + 1);
  }

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
          <Text className="text-2xl text-white">Loading...</Text>
        </View>
      ) : (
        <>
          <View>
            <Text className="p-3 text-3xl text-white">Reels</Text>
          </View>
          <Modalize
            ref={modalRef}
            modalHeight={700}
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
                  placeholder="Add a comment..."
                  onFocus={() => setIsMenuOpen(true)}
                  onSubmitEditing={handleAddComment}
                />
                {isSubmitComment ? (
                  <ActivityIndicator size={30} color="black" />
                ) : (
                  <Button
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
                  {/* <View className="flex-row gap-4">
                    <Avatar.Image source={{ uri: item.avatar }} size={60} />
                    <View className="w-[400px] gap-2">
                      <View className=" flex-row justify-between ">
                        <Text className="text-lg font-extrabold">{item.username}</Text>
                        <View className="w-[120px] flex-row">
                          <Text className=" text-right text-sm opacity-60">
                            {dayjs(item.updated_at).fromNow()}
                            {item.username === userData?.username && (
                              <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={<Button onPress={openMenu}>.....</Button>}>
                                <Menu.Item onPress={() => {}} title="Edit (onWork)" />
                                <Menu.Item title="User Profile" />
                                <Divider />
                                <Menu.Item
                                  titleStyle={{ color: 'red' }}
                                  //  onPress={() => handleDeleteComment(item.post_id, item.id)}
                                  title="Delete"
                                />
                              </Menu>
                            )}
                          </Text>
                        </View>
                      </View>
                      <Text>{item.content}</Text>
                    </View>
                  </View> */}
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

          <FlatList
            data={ReelsData}
            extraData={file}
            keyExtractor={(item, index) => item.id.toString() + '_' + index}
            renderItem={renderItem}
            snapToInterval={POST_HEIGHT}
            snapToAlignment="start"
            decelerationRate="fast"
            pagingEnabled
            removeClippedSubviews={false}
            bounces={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: ReelsData.length * POST_HEIGHT }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </>
      )}
    </View>
  );
}
