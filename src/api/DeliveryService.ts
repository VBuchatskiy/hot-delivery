import axios from "axios";

const DeliveryService = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "",
  headers: {
    "accept-language": "en",
    "content-type": "application/json",
  },
});

DeliveryService.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    throw error;
  }
);

DeliveryService.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    throw error;
  }
);

export { DeliveryService };
