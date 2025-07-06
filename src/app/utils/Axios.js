"use client";
import axios from "axios";
import { getData } from "../utils/localStorage";

export const BACKEND_HOST = "http://localhost:8000/api/";

const instanceWithToken = axios.create({
  baseURL: BACKEND_HOST,
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${getData("access")}`,
  },
});

const instance = axios.create({
  baseURL: BACKEND_HOST,
  timeout: 60000,
});

const refreshToken = async () => {
  try {
    const response = await axios.post(`${BACKEND_HOST}auth/refresh/`, {
      refresh: getData("refreshToken"),
    });
    const newAccessToken = response.data.access;
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

instanceWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        try {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            localStorage.setItem(access, newAccessToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config);
          } else {
            localStorage.clear();
            window.location.href = "/signin";
          }
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = "/signin";
        }
      }
    }
    return Promise.reject(error);
  }
);

const apiCallWithToken = async (endpoint, body, method, loadingState, onSuccess, onError) => {
  loadingState && loadingState(true);
  await instanceWithToken[method](endpoint, body)
    .then((response) => {
      let data = response.data;
      loadingState && loadingState(false);
      return onSuccess(data);
    })
    .catch((error) => {
      loadingState && loadingState(false);
      return onError(error);
    });
};

export const apiCall = async (endpoint, body, method, loadingState, onSuccess, onError) => {
  loadingState(true);
  await instance[method](endpoint, body)
    .then((response) => {
      let data = response.data;
      loadingState(false);
      return onSuccess(data);
    })
    .catch((error) => {
      loadingState(false);
      return onError(error);
    });
};

export default apiCallWithToken;
