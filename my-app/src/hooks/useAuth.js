import axios from "axios";
import { useState } from "react";

function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (data) => {
        const { username, password } = data;
        try {
            const response = await axios.post('/api/token/', { username, password });
            setToken(response.data.access);
            setUser({ username });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Ошибка авторизации');
        }
    };

    return { login, user, token };
}

export default useAuth;