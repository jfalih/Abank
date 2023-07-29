import axios, {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import MMKV from '../storage';
import {baseUrl} from './url';

const baseRequest = axios.create({
  baseURL: Config.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// baseRequest.interceptors.request.use(
//   async res => {
//     const session = await MMKV.getStringAsync('session');
//     if (session) {
//       res.headers.Authorization = `Bearer ${session}`;
//     }
//     return res;
//   },
//   async err => Promise.reject(err),
// );

// baseRequest.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const config = error?.config;

//     if (error?.response?.status === 401 && !config?.sent) {
//       config.sent = true;
//       const authToken = await request(baseUrl('auth/refresh'), {
//         method: 'POST',
//       });
//       console.log(authToken);
//       return baseRequest(config);
//     }
//     return Promise.reject(error);
//   },
// );
const request = (url?: string, options?: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = {
    url,
    method: options?.method || 'GET',
    ...options,
  };

  return baseRequest(config);
};

export default request;
