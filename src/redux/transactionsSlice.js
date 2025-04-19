import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, getTransactions } from "./transactionsOp";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "transactions",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => action.payload !== item.id);
      });
  },
});

export const transactionReducer = slice.reducer;
export const selectTransaction = (state) => state.transactions.items;
