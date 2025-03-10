import type {AxiosRequestHeaders} from 'axios';
import axios from 'axios';
import {deleteFromStorage, getFromStorage} from '../../helpers/localStorage';
import {store} from '../../store';
import {resetProfile} from '../../store/slices/userSlice';

const axiosInstance = axios.create({
  baseURL: 'https://api.cashlog.in/',
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  response => response.data,
  async error => {
    if (error?.response?.status === 401) {
      await deleteFromStorage('token');
      store.dispatch(resetProfile());
    }
    return Promise.reject(error?.response?.data);
  },
);
axiosInstance.interceptors.request.use(async config => {
  const token = await getFromStorage('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return config;
});

export default axiosInstance;
