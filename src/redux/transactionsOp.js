import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactions = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/transactions");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/transactions/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);