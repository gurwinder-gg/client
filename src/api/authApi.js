// src/api/authApi.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = axios.create({ baseURL: `${BASE_URL}/api/users` });

// --- Register User ---
export const registerUser = (data) => API.post("/register", data);

// --- Login User ---
export const loginUser = (data) => API.post("/login", data);

// --- Google Login ---
export const googleLogin = (id_token) => API.post("/google", { id_token });

// --- Logout User ---
export const logoutUser = (token) =>
  API.post(
    "/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

// --- Get Current User ---
export const getCurrentUser = (token) =>
  API.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
