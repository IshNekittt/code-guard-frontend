import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteTransaction,
  getTransactions,
  addTransaction,
  patchTransaction,
} from "./transactionsOp";

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
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(patchTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updated = action.payload;
        const index = state.items.findIndex((item) => item._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => {
          return item._id !== action.payload;
        });

        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getTransactions.pending,
          deleteTransaction.pending,
          patchTransaction.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getTransactions.rejected,
          deleteTransaction.rejected,
          patchTransaction.rejected
        ),
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
