import { getAllFootballOdds } from '@/lib/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Event } from '../types/events';

interface EventsState {
  events: Event[];
  footballStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // isFootballFetched: boolean;
  isBasketballFetched: boolean;
  isTennisFetched: boolean;
  isVolleyballFetched: boolean;
  basketballStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  tennisStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  volleyballStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: EventsState = {
  events: [],
  footballStatus: 'idle',
  error: null,
  // isFootballFetched: false,
  isBasketballFetched: false,
  isTennisFetched: false,
  isVolleyballFetched: false,
  basketballStatus: 'idle',
  tennisStatus: 'idle',
  volleyballStatus: 'idle',
};

export const fetchFootball = createAsyncThunk('events/fetchFootball', async (keys: string[]) => {
  console.log('futbolu çektimmmmmm');

  const response = await getAllFootballOdds(keys);
  return response;
});

export const fetchBasketball = createAsyncThunk('events/fetchBasketball', async () => {
  console.log('basketbolu çektimmmmmm');
  // const response = await getAllBasketballOdds();
  // return response;
});

export const fetchTennis = createAsyncThunk('events/fetchTennis', async () => {
  console.log('tenisi çektimmmmmm');
  // const response = await getAllTennisOdds();
  // return response;
});

export const fetchVolleyball = createAsyncThunk('events/fetchVolleyball', async () => {
  console.log('voleybolu çektimmmmmm');
  // const response = await getAllVolleyballOdds();
  // return response;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFootball.pending, (state) => {
        state.footballStatus = 'loading';
      })
      .addCase(fetchFootball.fulfilled, (state, action) => {
        state.footballStatus = 'succeeded';
        state.events = action.payload;
        // state.isFootballFetched = true;
        console.log('jeyyyyyyyyyyyyyy', action.payload);
      })
      .addCase(fetchFootball.rejected, (state, action) => {
        state.footballStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      });
    builder
      .addCase(fetchBasketball.pending, (state) => {
        state.basketballStatus = 'loading';
      })
      .addCase(fetchBasketball.fulfilled, (state, action) => {
        state.basketballStatus = 'succeeded';
        // state.events = action.payload;
        state.isBasketballFetched = true;
        console.log('basketbol jeyyyyyyyyyyyyyy', action.payload);
      })
      .addCase(fetchBasketball.rejected, (state, action) => {
        state.basketballStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      });
    builder
      .addCase(fetchTennis.pending, (state) => {
        state.tennisStatus = 'loading';
      })
      .addCase(fetchTennis.fulfilled, (state, action) => {
        state.tennisStatus = 'succeeded';
        // state.events = action.payload;
        state.isTennisFetched = true;
        console.log('tenis jeyyyyyyyyyyyyyy', action.payload);
      })
      .addCase(fetchTennis.rejected, (state, action) => {
        state.tennisStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      });
    builder
      .addCase(fetchVolleyball.pending, (state) => {
        state.volleyballStatus = 'loading';
      })
      .addCase(fetchVolleyball.fulfilled, (state, action) => {
        state.volleyballStatus = 'succeeded';
        // state.events = action.payload;
        state.isVolleyballFetched = true;
        console.log('voleybol jeyyyyyyyyyyyyyy', action.payload);
      })
      .addCase(fetchVolleyball.rejected, (state, action) => {
        state.volleyballStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export default eventsSlice.reducer;
