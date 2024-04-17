import axios from "axios";

const env = import.meta.env.VITE_ENV;

export const axiosInstance = axios.create({
  baseURL:
    env === "DEV" ? "http://localhost:5045" : "https://api.depositcalc.com",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
  withCredentials: true,
});
