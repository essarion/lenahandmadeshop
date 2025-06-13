import { children, createContext, useCallback, useContext, useState } from "react";
import ServiceCard from "../SericeCard";


export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalContent, setModalContent] = useState(null);

    const modalOpen = useCallback((content) => setModalContent(content), [])
        ;
    const modalClose = useCallback(() => setModalContent(null), []);
    return (
        <ModalContext.Provider value={{ modalOpen, modalClose }}>
            {children}

            {modalContent && <ServiceCard modalClose={modalClose}>
                {modalContent}
            </ServiceCard>}
        </ModalContext.Provider>
    )
}



