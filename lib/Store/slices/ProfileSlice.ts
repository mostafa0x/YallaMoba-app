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
};
const ProfileSlices = createSlice({
  name: 'ProfileSlices',
  initialState,
  reducers: {
    fillProfile: (state, action: ActionProps) => {
      console.log(action.payload);

      state.ownerData = action.payload.ownerData;
      state.ownerPosts = action.payload.ownerPosts;
    },
  },
});

export const ProfileReducer = ProfileSlices.reducer;
export const { fillProfile } = ProfileSlices.actions;
