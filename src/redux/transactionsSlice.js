import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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
        state.isLoading = false;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => action.payload !== item.id);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(getTransactions.pending, deleteTransaction.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(getTransactions.rejected, deleteTransaction.rejected),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const transactionReducer = slice.reducer;
export const selectTransaction = (state) => state.transactions.items;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectIsError = (state) => state.transactions.error;