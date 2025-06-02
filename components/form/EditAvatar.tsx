import AvatarUser from 'components/AvatarUser/AvatarUser';
import { ChangeCurrentAvatar } from 'lib/Store/slices/AvatarSlice';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';

interface props {
  currStage?: number;
}
export default function EditAvatar({ currStage }: props) {
  const { avatars, currentAvatarIndex } = useSelector((state: StateFace) => state.AvatarReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <View className="flex-row items-center justify-around gap-5">
      <TouchableOpacity onPress={() => dispatch(ChangeCurrentAvatar({ type: '-1' }))}>
        <Icon color={currStage ? 'white' : 'black'} size={40} source="less-than" />
      </TouchableOpacity>
      <AvatarUser url={avatars[currentAvatarIndex]} size={150} />
      <TouchableOpacity onPress={() => dispatch(ChangeCurrentAvatar({ type: '+1' }))}>
        <Icon color={currStage ? 'white' : 'black'} size={40} source="greater-than" />
      </TouchableOpacity>
    </View>
  );
}
