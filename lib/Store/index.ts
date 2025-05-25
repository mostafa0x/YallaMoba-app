import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './slices/UserSlice';
import { ProfileReducer } from './slices/ProfileSlice';

export const store = configureStore({
  reducer: { UserReducer, ProfileReducer },
});
