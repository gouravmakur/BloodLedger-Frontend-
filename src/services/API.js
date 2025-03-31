import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL || "http://localhost:5000", // Fallback URL
});

// Request Interceptor - Attach Token to Requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Or use sessionStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response Interceptor - Handle Unauthorized Errors
API.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;