import React from "react";
import { useLogout } from "../model/useLogout";

interface LogoutButtonProps {
    className: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
    const logout = useLogout();

    return (
        <button
            onClick={logout}
            type="button"
            className={className}
        >
            Выйти
        </button>
    );
};
