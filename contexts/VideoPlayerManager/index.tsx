import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useVideoPlayer, SourceChangeEventPayload } from 'expo-video';
import { useFocusEffect, usePathname } from 'expo-router';
import { useEvent } from 'expo';

interface VideoPlayerContextType {
  playVideo: (url: string) => void;
  stopVideo: () => void;
  PlayOrPauseVideo: () => void;
  currentUrl: string | null;
  player: any;
}

const VideoPlayerContext = createContext<VideoPlayerContextType>({
  playVideo: () => {},
  stopVideo: () => {},
  PlayOrPauseVideo: () => {},
  player: null,
  currentUrl: null,
});

export const useVideoManager = () => useContext(VideoPlayerContext);

export const VideoPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [path, setPath] = useState<string | null>(null);
  const player = useVideoPlayer(path ? { uri: path, useCaching: true } : null, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  // useEffect(() => {
  //   if (path) {
  //     if (pathname !== '/' && pathname !== '/watch') {
  //       stopVideo();
  //       console.log('exit');
  //     }
  //   }
  //   return () => {};
  // }, [pathname, path]);

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

  const PlayOrPauseVideo = useCallback(() => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  useFocusEffect(
    useCallback(() => {
      //   console.log('open');
      return () => {
        stopVideo();
        console.log('blur');
      };
    }, [])
  );

  return (
    <VideoPlayerContext.Provider
      value={{ playVideo, stopVideo, currentUrl: path, player, PlayOrPauseVideo }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
