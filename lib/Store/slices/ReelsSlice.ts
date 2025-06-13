import { createSlice } from '@reduxjs/toolkit';
import { ReelsFace } from 'types/interfaces/store/ReelsFace';

const initialState: ReelsFace = {
  ReelsData: [],
};
const ReelsSlice = createSlice({
  name: 'ReelsSlice',
  initialState,
  reducers: {
    cheangeReelsData: (state, action) => {
      state.ReelsData.push(...action.payload);
    },
  },
});

export const ReelsReducer = ReelsSlice.reducer;
export const { cheangeReelsData } = ReelsSlice.actions;
