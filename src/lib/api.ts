// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Response interceptor for handel tanStack error 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "There is something wrong.";

      return Promise.reject({
        message,
        status: error.response?.status,
        isNetworkError: !error.response,
      });
    }
    return Promise.reject(error);
  },
);
