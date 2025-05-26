import React from 'react';

export interface ProfileContextFace {
  isMyProfile: boolean;

  setIsMyProfile: React.Dispatch<React.SetStateAction<boolean>>;
}
