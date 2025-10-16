// src/api/chatApi.js
import axios from "axios";
import useAuthStore from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({ baseURL: `${BASE_URL}/api/chat` });

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API Calls ---
export const sendMessage = async (message) => {
  const res = await API.post("/send", { message });
  return res.data;
};

export const getChatHistory = async () => {
  const res = await API.get("/history");
  return res.data;
};

// text-to-speech
export const getTTS = async (text, lang = "en", slow = false) => {
  const { data } = await API.post("/tts", { text, lang, slow });
  return data.audioUrls; // returns array
};
 