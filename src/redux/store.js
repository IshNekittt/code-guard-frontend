import { configureStore } from "@reduxjs/toolkit";
import { statisticsReducer } from "./statistics/statisticsSlice";

export const store = configureStore({
  reducer: {
    statistics: statisticsReducer,
  },
})
export default store