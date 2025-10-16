import axios from "axios";
import useAuthStore from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({ baseURL: `${BASE_URL}/api/appointments` });

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Find counsellors near user
export const findCounsellors = async ({ lat, lng }) => {
  const { data } = await API.post("/find", { lat, lng });
  return data;
};

// Book appointment
export const bookAppointment = async ({ counsellor, appointmentDate }) => {
  const { data } = await API.post("/book", { counsellor, appointmentDate });
  return data;
};

// Get current user's bookings
export const getUserBookings = async () => {
  const res = await API.get("/myBookings"); // must match the backend route
  return res.data;
};
