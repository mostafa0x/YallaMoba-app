import { View, Text, BackHandler } from 'react-native';
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
import { useRouter } from 'expo-router';

export default function Register() {
  const audioSource: HerosROlesFace = {
    MM: require('../../../assets/Audio/Heros/les.ogg'),
    Jungle: require('../../../assets/Audio/Heros/haya.ogg'),
    Exp: require('../../../assets/Audio/Heros/yzong.ogg'),
    Mid: require('../../../assets/Audio/Heros/nana.ogg'),
    Roam: require('../../../assets/Audio/Heros/tig.ogg'),
  };
  const router = useRouter();
  const [currStage, setCurrStage] = useState(1);
  const [currRole, setCurrRole] = useState<RoleFace>('Roam');
  const player = useAudioPlayer(audioSource[currRole]);

  function handleSetCurrStage(current: number) {
    // setCurrStage(current + 1);
  }

  function handleAudioHero() {
    player.play();
  }

  const handleBackHandler = () => {
    if (currStage !== 2 || 3) {
    }
    if (currStage === 1) {
      router.back();
      return true;
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    return () => {
      backHandler.remove();
    };
  }, []);

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
    return <Stage1 formik={formik} handleSetCurrStage={handleSetCurrStage} />;
  }

  if (currStage == 2) {
    return (
      <Stage2
        handleSetCurrStage={handleSetCurrStage}
        currRole={currRole}
        setCurrRole={setCurrRole}
      />
    );
  }
  if (currStage == 3) {
    return <Stage3 handleSetCurrStage={handleSetCurrStage} formik={formik} />;
  }
}
