import { View, Text, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import useReels from 'Hooks/useReels';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { StateFace } from 'types/interfaces/store/StateFace';
import { cheangeReelsData } from 'lib/Store/slices/ReelsSlice';
import { useVideoPlayer, VideoView } from 'expo-video';
import RootReel from 'components/Reels/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

export default function Watch() {
  const { height } = Dimensions.get('window');
  const BOTTOM_NAV_HEIGHT = 60; // أو الارتفاع الحقيقي عندك
  const insets = useSafeAreaInsets();
  const POST_HEIGHT = height - insets.bottom;

  const { ReelsData } = useSelector((state: StateFace) => state.ReelsReducer);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [file, setFile] = useState('');
  const player = useVideoPlayer(file, (player) => {
    player.loop = true;
  });
  const { data, isError, error, refetch } = useReels(page);

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

  const renderItem = useCallback(({ item }: any) => {
    const fileUrl = item.files?.[0] ?? null;
    const fileType = getFileType(fileUrl);

    return (
      <View style={{ height: POST_HEIGHT, width: '100%' }}>
        <RootReel post={item} />
        {fileType === 'video' ? (
          <VideoView player={player} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        ) : (
          <Image
            source={{ uri: fileUrl }}
            style={{ marginTop: 36, width: '100%', height: '87%' }}
            contentFit="fill"
          />
        )}
      </View>
    );
  }, []);

  function loadMore() {
    if (isFetchingMore || pageLoading) return;
    if (page >= totalPage) {
      setIsFetchingMore(false);
      console.log('No more pages to fetch');
      return;
    }
    setIsFetchingMore(true);
    setPage((curr) => curr + 1);
  }

  return (
    <View className="flex-1 bg-black">
      {isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl">Error: {error?.message}</Text>
          <Button mode="contained" onPress={() => refetch()}>
            Retry
          </Button>
        </View>
      ) : pageLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl">Loading...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={ReelsData}
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
          />
        </>
      )}
    </View>
  );
}
