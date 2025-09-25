import React, { ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkNavbarProps {
    children: ReactNode | string;
    href: string;
    prefetch?: boolean;
    className?: string;
    ariaLabel?: string;

}

export const LinkNavbar: React.FC<LinkNavbarProps> = ({ children,
    href,
    prefetch = false,
    className,
    ariaLabel

}) => {

    return (
        <NextLink
            href={href}
            prefetch={prefetch}
            className={className}
            aria-label={ariaLabel}
        >
            <span>{children}</span>

        </NextLink>
    )
};