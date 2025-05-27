import { createSlice } from '@reduxjs/toolkit';
import { PostFace, ProfileFace } from 'types/interfaces/store/ProfileFace';
import { userDataFace } from 'types/interfaces/store/UserFace';

type ActionProps = {
  payload: { ownerData: userDataFace | null; ownerPosts: PostFace[] | null };
  type: string;
};

const initialState: ProfileFace = {
  ownerData: null,
  ownerPosts: null,
  ownerFollowers: null,
  ownerFollowing: null,
};
const ProfileSlices = createSlice({
  name: 'ProfileSlices',
  initialState,
  reducers: {
    fillProfile: (state, action: ActionProps) => {
      state.ownerData = action.payload.ownerData;
      state.ownerPosts = action.payload.ownerPosts;
    },
    ChangeOwnerFollowers: (state, action) => {
      state.ownerFollowers = action.payload;
    },
    ChangeOwnerFollowing: (state, action) => {
      state.ownerFollowing = action.payload;
    },
  },
});

export const ProfileReducer = ProfileSlices.reducer;
export const { fillProfile, ChangeOwnerFollowers, ChangeOwnerFollowing } = ProfileSlices.actions;
