"use client";

import React, {
    useEffect,
    useRef
} from "react";
import { createPortal } from "react-dom";
import { ModalCloseButton } from "./ModalCloseButton/ModalCloseButton";

import { ModalRootProps } from "./modalRoot.types";
import styles from "./modalRoot.module.scss";


export const ModalRoot: React.FC<ModalRootProps> = ({ children, handleModalClose }) => {

    const modalRoot = document.getElementById('modal-root');
    const ref = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        ref.current?.focus()
        function escFunction(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                handleModalClose()
            }
        }
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', escFunction);

        return () => {
            document.removeEventListener('keydown', escFunction);
            document.body.style.overflow = '';
        }
    }, [handleModalClose])

    if (!modalRoot) return null;


    return createPortal(
        <div onClick={handleModalClose} className={styles.modal}>
            <div onClick={(e) => e.stopPropagation()} className={styles.modalSpace}>
                {children}
                <div className={styles.modalButtonWrapper}>
                    <ModalCloseButton
                        buttonRef={ref}
                        ariaLabel="Закрыть выбранное окно товара"
                        onClick={handleModalClose}
                        className={styles.modalButton}
                    />
                </div>
            </div>
        </div>,
        modalRoot
    )
};