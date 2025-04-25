import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logIn, refresh, logOut, getUserInfo } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
        };
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addMatcher(
        isAnyOf(
          logIn.pending,
          logOut.pending,
          getUserInfo.pending,
          refresh.pending
        ),
        (state) => {
          state.isRefreshing = true;
        }
      );
  },
});
export default slice.reducer;
