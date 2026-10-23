import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import { API_PATHS, BASE_URL } from "./apiPaths.ts";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const requestUrl = error.config?.url;

      if (status === 401 && requestUrl !== API_PATHS.AUTH.LOGIN) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      if (status === 500) {
        console.error("Server error. Please try again later.");
      }
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        console.error("Request timeout. Please try again later.");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
