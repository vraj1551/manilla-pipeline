// frontend/src/lib/api.js
import axios from "axios";

/**
 * Determine a safe API base URL:
 * - Prefer VITE_API_BASE_URL if provided.
 * - In production, default to your API domain.
 * - In dev, default to http://localhost:5000.
 */
const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");

const API_BASE =
  fromEnv ||
  (import.meta.env.MODE === "production"
    ? "https://api.manilla.co.in"
    : "http://localhost:5000");

if (!fromEnv) {
  console.warn(
    `[api] VITE_API_BASE_URL not set, using ${API_BASE}. ` +
      `Set VITE_API_BASE_URL in your .env files for clarity.`,
  );
}

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // using header auth (if any), not cookies
  timeout: 15000,
});

// If you later need auth on public site, auto-attach token here:
// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
