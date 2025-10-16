import axios from "axios";
import useAuthStore from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({ baseURL: `${BASE_URL}/api/admin` });
// Attach token
API.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAdminStats = async () => {
  const { data } = await API.get("/stats");
  return data;
};

export const fetchUsers = async () => {
  const { data } = await API.get("/users");
  return data;
};

export const fetchAssessments = async () => {
  const { data } = await API.get("/assessments");
  return data;
};

export const fetchChatStats = async () => {
  const { data } = await API.get("/chats");
  return data;
};
