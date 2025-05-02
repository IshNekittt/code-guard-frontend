import axios from "axios";
import { store } from "../redux/store";
import { logOut } from "../redux/auth/operations";

const baseURL = import.meta.env.VITE_API_URL;

const API_URL = baseURL || "https://code-guard-backend.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await store.dispatch(logOut());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
