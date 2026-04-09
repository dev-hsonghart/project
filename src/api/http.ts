import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = 'http://localhost:3333';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  });

  client.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

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
      // 로그인 만료 처리
      if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );

  return client;
};

export const httpClient = createClient();

type requestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(
  method: requestMethod,
  url: string,
  payload?: T,
) => {
  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post(url, payload);
      break;
    case 'put':
      response = await httpClient.put(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete(url);
      break;
    default:
      response = await httpClient.get(url);
  }
  return response.data;
};
