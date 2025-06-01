import { View, Text } from 'react-native';
import React from 'react';
import { RoleFace } from 'types/interfaces/store/UserFace';
import { HerosROlesFace } from 'types/interfaces/store/AvatarFace';

export default function DesHeroRole({ Role }: { Role: RoleFace }) {
  const HeroRoles: HerosROlesFace = {
    MM: require('../../assets/HeroRoles/les.png'),
    Exp: require('../../assets/HeroRoles/yzong.png'),
    Jungle: require('../../assets/HeroRoles/lance.png'),
    Mid: require('../../assets/HeroRoles/nana.png'),
    Roam: require('../../assets/HeroRoles/tig.png'),
  };
  return (
    <View>
      <Text>DesHeroRole</Text>
    </View>
  );
}
