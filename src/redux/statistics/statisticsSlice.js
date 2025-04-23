import { createSlice } from '@reduxjs/toolkit';
import { fetchMonthlyStats } from './operations';

const initialState = {
  summary: null,
  chartData: [],
  tableData: [],
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchMonthlyStats.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMonthlyStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload.summary;
        state.chartData = action.payload.chartData;
        state.tableData = action.payload.tableData;
      })
      .addCase(fetchMonthlyStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
