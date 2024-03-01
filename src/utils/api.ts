import axios, { AxiosError } from "axios";
import { Envs } from "./env";
import jwt_decode from 'jwt-decode';
import baseApi from "./baseApi";
import {router } from  "../routes/route"
const baseURL = Envs.apiLocal;

const apiJWT = axios.create({
  baseURL,
  withCredentials: true,
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

apiJWT.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : {};
    if (token) {
      const date = new Date();
      const decodeToken = jwt_decode(token) as { exp: number };
  
      if (decodeToken.exp < date.getTime() / 1000) {
        try {
          const { data } = await baseApi.post(`/auth/refresh-token`);
          config.headers['Authorization'] = `Bearer ${data.data.access_token}`;
          config.headers['uid'] = `Bearer ${data.data.id}`;
          localStorage.setItem('access_token', data.data.access_token);
          localStorage.setItem('uid', data.data.id);
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response?.data.error);
            if (error.response?.data.error.message === 'You are not authenticated') {
              localStorage.clear();
              router.navigate('/login');
              throw error;
            }
          } else {
            console.log(error);
          }
        }
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['uid'] = `${userObj.user.id}`;
      }
    }
    return config;
  });
  apiJWT.interceptors.response.use(
    async (response) => {
      await sleep();
      return response.data;
    },
    (error) => {
      const token = localStorage.getItem('access_token');
      if (error.response && error.response?.status === 401) {
        localStorage.clear();
        router.navigate('/login');
      }
      if (
        error.response &&
        error.response?.status === 403 &&
        error.response?.data?.error?.message !== 'User has been blocked' &&
        token
      ) {
        router.navigate('/forbidden');
      }
      return Promise.reject(error.response);
    }
  );
  
  export default apiJWT;
  