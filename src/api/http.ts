import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3333';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error(
          'HTTP Error:',
          error.response.status,
          error.response.data,
        );
      }
      return Promise.reject(error);
    },
  );

  return client;
};

export const httpClient = createClient();
