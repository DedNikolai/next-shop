import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const sessionId = window.localStorage.getItem('sessionId');
      if (sessionId) {
        config.headers['session-id'] = sessionId;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
