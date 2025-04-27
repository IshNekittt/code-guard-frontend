import { createSlice } from '@reduxjs/toolkit';
import { getTransactions } from './operations';

const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch transactions';
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
