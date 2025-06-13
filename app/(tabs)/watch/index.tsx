import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Icon, ActivityIndicator } from 'react-native-paper';
import ReelBox from 'components/Reels/layout';
import RootReel from 'components/Reels/layout';
import useReels from 'Hooks/useReels';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUserData } from 'lib/Store/slices/UserSlice';
import { FlatList } from 'react-native-gesture-handler';
import { StateFace } from 'types/interfaces/store/StateFace';
import { cheangeReelsData } from 'lib/Store/slices/ReelsSlice';

export default function Watch() {
  const { ReelsData } = useSelector((state: StateFace) => state.ReelsReducer);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, isLoading, isError, error, refetch } = useReels(page);
  useEffect(() => {
    if (page > 1) {
      refetch();
    }
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

  const renderItem = useCallback(
    ({ item }: any) => (
      <View
        style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
        <Avatar.Image size={50} source={{ uri: item.avatar }} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
          <Text>{item.body}</Text>
          <Text>
            Likes: {item.likeCount} Comments: {item.commentCount}
          </Text>
        </View>
      </View>
    ),
    []
  );

  function loadMore() {
    if (page >= totalPage) {
      setIsFetchingMore;
      console.log('No more pages to fetch');
      return;
    }
    setIsFetchingMore(true);

    setPage((curr) => curr + 1);
  }

  return (
    <View className="body flex-1 ">
      <View className="m-2 mb-0 ">
        <Text className="text-3xl">Reels</Text>
      </View>

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
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isFetchingMore ? (
                <View className="mt-5">
                  <ActivityIndicator size={50} animating={true} color={'white'} />
                </View>
              ) : null
            }
          />

          {/* <RootReel countLikes={0} countComment={0} /> */}
        </>
      )}
    </View>
  );
}
