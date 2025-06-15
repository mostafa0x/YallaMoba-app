import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { VideoView as ExpoVideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VideoPlayerView({ isVideoLoading, player }: any) {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const POST_HEIGHT = height - insets.bottom;
  const [videoSize, setVideoSize] = useState({ width: 1, height: 1 });

  const videoAspectRatio = videoSize.width / videoSize.height;
  const calculatedWidth = POST_HEIGHT * videoAspectRatio;

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
      {isVideoLoading ? (
        <View className=" h-full w-full items-center justify-center">
          <ActivityIndicator size={50} color={'white'} />
        </View>
      ) : (
        <ExpoVideoView
          player={player}
          style={{ width: calculatedWidth, height: POST_HEIGHT - 70 }}
          allowsFullscreen={false}
          nativeControls={false}
          contentFit="fill"
        />
      )}
    </View>
  );
}
