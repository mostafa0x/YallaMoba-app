import { useEvent } from 'expo';
import { VideoView } from 'expo-video';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Button, Icon } from 'react-native-paper';

interface props {
  player: any;
  calculatedWidth: number;
  POST_HEIGHT: number;
  PlayOrPauseVideo: () => void;
}

const VideoViewReel = memo(function VideoViewReel({
  player,
  calculatedWidth,
  POST_HEIGHT,
  PlayOrPauseVideo,
}: props) {
  const [isReady, setIsReady] = useState(false);
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { status } = useEvent(player, 'statusChange', { status: player.status });
  useEffect(() => {
    console.log(status);

    return () => {};
  }, [status]);

  return (
    <>
      {status !== 'readyToPlay' && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 210,
            marginTop: POST_HEIGHT / 3,
            alignItems: 'center',
            alignContent: 'center',
            zIndex: 1,
          }}>
          <ActivityIndicator size={100} color="white" />
        </View>
      )}
      {!isPlaying && status === 'readyToPlay' && (
        <View style={{ position: 'absolute', top: 360, left: 175, zIndex: 2 }}>
          <TouchableOpacity onPress={PlayOrPauseVideo}>
            <View>
              <View style={{ top: -18, left: -18, position: 'absolute' }}>
                <Icon color="black" size={220} source={'play'} />
              </View>
              <Icon color="white" size={180} source={'play'} />
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity activeOpacity={0.7} onPress={PlayOrPauseVideo}>
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
          </TouchableOpacity>
        )}
      </View>
    </>
  );
});

export { VideoViewReel };
