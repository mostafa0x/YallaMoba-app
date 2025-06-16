<<<<<<< HEAD
import React, { useEffect, useState, memo } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import ImagesView from 'components/ViewReel/ImagesView';
import VideoPlayerView from 'components/ViewReel/VideoView';
import RootReel from 'components/Reels/layout';
import { useVideoPlayer, VideoView } from 'expo-video';

const { height } = Dimensions.get('window');

function getFileType(url: string) {
  if (!url) return 'image';
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.mov') || lowerUrl.endsWith('.webm')) {
    return 'video';
  }
  return 'image';
}

const ReelItem = memo(({ item, POST_HEIGHT, file, setFile, videoSize, openModal }: any) => {
  const fileUrl = item.files?.[0] ?? null;
  const fileType = getFileType(fileUrl);

  const player = useVideoPlayer(fileUrl, (player) => {
    player.loop = true;
    player.play();
  });

  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    if (fileType === 'video' && fileUrl === file) {
      setIsVideoLoading(player.status !== 'readyToPlay');
    }
  }, [player.status, file]);

  const videoAspectRatio = videoSize.width / videoSize.height;
  const calculatedWidth = POST_HEIGHT * videoAspectRatio;

  return (
    <View>
      <RootReel post={item} openModal={openModal} />
      <View style={{ height: POST_HEIGHT, width: '100%' }}>
        {fileType === 'video' ? (
          fileUrl === file ? (
            <VideoPlayerView player={player} />
          ) : null
        ) : fileUrl ? (
          <ImagesView fileUrl={fileUrl} />
        ) : (
          <View className=" items-center justify-center">
            <Text className="mt-[200px] text-3xl text-red-500">Only post , Error</Text>
          </View>
        )}
      </View>
    </View>
  );
});

export default ReelItem;
=======
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
>>>>>>> 63be14c
