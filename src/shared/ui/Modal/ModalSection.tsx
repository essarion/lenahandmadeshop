"use client";

import React, { useCallback, useState, createContext } from "react";
import { ModalProviderProps, ModalContextType } from "./modalSection.types";
import { ModalRoot } from "./ModalRoot";

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalSectionComponent: React.FC<ModalProviderProps> = ({ children }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<React.ReactNode | null>(null);

    const handleModalOpen = useCallback(
        (node: React.ReactNode) => {
            setIsOpen(true)
            setContent(node)
        }, []);


    const handleModalClose = useCallback(
        () => {
            setIsOpen(false)
            setContent(null)


        }, []);

    return (
        <ModalContext.Provider
            value={{ content, isOpen, handleModalClose, handleModalOpen }}
        >
            {children}
            {isOpen && content && (
                <ModalRoot handleModalClose={handleModalClose}>
                    {content}
                </ModalRoot>)}

        </ModalContext.Provider>
    )
};

export const ModalSection = React.memo(ModalSectionComponent);