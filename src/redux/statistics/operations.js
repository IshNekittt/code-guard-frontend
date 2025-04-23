import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMonthlyStats = createAsyncThunk(
  'statistics/fetchMonthlyStats',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/transactions/stats'); // путь к твоему API
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
