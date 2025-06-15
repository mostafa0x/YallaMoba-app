import React, { memo, useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import ImagesView from 'components/ViewReel/ImagesView';
import RootReel from 'components/Reels/layout';

const { height, width: screenWidth } = Dimensions.get('window');
const POST_HEIGHT = height;

interface Props {
  item: any;
  active: boolean;
  openModal: (postId: number) => void;
  PostId: number;
  POST_HEIGHT: number;
  player: any;
}

const ReelItem = ({ player, item, active, openModal, PostId, POST_HEIGHT }: Props) => {
  const fileUrl = item.files?.[0] ?? '';
  const fileType = fileUrl.match(/\.(mp4|mov|webm)$/) ? 'video' : 'image';
  const [videoSize, setVideoSize] = useState({ width: screenWidth, height: POST_HEIGHT });
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ height: POST_HEIGHT, width: '100%' }}>
      <RootReel post={item} openModal={openModal} />
      {fileType === 'video' ? (
        active ? (
          <>
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
            <VideoView
              player={player}
              style={{
                width: videoSize.width,
                height: videoSize.height,
                justifyContent: 'center',
              }}
              allowsFullscreen={false}
              nativeControls={false}
              contentFit="fill"
            />
          </>
        ) : null
      ) : (
        <ImagesView fileUrl={fileUrl} />
      )}
    </View>
  );
};

export default memo(ReelItem);
