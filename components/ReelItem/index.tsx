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
