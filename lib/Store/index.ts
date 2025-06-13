import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './slices/UserSlice';
import { ProfileReducer } from './slices/ProfileSlice';
import { AvatarReducer } from './slices/AvatarSlice';
import { ReelsReducer } from './slices/ReelsSlice';

export const store = configureStore({
  reducer: { UserReducer, ProfileReducer, AvatarReducer, ReelsReducer },
});
