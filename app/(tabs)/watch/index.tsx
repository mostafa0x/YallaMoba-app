import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { StateFace } from 'types/interfaces/store/StateFace';
import { cheangeReelsData } from 'lib/Store/slices/ReelsSlice';
import { useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useGetComments from 'Hooks/useGetComments';
import ReelItem from 'components/ReelItem';
import CommentsView from 'components/CommentsView';

export default function Watch() {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const POST_HEIGHT = height - insets.bottom;
  const { ReelsData } = useSelector((state: StateFace) => state.ReelsReducer);
  const { userData } = useSelector((state: StateFace) => state.UserReducer, shallowEqual);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [file, setFile] = useState('');
  const [PostId, setPostId] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const commentsX = useGetComments(PostId, dispatch);
  const memoizedCommentsX = useMemo(() => commentsX, [commentsX.data, commentsX.isLoading]);

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };
  const player = useVideoPlayer(file, (player) => {
    player.loop = true;
    player.play();
  });
  const { data, isError, error, refetch } = useReels(page, 'feed');

  const openModal = useCallback((postId: number) => {
    setPostId(postId);
    setIsMenuOpen(true);
  }, []);

  useEffect(() => {
    if (PostId === -1) return;
    commentsX.refetch();
    return () => {};
  }, [PostId]);

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
      } else {
        setFile('');
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
