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
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;        
        console.log("refresh do token");                        
        await authServices.refreshToken();     
        return api(originalRequest);                           
    }

    return Promise.reject(error);
  });