import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5045",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
  withCredentials: true,
});
