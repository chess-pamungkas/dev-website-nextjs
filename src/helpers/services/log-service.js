import axios from "axios";
import { isBrowser } from "./is-browser";

const API_URL = process.env.NEXT_PUBLIC_OQTIMA_API_URL;

const getEnv = () => {
  if (isBrowser() && window.location.hostname === "localhost") return "local";
  return process.env.NEXT_PUBLIC_ENV;
};

export const sendLog = (errorData) => {
  // Don't send logs if API_URL is not set or points to localhost
  if (
    !API_URL ||
    API_URL.includes("localhost") ||
    API_URL.includes("127.0.0.1")
  ) {
    // In development, just log to console instead of sending to server
    console.log("Log (development):", errorData);
    return;
  }

  const userAgent = isBrowser() ? navigator.userAgent : undefined;
  const source = isBrowser() ? window.location.href : undefined;
  const data = {
    env: getEnv(),
    content: [{ ...errorData, userAgent, source }],
  };

  // Add error handling to prevent unhandled promise rejections
  axios.post(`${API_URL}log`, data).catch((error) => {
    // Only log to console if it's not a 401/403 error (which are expected in dev)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.log(
        "Log endpoint requires authentication (expected in development)"
      );
    } else {
      console.log("Failed to send log:", error.message);
    }
  });
};
