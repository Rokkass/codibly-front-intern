// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const baseURL = 'https://reqres.in/api/products';

const api = axios.create({
  baseURL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const headers = config.headers ? { ...config.headers } : {};
    // const token = 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e';
    //
    // if (token) {
    //   headers['Authorization'] = token;
    // }
    // config.headers = headers;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
