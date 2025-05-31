import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ResultsSercahFace } from 'types/interfaces/ResultsSerachFace';
import { Avatar, Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface props {
  item: ResultsSercahFace;
}

export default function ResultsSerachItem({ item }: props) {
  const router = useRouter();
  function handleGotoProfile() {
    router.push(`/profile/${item.uid}`);
  }
  return (
    <View>
      <TouchableOpacity onPress={handleGotoProfile} className="mb-6 flex-row items-center gap-5">
        <Avatar.Image size={70} source={{ uri: item.avatar }} />
        <Text className="text-xl">{item.username}</Text>
      </TouchableOpacity>
    </View>
  );
}
