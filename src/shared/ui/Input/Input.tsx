import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
    id: string;
    name: Path<T>;
    type: 'text' | 'email' | 'password' | 'tel';
    placeholder?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    register: UseFormRegister<T>;
    autoComplete?: string;
    required?: boolean;
    label?: string;
    errorMessage?: string;
}

export const Input = <T extends FieldValues>({
    type,
    id,
    name,
    register,
    placeholder,
    className,
    labelClassName,
    inputClassName,
    errorClassName,
    autoComplete,
    label,
    errorMessage,
    required
}: InputProps<T>) => {
    return (
        <div className={className ? className : undefined}>
            {label && (
                <label htmlFor={id} className={labelClassName ? labelClassName : undefined}>
                    {label} {required && <span aria-hidden="true">*</span>}
                </label>
            )}

            <input
                type={type}
                id={id}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={inputClassName ? inputClassName : undefined}
                aria-label={label || placeholder || name}
                {...register(name)}
            />

            {errorMessage && (
                <span id={`${id}-error`} role="alert" className={errorClassName ? errorClassName : undefined}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
};
