import axios from "axios";
import { useState } from "react";

function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (data) => {
        const { username, password } = data;
        try {
            const response = await axios.post('http://localhost:8000/api/token/', { username, password });
            setToken(response.data.access);
            setUser({ username });
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Ошибка авторизации');
        }
    };


    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };



    return { login, logout, user, token };
}

export default useAuth;