import { VideoViewReel } from './VideoViewReel';
import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import ImagesView from 'components/ViewReel/ImagesView';
import RootReel from 'components/Reels/layout';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';

const { height, width: screenWidth } = Dimensions.get('window');
const POST_HEIGHT = height;

interface Props {
  item: any;
  openModal: (postId: number) => void;
  PostId: number;
  POST_HEIGHT: number;
  file: any;
  index: number;
}

const ReelItem = ({ item, openModal, POST_HEIGHT, index }: any) => {
  const { currIndex } = useSelector((state: StateFace) => state.ReelsReducer);
  const fileUrl = item.files?.[0] ?? '';
  const fileType = fileUrl.match(/\.(mp4|mov|webm)$/) ? 'video' : 'image';
  const isActive = index === currIndex;
  const player: any = useVideoPlayer(fileUrl, (player) => {
    player.loop = true;
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  });

  useEffect(() => {
    isActive && console.log(currIndex);
  }, [currIndex]);

  useEffect(() => {
    if (!isActive) {
      console.log('na');

      player.pause();
    }
  }, [isActive]);

  const [videoSize, setVideoSize] = useState({ width: POST_HEIGHT, height: POST_HEIGHT });

  useEffect(() => {
    if (player.status?.videoWidth && player.status?.videoHeight) {
      const aspectRatio = player.status.videoWidth / player.status.videoHeight;
      setVideoSize({
        width: POST_HEIGHT * aspectRatio,
        height: POST_HEIGHT,
      });
    }
  }, [player.status?.videoWidth, player.status?.videoHeight]);

  const calculatedWidth = useMemo(() => {
    const aspectRatio = videoSize.width / videoSize.height;
    return POST_HEIGHT * aspectRatio;
  }, [videoSize, POST_HEIGHT]);

  return (
    <View style={{ height: POST_HEIGHT, width: '100%' }}>
      <RootReel post={item} openModal={openModal} />
      {fileType === 'video' ? (
        isActive ? (
          <VideoViewReel
            player={player}
            calculatedWidth={calculatedWidth}
            POST_HEIGHT={POST_HEIGHT}
          />
        ) : null
      ) : (
        <ImagesView fileUrl={fileUrl} POST_HEIGHT={POST_HEIGHT} />
      )}
    </View>
  );
};

export default memo(ReelItem);
