
import { configureStore } from '@reduxjs/toolkit';
import { transactionReducer } from "./transactionsSlice";
import { financeReducer } from './financeSlice';
import { statisticsReducer } from './statistics/statisticsSlice';
import authReducer from "./auth/slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "token",
  version: 1,
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,

    auth: persistedAuthReducer,

    finance: financeReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
