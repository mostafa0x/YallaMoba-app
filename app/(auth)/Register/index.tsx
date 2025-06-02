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
import { SignUpvalidationSchema } from 'lib/Validations/SignuoSchema';
import axiosClient from 'lib/api/axiosClient';
import callToast from 'components/toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeUserLoading, fillUserInfo } from 'lib/Store/slices/UserSlice';
import { storeUserInfo } from 'services/storage';

export default function Register() {
  const audioSource: HerosROlesFace = {
    MM: require('../../../assets/Audio/Heros/les.ogg'),
    Jungle: require('../../../assets/Audio/Heros/haya.ogg'),
    Exp: require('../../../assets/Audio/Heros/yzong.ogg'),
    Mid: require('../../../assets/Audio/Heros/nana.ogg'),
    Roam: require('../../../assets/Audio/Heros/tig.ogg'),
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [currStage, setCurrStage] = useState(1);
  const [currRole, setCurrRole] = useState<RoleFace>('Roam');
  const player = useAudioPlayer(audioSource[currRole]);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: 'sasa@gmail.com',
      gender: 'Male',
      role: 'Roam',
      password: 'sasasasa',
      repassword: 'sasasasa',
      avatar: 'xxx',
    },
    validationSchema: SignUpvalidationSchema,
    onSubmit: handleRegister,
  });

  function handleSetCurrStage(current: number) {
    formik.handleSubmit();
    if (currStage == 1) {
      return formik.values.email !== '' && ReCheck(current);
    }
    if (currStage == 2) {
    }
    setCurrStage(current + 1);
  }

  function ReCheck(current: number) {
    let Erros: any = null;
    if (currStage == 1) {
      Erros = {
        email: !!formik.errors.email,
        password: !!formik.errors.password,
        repassword: !!formik.errors.repassword,
      };
      if (!Erros.email && !Erros.password && !Erros.repassword) {
        setCurrStage(current + 1);
      }
    }
  }

  function handleAudioHero() {
    player.play();
  }

  const handleBackHandler = () => {
    if (isSubmiting) return true;
    if (currStage === 1) {
      router.back();
    } else {
      handleSetCurrStage(currStage - 2);
    }

    return true;
  };

  useEffect(() => {
    formik.setFieldValue('role', currRole);

    return () => {};
  }, [currRole]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    return () => {
      backHandler.remove();
    };
  }, [currStage, isSubmiting]);

  useEffect(() => {
    currStage == 2 && handleAudioHero();

    return () => {};
  }, [currRole, currStage]);

  async function handleRegister(formValuse: any) {
    setIsSubmiting(true);
    console.log(formValuse);

    try {
      const res = await axios.post(
        `https://yalla-moba-v2.vercel.app/api/users/register/`,
        formValuse
      );
      const data = res.data;
      callToast({
        type: 'success',
        text1: 'Register',
        text2: res.data.message ?? 'An account has been registered successfully',
      });
      dispatch(changeUserLoading(true));
      dispatch(fillUserInfo({ userToken: data.token, userData: data.user }));
      await storeUserInfo(data.token, data.user);
      router.push('/');
    } catch (err: any) {
      console.log(err);
      callToast({
        type: 'error',
        text1: 'Register',
        text2: err?.response?.data?.error ?? 'Error register !',
      });
      setIsSubmiting(false);
    }
  }

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
    return (
      <Stage3 isSubmiting={isSubmiting} handleSetCurrStage={handleSetCurrStage} formik={formik} />
    );
  }
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
