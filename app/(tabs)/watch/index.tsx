import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Icon } from 'react-native-paper';
import ReelBox from 'components/Reels/layout';
import RootReel from 'components/Reels/layout';
import useReels from 'Hooks/useReels';
import { useDispatch } from 'react-redux';
import { ChangeUserData } from 'lib/Store/slices/UserSlice';

export default function Watch() {
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useReels(page);

  useEffect(() => {
    if (data) {
      console.log(data);

      dispatch(ChangeUserData(data));
      setPageLoading(false);
    }
    return () => {};
  }, [data]);

  if (isError) {
    console.log(error);
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl">Error: {error.message}</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Retry
        </Button>
      </View>
    );
  }

  if (pageLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl">Loading...</Text>
      </View>
    );
  }
  return (
    <View className="body flex-1 ">
      <View className="m-2 mb-0 ">
        <Text className="text-3xl">Reels</Text>
      </View>

      <RootReel countLikes={0} countComment={0} />
      <View className="">
        {/*
        <View className="mt-2 h-[1024px] w-full bg-black"></View>
        */}
      </View>
    </View>
  );
}
