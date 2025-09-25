import React from "react";

interface ModalCloseButtonProps {
    onClick?: () => void;
    buttonRef: React.Ref<HTMLButtonElement>;
    className?: string;
    ariaLabel?: string;
}

const ModalCloseButtonComponent: React.FC<ModalCloseButtonProps> = ({
    onClick,
    buttonRef,
    className,
    ariaLabel = "Закрыть модальное окно",
}) => {
    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={className}
            type="button"
            aria-label={ariaLabel}
        >
            Закрыть
        </button>
    );
};


export const ModalCloseButton = React.memo(ModalCloseButtonComponent);