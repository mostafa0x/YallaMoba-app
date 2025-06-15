import { VideoViewReel } from './VideoViewReel';
import React, { memo, useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import ImagesView from 'components/ViewReel/ImagesView';
import RootReel from 'components/Reels/layout';

const { height, width: screenWidth } = Dimensions.get('window');
const POST_HEIGHT = height;

interface Props {
  item: any;
  active: boolean;
  openModal: (postId: number) => void;
  PostId: number;
  POST_HEIGHT: number;
  player: any;
}

const ReelItem = ({ player, item, active, openModal, PostId, POST_HEIGHT }: Props) => {
  const fileUrl = item.files?.[0] ?? '';
  const fileType = fileUrl.match(/\.(mp4|mov|webm)$/) ? 'video' : 'image';
  const [videoSize, setVideoSize] = useState({ width: POST_HEIGHT, height: POST_HEIGHT });
  const [loading, setLoading] = useState(true);
  const videoAspectRatio = videoSize.width / videoSize.height;
  const calculatedWidth = POST_HEIGHT * videoAspectRatio;
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
