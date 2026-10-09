import axios from "axios";

// Create an axios instance with your base backend API URL
const API = axios.create({
  baseURL: "http://192.168.1.15:5000/api", // Use 10.0.2.2 for Android Emulator, or your local IP for physical devices
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
