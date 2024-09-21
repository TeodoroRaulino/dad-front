import { envs } from "@/constants/envs";
import axios from "axios";

const api = axios.create({
  baseURL: envs.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
