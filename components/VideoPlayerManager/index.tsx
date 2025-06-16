import React, { createContext, useContext, useEffect, useState } from 'react';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Dimensions, View } from 'react-native';

const { height, width } = Dimensions.get('window');
const POST_HEIGHT = height;

interface VideoPlayerContextType {
  playVideo: (url: string) => void;
  stopVideo: () => void;
  currentUrl: string | null;
  player: any;
  isLoading: boolean;
}

const VideoPlayerContext = createContext<VideoPlayerContextType>({
  playVideo: () => {},
  stopVideo: () => {},
  player: null,
  currentUrl: null,
  isLoading: true,
});

export const useVideoManager = () => useContext(VideoPlayerContext);

export const VideoPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const player = useVideoPlayer(path, (player) => {
    player.loop = true;
  });
  const status = player.status;

  useEffect(() => {
    setIsLoading(status === 'loading');
  }, [status]);

  useEffect(() => {
    if (path) {
      player.play();
    }
    // } else {
    //   player.pause();
    // }
  }, [path]);

  const playVideo = (url: string) => {
    setPath(url);
  };

  const stopVideo = () => {
    // if (path === null) return;
    player.pause();
    // setPath(null);
  };

  return (
    <VideoPlayerContext.Provider
      value={{ playVideo, stopVideo, currentUrl: path, player, isLoading }}>
      {children}

      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: POST_HEIGHT,
          zIndex: -1,
        }}
        pointerEvents="none">
        <VideoView
          player={player}
          style={{ width: width, height: POST_HEIGHT }}
          allowsFullscreen={true}
          nativeControls={false}
          contentFit="contain"
        />
      </View> */}
    </VideoPlayerContext.Provider>
  );
};
