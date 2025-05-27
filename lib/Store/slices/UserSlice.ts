import { createSlice } from '@reduxjs/toolkit';
import fillFaces from 'types/interfaces/fillUserInfo';
import { UserFace } from 'types/interfaces/store/UserFace';

const initialState: UserFace = {
  userToken: null,
  userData: null,
  userLoading: true,
  userPosts: [],
  headers: { Authorization: '' },
};
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    fillUserInfo: (state, action: fillFaces) => {
      state.userToken = action.payload.userToken;
      state.userData = action.payload.userData;
      state.headers = {
        Authorization: `Bearer ${action.payload.userToken}`,
      };
    },
    ChangeUserData: (state, action) => {
      state.userData = action.payload;
    },
    changeUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const UserReducer = UserSlice.reducer;
export const { changeUserLoading, fillUserInfo, ChangeUserData } = UserSlice.actions;
