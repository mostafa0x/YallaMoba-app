import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useVideoPlayer } from 'expo-video';
import { Dimensions, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useEvent } from 'expo';

const { height, width } = Dimensions.get('window');
const POST_HEIGHT = height;

interface VideoPlayerContextType {
  playVideo: (url: string) => void;
  stopVideo: () => void;
  currentUrl: string | null;
  player: any;
}

const VideoPlayerContext = createContext<VideoPlayerContextType>({
  playVideo: () => {},
  stopVideo: () => {},
  player: null,
  currentUrl: null,
});

export const useVideoManager = () => useContext(VideoPlayerContext);

export const VideoPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState<string | null>(null);
  const player = useVideoPlayer(path, (player) => {
    player.loop = true;
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEffect(() => {
    if (path) {
      player.play();
    }
  }, [path]);

  const playVideo = useCallback((url: string) => {
    setPath(url);
  }, []);

  const stopVideo = useCallback(() => {
    setPath(null);
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('open');

      return () => {
        stopVideo();
        console.log('blur');
      };
    }, [])
  );

  return (
    <VideoPlayerContext.Provider value={{ playVideo, stopVideo, currentUrl: path, player }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
