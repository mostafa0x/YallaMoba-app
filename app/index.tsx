import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';
import { useEffect } from 'react';

export default function HomePage() {
  const { userToken } = useSelector((state: StateFace) => state.UserReducer);

  return (
    <View style={{ backgroundColor: 'white' }} className="flex-1 items-center justify-center">
      <Text className="text-red-600">On Working zxxz</Text>

      {/* <Link href="/about">Go to Aboutxx Page</Link> */}
    </View>
  );
}
