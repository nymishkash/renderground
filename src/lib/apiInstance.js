// src/lib/api/rendergroundAPI.ts
import axios from "axios";

const rendergroundAPI = axios.create({
  baseURL: "https://renderground-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default rendergroundAPI;
