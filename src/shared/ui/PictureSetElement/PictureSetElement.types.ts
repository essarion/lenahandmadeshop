import type { StaticImageData } from 'next/image';

export interface PictureSetElementProps {
    avif?: string | StaticImageData;
    webp?: string | StaticImageData;
    imageSrc?: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
    className?: string;
    loading: 'lazy' | 'eager';
    decoding: 'async' | 'sync' | 'auto';

}
