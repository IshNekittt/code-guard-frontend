import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getTransactions = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async ({ start, end }, thunkAPI) => {
    try {
      
       const token = "5k7AmP3X2K5499RgSR/XiAOcmbVkhcQ71QFvx/eV";
      const response = await axios.get(`http://localhost:3000/transactions/filter/by-date?`, {
        params: { start, end },
         headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, 
      });
      console.log(response.data.data)
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);