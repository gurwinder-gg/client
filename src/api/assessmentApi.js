import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = axios.create({ baseURL: `${BASE_URL}/api/assessments` });

export const submitPHQ9 = async (responses, token) => {
  const res = await API.post(
    "/phq9",
    { responses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.assessment;
};

export const submitGAD7 = async (responses, token) => {
  const res = await API.post(
    "/gad7",
    { responses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.assessment;
};

export const submitGHQ = async (responses, token) => {
  const res = await API.post(
    "/ghq",
    { responses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.assessment;
};
