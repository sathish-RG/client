import axios from "axios";
import Cookies from "js-cookie";
import { HOST } from "./constants";

// Create axios instance
const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request Interceptor to attach the token to headers
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve token from cookies
    const token = Cookies.get("access-token");
    console.log("Request URL:", config.url); // Debugging log
    console.log("Token found:", !!token); // Debugging log

    // If token exists and request is not for login/signup, add Authorization header
    if (token && config.url && !config.url.includes("/login") && !config.url.includes("/signup")) {
      console.log("Token attached to request:", token); // Debugging log
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error); // Debugging log
    return Promise.reject(error);
  }
);

export default apiClient;