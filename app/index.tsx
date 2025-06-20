import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { StateFace } from 'types/interfaces/store/StateFace';
import { changeCurrIndex, cheangeReelsData, ClearReelsData } from 'lib/Store/slices/ReelsSlice';
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
  const { data, isLoading, isError, error, refetch } = useHome(page);
  const list = useRef<FlashList<ReelPostFace> | null | undefined>(null);
  useFocusEffect(
    useCallback(() => {
      //   console.log('open');
      console.log(page);

      return () => {
        console.log('blur');
        setPostId(-1);
        setTotalPage(1);
        setPage(1);
        setIsFetchingMore(false);
        dispatch(ClearReelsData(null));
      };
    }, [])
  );

  useEffect(() => {
    if (list.current) {
      console.log(list.current);
    }
    return () => {};
  }, [list]);

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
      //   console.log(data);
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
    if (isFetchingMore || isLoading || pageLoading) return;
    // list.current && list.current.scrollToOffset({ offset: 5 });

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
      ) : pageLoading || isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <>
          <View>
            <Text className="p-3 text-3xl text-white">Home</Text>
          </View>

          <CommentsView
            commentsX={memoizedCommentsX}
            userData={userData}
            PostId={PostId}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          <FlashList
            ref={list}
            data={ReelsData}
            keyExtractor={(item, index) => `${item.id}-${index}`}
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
            ListFooterComponent={() => {
              return isFetchingMore ? (
                <View className="pb-8">
                  <ActivityIndicator size={50} />
                </View>
              ) : null;
            }}
            ListEmptyComponent={() => {
              return (
                <View className=" absolute left-[175px] top-[400px] items-center justify-center">
                  <Text className="text-2xl text-white opacity-70">Follow some Players !....</Text>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
}
