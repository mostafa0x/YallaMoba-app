import { createSlice } from '@reduxjs/toolkit';
import { ReelsFace } from 'types/interfaces/store/ReelsFace';

const initialState: ReelsFace = {
  ReelsData: [],
  currIndex: 0,
};
const ReelsSlice = createSlice({
  name: 'ReelsSlice',
  initialState,
  reducers: {
    cheangeReelsData: (state, action) => {
      state.ReelsData.push(...action.payload);
    },
    ClearReelsData: (state, action) => {
      console.log('Clered');

      state.ReelsData = [];
      state.currIndex = 0;
    },
    changeCurrIndex: (state, action) => {
      state.currIndex = action.payload;
    },
    LikeReelPost: (state, action) => {
      const postId = action.payload;
      const postIndex = state.ReelsData.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.ReelsData[postIndex] = {
          ...state.ReelsData[postIndex],
          likedByUser: true,
          likeCount: parseInt(state.ReelsData[postIndex].likeCount) + 1,
        };
      }
    },

    unLikeReelPost: (state, action) => {
      const postId = action.payload;
      const postIndex = state.ReelsData.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.ReelsData[postIndex] = {
          ...state.ReelsData[postIndex],
          likedByUser: false,
          likeCount: parseInt(state.ReelsData[postIndex].likeCount) - 1,
        };
      }
    },
    addComment: (state, action) => {
      const postId = action.payload;
      const postIndex = state.ReelsData.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.ReelsData[postIndex] = {
          ...state.ReelsData[postIndex],
          commentCount: parseInt(state.ReelsData[postIndex].commentCount) + 1,
        };
      }
    },
    deleteComment: (state, action) => {
      const postId = action.payload;
      const postIndex = state.ReelsData.findIndex((post) => post.id === postId);
      if (postId !== -1) {
        state.ReelsData[postIndex] = {
          ...state.ReelsData[postIndex],
          commentCount: parseInt(state.ReelsData[postIndex].commentCount) - 1,
        };
      }
    },
  },
});

export const ReelsReducer = ReelsSlice.reducer;
export const {
  cheangeReelsData,
  changeCurrIndex,
  LikeReelPost,
  unLikeReelPost,
  addComment,
  deleteComment,
  ClearReelsData,
} = ReelsSlice.actions;
