import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsStatistics } from './auth/operations';

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
      .addCase(getTransactionsStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionsStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getTransactionsStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch transactions';
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
