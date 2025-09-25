"use client";

import { useContext } from "react";
import { ModalContext } from "@/shared/ui/Modal/ModalSection";

export const useModal = () => {

    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used within a ModalSection");
    }
    return context;
};