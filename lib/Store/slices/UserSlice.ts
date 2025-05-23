import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
});

export const UserReducer = UserSlice.reducer;
