import { getSports } from '@/lib/api';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  sports: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const fetchSports = createAsyncThunk('sports/fetchSports', async () => {
  const res = await getSports();
  return res;
});

export const selectFootball = (state: any) =>
  state.sports.filter((sport: any) => sport.group === 'Soccer');

const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {
    setSports: (state, action) => {
      state.sports = action.payload; // Doğrudan state'in özelliklerini güncelliyoruz
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSports.pending, (state) => {
        state.status = 'loading'; // Durumu güncelliyoruz
      })
      .addCase(fetchSports.fulfilled, (state, action) => {
        state.sports = action.payload; // Gelen veriyi state'e kaydediyoruz
        state.status = 'succeeded';
      })
      .addCase(fetchSports.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Failed to fetch sports:', action.error);
      });
  },
});

export default sportsSlice.reducer;
export const { setSports } = sportsSlice.actions;
export const selectedFootballEvents = createSelector(
  (state: any) => state.sports,
  (sports) =>
    sports.filter((sport: any) => sport.group === 'Soccer').map((sport: any) => sport.key),
);
