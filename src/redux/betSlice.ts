import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface BetSelection {
  id: string;
  eventId: string;
  eventName: string;
  selection: string;
  odds: number;
  type: string;
}

interface BetState {
  selections: BetSelection[];
  totalOdds: number;
}

const initialState: BetState = {
  selections: [],
  totalOdds: 1,
};

const calculateTotalOdds = (selections: BetSelection[]): number => {
  if (selections.length === 0) return 1;
  return selections.reduce((total, selection) => total * selection.odds, 1);
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    addToBet: (state, action: PayloadAction<Omit<BetSelection, 'id'>>) => {
      // Check if selection from same event already exists
      const existingSelectionIndex = state.selections.findIndex(
        (s) => s.eventId === action.payload.eventId && s.type === action.payload.type,
      );

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
    removeFromBet: (state, action: PayloadAction<string>) => {
      state.selections = state.selections.filter((selection) => selection.id !== action.payload);
      state.totalOdds = calculateTotalOdds(state.selections);
    },
    clearBet: (state) => {
      state.selections = [];
      state.totalOdds = 1;
    },
  },
});

export const { addToBet, removeFromBet, clearBet } = betSlice.actions;
export default betSlice.reducer;
