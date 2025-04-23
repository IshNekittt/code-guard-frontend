
import { configureStore } from '@reduxjs/toolkit';
import { transactionReducer } from "./transactionsSlice";
<<<<<<< HEAD
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
=======
import { financeReducer } from './financeSlice';
>>>>>>> e5472f9 (sidebar)

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
<<<<<<< HEAD
    auth: persistedAuthReducer,
=======
    finance: financeReducer,
>>>>>>> e5472f9 (sidebar)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
