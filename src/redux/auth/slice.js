import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  logIn,
  refresh,
  logOut,
  getUserInfo,
  registration,
} from "./operations";

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
        state.isRefreshing = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
        };
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addMatcher(
        isAnyOf(
          refresh.rejected,
          logIn.rejected,
          logOut.rejected,
          getUserInfo.rejected,
          registration.rejected
        ),
        (state) => {
          state.isRefreshing = false;
        }
      )
      .addMatcher(
        isAnyOf(
          logIn.pending,
          logOut.pending,
          getUserInfo.pending,
          refresh.pending,
          registration.pending
        ),
        (state) => {
          state.isRefreshing = true;
        }
      );
  },
});

export default slice.reducer;
