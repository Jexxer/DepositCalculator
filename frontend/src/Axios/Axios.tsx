import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.depositcalc.com",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
  withCredentials: true,
});
