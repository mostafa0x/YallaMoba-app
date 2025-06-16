import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useVideoPlayer } from 'expo-video';
import { useFocusEffect, usePathname } from 'expo-router';

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
  const pathname = usePathname();
  const [path, setPath] = useState<string | null>(null);
  const player = useVideoPlayer(path, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (pathname == '/' || pathname == '/watch') {
      stopVideo();
    }
    return () => {};
  }, [pathname]);

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
      //   console.log('open');

      return () => {
        stopVideo();
        //  console.log('blur');
      };
    }, [])
  );

  return (
    <VideoPlayerContext.Provider value={{ playVideo, stopVideo, currentUrl: path, player }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
