import React from "react";


interface ButtonProps {
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    ariaLabel?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
    disabled = false,
    type = 'button',
    className,
    onClick,
    ariaLabel,
    children
}) => {

    return (
        <button
            disabled={disabled}
            type={type}
            className={className}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
};

export const Button = React.memo(ButtonComponent);