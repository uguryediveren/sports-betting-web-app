import { toast } from '@/components/ui/use-toast';
import { clearUsersBets, deleteBet, fetchUserBets, saveBet } from '@/lib/api';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface BetSelection {
  id: string;
  eventId: string;
  eventName: string;
  selection: string;
  odds: number;
  // type: string;
}

interface BetState {
  selections: BetSelection[];
  totalOdds: number;
}

const initialState: BetState = {
  selections: [],
  totalOdds: 1,
};

export const fetchUserBetsAction = createAsyncThunk(
  'fetchUserBets',
  async (userId: string): Promise<any> => {
    const response = await fetchUserBets(userId);
    return response;
  },
);

export const saveBetToFirebase = createAsyncThunk('saveBet', async (params: any) => {
  const response = await saveBet(params.userId, params.bet);
  return response;
});

export const removeFromBet = createAsyncThunk(
  'deleteBet',
  async (params: { userId: string; eventId: string }) => {
    return await deleteBet(params.userId, params.eventId);
  },
);

export const clearBets = createAsyncThunk('clearBets', async (userId: string) => {
  const response = await clearUsersBets(userId);
  return response;
});

export const placeBet = createAsyncThunk('placeBet', async (userId: string) => {
  const response = await clearUsersBets(userId);
  return response;
});

const calculateTotalOdds = (selections: BetSelection[]): number => {
  if (selections.length === 0) return 1;
  return selections.reduce((total, selection) => total * selection.odds, 1);
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    clear: (state) => {
      state.selections = [];
      state.totalOdds = 1;
    },
    addToBet: (state, action: PayloadAction<Omit<BetSelection, 'id'>>) => {
      // Check if selection from same event already exists
      const existingSelectionIndex = state.selections.findIndex(
        // (s) => s.eventId === action.payload.eventId && s.type === action.payload.type,
        (s) => s.eventId === action.payload.eventId,
      );

      console.log('existingSelectionIndex', existingSelectionIndex);

      if (existingSelectionIndex !== -1) {
        // Replace the existing selection
        state.selections[existingSelectionIndex] = {
          ...action.payload,
          id: state.selections[existingSelectionIndex].id,
        };
      } else {
        // Add new selection
        state.selections.push({
          ...action.payload,
          id: uuidv4(),
        });
      }

      state.totalOdds = calculateTotalOdds(state.selections);
    },
    // removeFromBet: (state, action: PayloadAction<string>) => {
    //   state.selections = state.selections.filter((selection) => selection.id !== action.payload);
    //   state.totalOdds = calculateTotalOdds(state.selections);
    // },
    clearBet: (state) => {
      state.selections = [];
      state.totalOdds = 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserBetsAction.fulfilled, (state, action) => {
      const formattedBets: BetSelection[] = action.payload.map((bet: any) => ({
        id: bet.id,
        eventName: bet.eventName,
        selection: bet.selection,
        odds: bet.odds,
        eventId: bet.eventId,
      }));
      state.selections.push(...formattedBets);
      state.totalOdds = calculateTotalOdds(state.selections);
    });

    builder.addCase(saveBetToFirebase.fulfilled, (state, action) => {
      const newBet: BetSelection = {
        id: action.payload.eventId,
        eventName: action.payload.eventName,
        selection: action.payload.selection,
        odds: action.payload.odds,
        eventId: action.payload.eventId,
      };

      // Check if selection from same event already exists
      const existingSelectionIndex = state.selections.findIndex(
        (s) => s.eventId === action.payload.eventId,
      );
      if (existingSelectionIndex !== -1) {
        // Replace the existing selection
        state.selections[existingSelectionIndex] = {
          ...newBet,
          id: state.selections[existingSelectionIndex].id,
        };
      }
      // Add new selection
      else {
        state.selections.push(newBet);
      }
      state.totalOdds = calculateTotalOdds(state.selections);
    });

    builder.addCase(removeFromBet.fulfilled, (state, action) => {
      state.selections = state.selections.filter(
        (selection) => selection.eventId !== action.meta.arg.eventId,
      );
      state.totalOdds = calculateTotalOdds(state.selections);
    });

    builder.addCase(placeBet.fulfilled, (state) => {
      state.selections = [];
      state.totalOdds = 1;
      toast({
        title: 'Bet placed successfully!',
      });
    });

    builder.addCase(clearBets.fulfilled, (state) => {
      state.selections = [];
      state.totalOdds = 1;
    });
  },
});

export const { addToBet, clearBet, clearAll } = betSlice.actions;
export default betSlice.reducer;
