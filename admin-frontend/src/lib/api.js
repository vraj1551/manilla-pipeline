// admin-frontend/src/lib/api.js
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  (import.meta.env.MODE === "production"
    ? "https://api.manilla.co.in"
    : "http://localhost:5000");

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // using JWT in Authorization header, not cookies
  timeout: 15000,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const t = sessionStorage.getItem("token");
  if (t) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

export default api;
