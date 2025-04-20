
import { configureStore } from '@reduxjs/toolkit';
import { transactionReducer } from "./transactionsSlice";
import { financeReducer } from './financeSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    finance: financeReducer,
  },
});
