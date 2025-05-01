import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateBalanceAsync = createAsyncThunk(
  "finance/updateBalance",
  async (amount, thunkAPI) => {
    const res = await axios.patch(
      "https://code-guard-backend.onrender.com/sidebar/balance"
    );
    return res.data.balance;
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState: {
    totalBalance: 0,
  },
  reducers: {
    setTotalBalance(state, action) {
      state.totalBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBalanceAsync.fulfilled, (state, action) => {
      state.totalBalance = action.payload;
    });
  },
});

export const { setTotalBalance } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
