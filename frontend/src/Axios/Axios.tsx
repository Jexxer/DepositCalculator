import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://deposticalc.com",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
  withCredentials: true,
});
