import { VideoViewReel } from './VideoViewReel';
import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import ImagesView from 'components/ViewReel/ImagesView';
import RootReel from 'components/Reels/layout';

const { height, width: screenWidth } = Dimensions.get('window');
const POST_HEIGHT = height;

interface Props {
  item: any;
  openModal: (postId: number) => void;
  PostId: number;
  POST_HEIGHT: number;
  player: any;
  file: any;
}

const ReelItem = ({ player, item, openModal, PostId, POST_HEIGHT, file }: Props) => {
  const fileUrl = item.files?.[0] ?? '';
  const fileType = fileUrl.match(/\.(mp4|mov|webm)$/) ? 'video' : 'image';
  const [videoSize, setVideoSize] = useState({ width: POST_HEIGHT, height: POST_HEIGHT });
  const [loading, setLoading] = useState(true);
  const active = file === (item.files?.[0] ?? '');

  const calculatedWidth = useMemo(() => {
    const aspectRatio = videoSize.width / videoSize.height;
    return POST_HEIGHT * aspectRatio;
  }, [videoSize, POST_HEIGHT]);

  useEffect(() => {
    if (player.status?.videoWidth && player.status?.videoHeight) {
      const aspectRatio = player.status.videoWidth / player.status.videoHeight;
      setVideoSize({
        width: POST_HEIGHT * aspectRatio,
        height: POST_HEIGHT,
      });
    }
  }, [player.status?.videoWidth, player.status?.videoHeight]);

  return (
    <View style={{ height: POST_HEIGHT, width: '100%' }}>
      <RootReel post={item} openModal={openModal} />
      {fileType === 'video' ? (
        active ? (
          <VideoViewReel
            loading={loading}
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
