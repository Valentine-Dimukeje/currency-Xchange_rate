// src/config.js
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8000" // local backend
    : "https://currency-xchange-rate-backend.onrender.com"; // ✅ correct deployed backend URL

export default API_BASE;
