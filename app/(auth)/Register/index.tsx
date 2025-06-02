import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import TextField from 'components/form/TextField';
import { useFormik } from 'formik';
import { Image } from 'expo-image';
import HeroRole from 'components/HeroRole';
import DesHeroRole from 'components/DesHeroRole';
import { RoleFace } from 'types/interfaces/store/UserFace';
import { useAudioPlayer } from 'expo-audio';
import { HerosROlesFace } from 'types/interfaces/store/AvatarFace';
import Stage1 from 'components/SignupStages/Stage1';
import Stage2 from 'components/SignupStages/Stage2';
import Stage3 from 'components/SignupStages/Stage3';

export default function Register() {
  const audioSource: HerosROlesFace = {
    MM: require('../../../assets/Audio/Heros/les.ogg'),
    Jungle: require('../../../assets/Audio/Heros/haya.ogg'),
    Exp: require('../../../assets/Audio/Heros/yzong.ogg'),
    Mid: require('../../../assets/Audio/Heros/nana.ogg'),
    Roam: require('../../../assets/Audio/Heros/tig.ogg'),
  };

  const [currStage, setCurrStage] = useState(1);
  const [currRole, setCurrRole] = useState<RoleFace>('Roam');
  const player = useAudioPlayer(audioSource[currRole]);

  function handleAudioHero() {
    player.play();
  }

  useEffect(() => {
    currStage == 2 && handleAudioHero();

    return () => {};
  }, [currRole, currStage]);

  async function handleRegister() {}
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      gender: '',
      role: '',
      password: '',
      repassword: '',
      avatar: '',
    },
    onSubmit: handleRegister,
  });

  if (currStage == 1) {
    return <Stage1 formik={formik} setCurrStage={setCurrStage} />;
  }

  if (currStage == 2) {
    return <Stage2 setCurrStage={setCurrStage} currRole={currRole} setCurrRole={setCurrRole} />;
  }
  if (currStage == 3) {
    return <Stage3 setCurrStage={setCurrStage} formik={formik} />;
  }
}
