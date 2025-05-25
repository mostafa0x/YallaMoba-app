import { createSlice } from '@reduxjs/toolkit';
import { ProfileFace } from 'types/interfaces/store/ProfileFace';

type ActionProps = {
  payload: { ownerData: any; ownerPosts: any };
  type: string;
};

const initialState: ProfileFace = {
  ownerData: null,
  ownerPosts: null,
};
const ProfileSlices = createSlice({
  name: 'ProfileSlices',
  initialState,
  reducers: {
    fillProfile: (state, action: ActionProps) => {
      state.ownerData = action.payload.ownerData;
      state.ownerPosts = action.payload.ownerPosts;
    },
  },
});

export const ProfileReducer = ProfileSlices.reducer;
export const { fillProfile } = ProfileSlices.actions;
