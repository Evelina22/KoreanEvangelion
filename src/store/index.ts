import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
