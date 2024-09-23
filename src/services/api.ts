import { envs } from "@/constants/envs";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: envs.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
