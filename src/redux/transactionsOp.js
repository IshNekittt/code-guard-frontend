import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const getTransactions = createAsyncThunk(
  "transactions/fetchAllTransaction",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (newTx, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await api.post("/transactions", newTx, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const patchTransaction = createAsyncThunk(
  "transactions/patchTransaction",
  async ({ id, payload }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const response = await api.patch(`/transactions/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.data?.message || err.message || "Unknown error"
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      await api.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
