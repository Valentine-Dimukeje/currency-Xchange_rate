// src/config.js
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8000" // local backend
    : "https://currency-xchange-backend.onrender.com"; // replace with your deployed backend URL later

export default API_BASE;
