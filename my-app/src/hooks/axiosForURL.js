import axios from "axios";
import { data } from "react-router-dom";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/';

const axiosRequest = axios.create({
    baseURL: BASE_API_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})


// Перехватчик запросов для добавления токена (для будущей реализации лк и сеансов). Доделать обработчик ошибки
// В случае ошибки 401 редирект на вход и/или повторный запрос JWT
axiosRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


// Перехватчик для ответов сервера
axiosRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        })
        return Promise.reject(error)
    }
)

export default axiosRequest