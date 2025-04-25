import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchMonthlyStats = createAsyncThunk(
//   'statistics/fetchMonthlyStats',
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get('/api/transactions/stats'); // путь к твоему API
//       return res.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
export const getTransactions = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(`https://code-guard-backend.onrender.com/transactions`, {
        params: { month, year },
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);