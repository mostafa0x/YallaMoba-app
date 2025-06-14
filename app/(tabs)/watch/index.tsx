import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Button, TextInput } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { StateFace } from 'types/interfaces/store/StateFace';
import { cheangeReelsData } from 'lib/Store/slices/ReelsSlice';
import { useVideoPlayer, VideoView } from 'expo-video';
import RootReel from 'components/Reels/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Modalize } from 'react-native-modalize';
import useGetComments from 'Hooks/useGetComments';

export default function Watch() {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const POST_HEIGHT = height - insets.bottom;

  const { ReelsData } = useSelector((state: StateFace) => state.ReelsReducer);
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
  const modalRef = useRef<Modalize>(null);
  const comments = [
    { id: '1', user: 'Ali', text: 'رائع جدًا 👍' },
    { id: '2', user: 'Sara', text: 'فين ده؟' },
  ];
  const commentsX = useGetComments(PostId, dispatch);
  const openModal = (postId: number) => {
    setPostId(postId);
    modalRef.current?.open();
    setIsMenuOpen(true);
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
                  placeholder="Add a comment..."
                  style={styles.input}
                  onFocus={() => setIsMenuOpen(true)}
                />

                <Button
                  mode="contained"
                  onPress={() => {
                    // Handle comment submission
                    setIsMenuOpen(false);
                  }}>
                  Submit
                </Button>
              </View>
            }
            flatListProps={{
              data: commentsX.data,
              keyExtractor: (item) => item.id.toString(),
              renderItem: ({ item }) => (
                <View style={styles.comment}>
                  <Avatar.Image source={{ uri: item.avatar }} size={40} />
                  <Text style={styles.username}>{item.username}</Text>
                  <Text>{item.content}</Text>
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

const styles = StyleSheet.create({
  comment: {
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 100,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: '75%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
});
