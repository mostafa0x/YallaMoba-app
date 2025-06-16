import { useEvent } from 'expo';
import { VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface props {
  player: any;
  calculatedWidth: number;
  POST_HEIGHT: number;
}

export function VideoViewReel({ player, calculatedWidth, POST_HEIGHT }: props) {
  const [isReady, setIsReady] = useState(false);
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <>
      {!isPlaying && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            marginTop: POST_HEIGHT / 3,
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator size={100} color="white" />
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
