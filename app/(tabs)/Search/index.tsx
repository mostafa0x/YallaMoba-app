import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Icon, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import callToast from 'components/toast';
import { ClearHistroySerach, GetHistroySerach, SetHistroySerach } from 'services/storage';

export default function Search() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const router = useRouter();
  const [searchTxt, setSearchTxt] = useState<string>('');
  const searchBarRef = useRef<React.ComponentRef<typeof Searchbar>>(null);

  const handleClearHistroy = async () => {
    await ClearHistroySerach();
    setSearchHistory([]);
    callToast({ type: 'success', text1: 'Yalla Moba', text2: 'Cleared history' });
  };

  const handleDelete = async (itemIndex: number) => {
    const newHistory = searchHistory.filter((item, index) => index !== itemIndex);
    setSearchHistory(newHistory);
    await SetHistroySerach(newHistory);
  };
  const handleSerach = async (srearchItem: string) => {
    const foundItem = searchHistory.includes(srearchItem);
    if (!foundItem) {
      const NewArray = [srearchItem, ...searchHistory];
      setSearchHistory(NewArray);
      await SetHistroySerach(NewArray);
    }
    const upToTop = searchHistory.filter((item) => item != srearchItem);
    upToTop.unshift(srearchItem);
    setSearchHistory(upToTop);
    setSearchTxt('');
    searchBarRef.current?.clear();
    router.push({ pathname: '/ResultsSerach', params: { contant: srearchItem } });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const resHS: string[] | null = await GetHistroySerach();
      resHS ? setSearchHistory(resHS) : await SetHistroySerach([]);
    };
    fetchHistory();
    return () => {};
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="mb-5 flex-row items-center justify-between border-b-2 border-gray-200 p-2">
        <View className="flex-row  items-center ">
          <TouchableOpacity onPress={() => router.back()}>
            <View className="">
              <Icon size={40} source={'close'} />
            </View>
          </TouchableOpacity>
          <Text className="text-2xl">Search</Text>
        </View>
      </View>
      <View className="m-2">
        <View className="flex-row items-center">
          <Searchbar
            autoFocus
            ref={searchBarRef}
            onIconPress={() => handleSerach(searchTxt)}
            onSubmitEditing={() => handleSerach(searchTxt)}
            style={{ width: 450 }}
            value={searchTxt}
            onChangeText={setSearchTxt}
            placeholder="Sercah by username"
          />
          <View className="justify-center rounded-[15px] border-[1px] border-white bg-white p-2 pl-2">
            <TouchableOpacity onPress={() => router.push('/ScanQr')}>
              <Icon size={35} source={'scan-helper'} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="ml-2  mt-16 flex-row justify-between ">
          <View>
            <Text className="">History Search...</Text>
          </View>
          <View className="">
            <TouchableOpacity onPress={handleClearHistroy}>
              <Icon size={35} source="trash-can" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ height: 763 }}>
          <View className="mt-10 gap-10 pl-2 ">
            {searchHistory.map((item, index: number) => {
              return (
                <View className="flex-row justify-between pr-2" key={index}>
                  <TouchableOpacity className="w-[400px]" onPress={() => handleSerach(item)}>
                    <Text className="text-xl">{item}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Icon size={25} source={'close'} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
