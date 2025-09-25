import { handleModalClose } from "./modalSection.types"

export interface ModalRootProps {
    children: React.ReactNode;
    handleModalClose: handleModalClose;
}