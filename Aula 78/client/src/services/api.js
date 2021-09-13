import axios from "axios";
import authServices from "./authServices";

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,    
}); 

api.interceptors.request.use(config => {
    const accessToken = authServices.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
    const originalRequest = error.config;
    const loginUrl = `${process.env.REACT_APP_API_URL}/auth/login`;
    const refreshTokenUrl = "/auth/refreshToken";
    console.log(error.response.status);
    console.log(originalRequest.url);
    console.log(error.request.responseURL);
    console.log(error.response.status === 401 && originalRequest.url !== refreshTokenUrl && error.request.responseURL !== loginUrl);
    debugger
    if (error.response.status === 401 && originalRequest.url !== refreshTokenUrl && error.request.responseURL !== loginUrl) {      
      await authServices.refreshToken();      
      return api(originalRequest);
    }
    return Promise.reject(error);
});