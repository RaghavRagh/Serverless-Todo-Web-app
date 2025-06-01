import axios from 'axios';

const API = axios.create({
    baseURL: "https://fgtl4lv52k.execute-api.ap-south-1.amazonaws.com/stageTodo",
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const AuthAPI = axios.create({
    baseURL: "https://fgtl4lv52k.execute-api.ap-south-1.amazonaws.com/stageTodo",
})

export default API;