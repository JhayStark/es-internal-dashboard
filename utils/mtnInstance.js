import axios from 'axios';

const mtnApi = axios.create();

mtnApi.interceptors.request.use(
  async config => {
    config.baseURL = `${process.env.NEXT_PUBLIC_MTN_BACKEND_URL}`;
    const localStorageObject = localStorage.getItem('token');
    const tokenObject = JSON.parse(localStorageObject);
    if (tokenObject) {
      config.headers.Authorization = `Bearer ${tokenObject.token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default mtnApi;
