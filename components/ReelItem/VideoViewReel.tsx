import { VideoView } from 'expo-video';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface props {
  player: any;
  calculatedWidth: number;
  POST_HEIGHT: number;
  isLoading: boolean;
}

export function VideoViewReel({ player, calculatedWidth, POST_HEIGHT, isLoading }: props) {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}
        onLayout={() => setIsReady(true)}>
        {isReady && (
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
        )}
      </View>
    </>
  );
}
