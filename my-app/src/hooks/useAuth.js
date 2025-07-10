import axios from "axios";
import { useState, useEffect } from "react";

function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axios
                .get("http://localhost:8000/api/auth/user/", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => {
                    setToken(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                });
        }
    }, [token]);

    const login = async (data) => {
        const { username, password } = data;
        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password,
            });

            const access = response.data.access;
            const refresh = response.data.refresh;

            localStorage.setItem("token", access);
            localStorage.setItem("refreshToken", refresh);
            setToken(access);

            const userResponse = await axios.get("http://localhost:8000/api/auth/user/", {
                headers: { Authorization: `Bearer ${access}` },
            });
            setUser(userResponse.data);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Ошибка авторизации");
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    return { login, logout, user, token };
}

export default useAuth;
