import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const API_URL = baseURL || "https://code-guard-backend.onrender.com";

export default axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
