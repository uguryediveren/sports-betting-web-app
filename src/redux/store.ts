import { configureStore } from '@reduxjs/toolkit';
import betReducer from './betSlice';
import eventsReducer from './eventsSlice';
import sportsReducer from './sportsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    bet: betReducer,
    sports: sportsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
