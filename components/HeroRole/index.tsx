import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { RoleFace } from 'types/interfaces/store/UserFace';
import { HerosROlesFace } from 'types/interfaces/store/AvatarFace';

export default function HeroRole({
  Role,
  currRole,
  setCurrRole,
}: {
  Role: RoleFace;
  currRole: string;
  setCurrRole: any;
}) {
  const HeroRoles: HerosROlesFace = {
    MM: require('../../assets/HeroRoles/les.png'),
    Exp: require('../../assets/HeroRoles/yzong.png'),
    Jungle: require('../../assets/HeroRoles/lance.png'),
    Mid: require('../../assets/HeroRoles/nana.png'),
    Roam: require('../../assets/HeroRoles/tig.png'),
  };

  const CurrentRole = HeroRoles[Role];

  return (
    <View
      style={{ borderColor: currRole == Role ? '#9d94d4' : '#483D8B' }}
      className="rounded-2xl border-2">
      <View className={`${currRole == Role ? 'opacity-100' : 'opacity-20'}`}>
        <TouchableOpacity onPress={() => setCurrRole(Role)}>
          <Image contentFit="cover" style={Style.image} source={CurrentRole} />;
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  image: {
    width: 90,
    height: 220,
    borderRadius: 13,
  },
});
