import React from 'react';

export interface ProfileContextFace {
  isMyProfile: boolean;
  pageLoading: boolean;

  setIsMyProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
