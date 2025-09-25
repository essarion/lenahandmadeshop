import { toast, ToastOptions } from "react-toastify";


const defaultOptions: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
};

export const showSuccessToast = (message: string, options: ToastOptions = {}) =>
    toast.success(message, { ...defaultOptions, ...options });

export const showErrorToast = (message: string, options: ToastOptions = {}) =>
    toast.error(message, { ...defaultOptions, ...options });

export const showInfoToast = (message: string, options: ToastOptions = {}) =>
    toast.info(message, { ...defaultOptions, ...options });

export const showWarningToast = (message: string, options: ToastOptions = {}) =>
    toast.warning(message, { ...defaultOptions, ...options });
