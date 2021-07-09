import axios from 'axios';

const appRequest = axios.create({
    baseURL: 'http://localhost:3001'
});

export const setAppRequest = (authorization) => {
    // const defaultOptions = {
    //     baseURL: 'http://localhost:3001',
    //     authorizatizon: `Bearer ${authorization}`
    // }
    console.log('authorization', authorization);
    appRequest.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${authorization}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    // appRequest = axios.create(defaultOptions);
}
export default appRequest;
