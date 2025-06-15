import { VideoView } from 'expo-video';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
export function VideoViewReel({ loading, player, calculatedWidth, POST_HEIGHT }: any) {
  return (
    <>
      {/* {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )} */}
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <VideoView
          player={player}
          style={{
            width: calculatedWidth,
            height: POST_HEIGHT - 75,
          }}
          allowsFullscreen={true}
          nativeControls={false}
          contentFit="fill"
        />
      </View>
    </>
  );
}
