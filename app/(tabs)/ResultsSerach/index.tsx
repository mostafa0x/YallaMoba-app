import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import SpinnerLoading from 'components/spinnerLoading';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axiosClient from 'lib/api/axiosClient';
import callToast from 'components/toast';
import { ResultsSercahFace } from 'types/interfaces/ResultsSerachFace';
import { Icon } from 'react-native-paper';
import ResultsSerachItem from 'components/ResultsSerachItem';

export default function ResultsSerach() {
  const { contant } = useLocalSearchParams();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [data, setData] = useState<ResultsSercahFace[] | null>([]);

  const router = useRouter();

  async function GetSerach() {
    const JSON = {
      name: contant,
    };
    try {
      const res = await axiosClient.post(`/profiles/search/`, JSON);
      console.log(res.data);
      setIsPageLoading(false);
      setData(res.data);
    } catch (err: any) {
      console.log(err);
      callToast({ type: 'error', text1: 'Yalla Moba', text2: err.message ?? 'Error Serach !' });
    }
  }

  useEffect(() => {
    if (contant) {
      GetSerach();
    }

    return () => {};
  }, []);

  if (!contant) {
    router.back();
  }
  if (isPageLoading) {
    return <SpinnerLoading />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="mb-5 flex-row items-center justify-between border-b-2 border-gray-200 p-2">
        <View className="flex-row  items-center ">
          <TouchableOpacity onPress={() => router.back()}>
            <View className="">
              <Icon size={40} source={'close'} />
            </View>
          </TouchableOpacity>
          <Text className="text-2xl">Results Serach..</Text>
        </View>
      </View>
      <View className="m-5">
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ResultsSerachItem item={item} />}
        />
      </View>
    </View>
  );
}
