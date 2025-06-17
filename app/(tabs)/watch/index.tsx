import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { StateFace } from 'types/interfaces/store/StateFace';
import { changeCurrIndex, cheangeReelsData } from 'lib/Store/slices/ReelsSlice';
import { useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useGetComments from 'Hooks/useGetComments';
import ReelItem from 'components/ReelItem';
import CommentsView from 'components/CommentsView';
import useHome from 'Hooks/useHome';
import { ReelPostFace } from 'types/interfaces/store/ReelsFace';
import { useFocusEffect } from 'expo-router';

export default function Home() {
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
  const [PostId, setPostId] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const commentsX = useGetComments(PostId, dispatch);
  const memoizedCommentsX = useMemo(() => commentsX, [commentsX.data, commentsX.isLoading]);
  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };
  const { data, isError, error, refetch } = useReels(page);

  useFocusEffect(
    useCallback(() => {
      //   console.log('open');
      return () => {
        dispatch(cheangeReelsData([]));
        console.log('blur');
      };
    }, [])
  );

  const openModal = useCallback((postId: number) => {
    setPostId(postId);
    setIsMenuOpen(true);
  }, []);

  useEffect(() => {
    if (PostId === -1) return;
    commentsX.refetch();
  }, [PostId]);

  useEffect(() => {
    if (page > 1) refetch();
  }, [page]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPage(data.currentPage);
      setTotalPage(data.totalPages);
      dispatch(cheangeReelsData(data.posts));
      setPageLoading(false);
      setIsFetchingMore(false);
    }
  }, [data]);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const firstVisibleIndex = viewableItems[0].index;
      dispatch(changeCurrIndex(firstVisibleIndex));
    }
  }, []);

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <ReelItem item={item} index={index} openModal={openModal} POST_HEIGHT={POST_HEIGHT} />
    ),
    [POST_HEIGHT]
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
        <View className="flex-1 items-center justify-center">
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

          <FlashList
            data={ReelsData}
            keyExtractor={(item: ReelPostFace, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            estimatedItemSize={POST_HEIGHT}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            snapToInterval={POST_HEIGHT}
            snapToAlignment="start"
            decelerationRate="fast"
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            ListEmptyComponent={() => {
              return (
                <View className=" absolute left-[175px] top-[400px] items-center justify-center">
                  <Text className="text-2xl text-white opacity-70">No Videos yet ! ..</Text>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
}
