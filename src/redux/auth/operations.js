import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://code-guard-backend.onrender.com/";
axios.defaults.withCredentials = true;

const setToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const removeToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const logIn = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post("/auth/login", user);
    setToken(data.data.accessToken);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    removeToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Not authorized");
  }

  try {
    setToken(persistedToken);
    const { data } = await axios.get("/users/current");
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});