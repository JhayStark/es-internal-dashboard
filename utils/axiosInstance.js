import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
  async config => {
    config.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
    const localStorageObject = localStorage.getItem('token');
    const tokenObject = JSON.parse(localStorageObject);
    console.log(tokenObject);
    if (tokenObject) {
      config.headers.Authorization = `Bearer ${tokenObject.token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
