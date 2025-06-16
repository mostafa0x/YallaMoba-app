import { View, Text } from 'react-native';
import React from 'react';
import AuthContextProvider from './Auth/authContext';
import ProfileContextProvider from './Profile/ProfileContext';
import { VideoPlayerProvider } from './VideoPlayerManager';

export default function ProvidersContexts({ children }: any) {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <VideoPlayerProvider>{children}</VideoPlayerProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}
