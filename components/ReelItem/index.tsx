import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { StateFace } from 'types/interfaces/store/StateFace';
import RootReel from 'components/Reels/layout';
import ImagesView from 'components/ViewReel/ImagesView';
import { useVideoManager } from 'components/VideoPlayerManager';
import { VideoView } from 'expo-video';
import { VideoViewReel } from './VideoViewReel';

const { height } = Dimensions.get('window');

const ReelItem = ({ item, openModal, POST_HEIGHT, index }: any) => {
  const { currIndex } = useSelector((state: StateFace) => state.ReelsReducer);
  const fileUrl = item.files?.[0] ?? '';
  const fileType = fileUrl.match(/\.(mp4|mov|webm)$/) ? 'video' : 'image';
  const isActive = index === currIndex;
  const [videoSize, setVideoSize] = useState({ width: POST_HEIGHT, height: POST_HEIGHT });
  const { playVideo, stopVideo, currentUrl, player, isLoading } = useVideoManager();
  const calculatedWidth = useMemo(() => {
    const aspectRatio = videoSize.width / videoSize.height;
    return POST_HEIGHT * aspectRatio;
  }, [videoSize, POST_HEIGHT]);

  useEffect(() => {
    let callPlayTimeOut: any = null;
    if (fileType === 'video') {
      stopVideo();

      if (isActive) {
        callPlayTimeOut = setTimeout(() => {
          playVideo(fileUrl);
        }, 250);
      }
    }
    return () => {
      if (callPlayTimeOut) clearTimeout(callPlayTimeOut);
    };
  }, [isActive, fileUrl]);

  return (
    <View style={{ height: POST_HEIGHT, width: '100%' }}>
      <RootReel post={item} openModal={openModal} />
      {fileType === 'video' && isActive && currentUrl === fileUrl && (
        <VideoViewReel
          player={player}
          calculatedWidth={calculatedWidth}
          POST_HEIGHT={POST_HEIGHT}
          isLoading={isLoading}
        />
        // <VideoView
        //   player={player}
        //   style={{ width: '100%', height: POST_HEIGHT }}
        //   allowsFullscreen={true}
        //   nativeControls={false}
        //   contentFit="contain"
        // />
      )}
      {fileType === 'image' && <ImagesView fileUrl={fileUrl} POST_HEIGHT={POST_HEIGHT} />}
    </View>
  );
};

export default memo(ReelItem);
