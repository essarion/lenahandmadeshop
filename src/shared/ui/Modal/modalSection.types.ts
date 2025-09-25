export type handleModalClose = () => void;

export type HandleModalOpen = (node: React.ReactNode) => void;

export interface ModalContextType {
    isOpen: boolean;
    content: React.ReactNode | null;
    handleModalOpen: HandleModalOpen;
    handleModalClose: handleModalClose;
}

export interface ModalProviderProps {
    children: React.ReactNode;
}

