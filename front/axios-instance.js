import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const userString = localStorage.getItem('user') || '{}'; 
        const user = JSON.parse(userString);
        const accessToken = user.access_token; 

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
