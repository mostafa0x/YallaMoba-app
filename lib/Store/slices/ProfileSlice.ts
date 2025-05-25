import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const ProfileSlices = createSlice({
  name: 'ProfileSlices',
  initialState,
  reducers: {},
});

export const ProfileReducer = ProfileSlices.reducer;
