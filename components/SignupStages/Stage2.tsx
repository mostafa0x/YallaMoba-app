import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import HeroRole from 'components/HeroRole';
import DesHeroRole from 'components/DesHeroRole';
import { Button } from 'react-native-paper';
import { RoleFace } from 'types/interfaces/store/UserFace';

interface props {
  currRole: RoleFace;
  setCurrRole: any;
  setCurrStage: any;
}

export default function Stage2({ currRole, setCurrRole, setCurrStage }: props) {
  return (
    <View className="flex-1 justify-center bg-[#2d2564]">
      <View className=" absolute left-[130px] top-[50px]">
        <Text className="text-3xl font-extrabold text-yellow-400">
          {'become the shield '.toLocaleUpperCase()}
        </Text>
        <Text className="ml-8 text-3xl font-extrabold text-yellow-400">
          {'of your team '.toLocaleUpperCase()}
        </Text>
        <Text className="text-m ml-12 mt-6 text-yellow-400 opacity-70">
          {`master the ${currRole} role `.toLocaleUpperCase()}
        </Text>
      </View>
      <View className="absolute left-[5px] top-[160px] flex-row gap-2">
        <HeroRole Role="Roam" currRole={currRole} setCurrRole={setCurrRole} />
        <HeroRole Role="Mid" currRole={currRole} setCurrRole={setCurrRole} />
        <HeroRole Role="Jungle" currRole={currRole} setCurrRole={setCurrRole} />
        <HeroRole Role="MM" currRole={currRole} setCurrRole={setCurrRole} />
        <HeroRole Role="Exp" currRole={currRole} setCurrRole={setCurrRole} />
      </View>
      <View className="items-center">
        <View className="mt-[300px]">
          <DesHeroRole Role={currRole} currRole={currRole} />
        </View>
      </View>
      <View className="mt-32 items-center align-middle">
        <View className="">
          <TouchableOpacity onPress={() => setCurrStage((current: number) => current + 1)}>
            <Button
              labelStyle={{ fontSize: 20 }}
              style={{ borderRadius: 100 }}
              contentStyle={{ height: 60, width: 250 }}
              uppercase={true}
              buttonColor="#1a8d03"
              textColor="white">
              continue with {currRole !== 'Jungle' ? currRole : 'Jg'}
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
