import { createSlice } from '@reduxjs/toolkit';
import UserFace from 'types/interfaces/store/UserFace';
const initialState: UserFace = {
  userToken: null,
  userData: null,
  userLoading: true,
};
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    changeUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const UserReducer = UserSlice.reducer;
export const { changeUserLoading } = UserSlice.actions;
