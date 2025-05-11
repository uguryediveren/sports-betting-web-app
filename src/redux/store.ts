import { configureStore } from '@reduxjs/toolkit';
import betReducer from './betSlice';
import eventsReducer from './eventsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    bet: betReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
