import React from "react";
import Image, { StaticImageData } from "next/image";
import type { PictureSetElementProps } from "./PictureSetElement.types";

const toSrc = (src?: string | StaticImageData): string | undefined => {
    if (!src) return undefined;
    return typeof src === "string" ? src : src.src;
};

const PictureSetElementComponent: React.FC<PictureSetElementProps> = ({
    avif,
    webp,
    imageSrc,
    alt,
    width,
    height,
    loading = "lazy",
    decoding = "async",
    className,
}) => {
    const fallbackSrc = toSrc(imageSrc);

    return (
        <picture className={className}>
            {avif && <source srcSet={toSrc(avif)} type="image/avif" />}
            {webp && <source srcSet={toSrc(webp)} type="image/webp" />}
            {fallbackSrc && (
                <Image
                    src={fallbackSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={loading}
                    decoding={decoding}
                    quality={75}
                    priority={loading === "eager"}
                    sizes="100vw"
                    unoptimized
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            )}
        </picture>
    );
};

export const PictureSetElement = React.memo(PictureSetElementComponent);