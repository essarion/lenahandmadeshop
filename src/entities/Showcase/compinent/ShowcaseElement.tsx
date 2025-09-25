'use client';

import type { ShowcaseItemType } from "@/app/homePage.types";
import styles from "./ShowcaseElement.module.scss";


export const ShowcaseElement: React.FC<ShowcaseItemType> = ({
    background_image,
    webp_background_image,
    avif_background_image,
    text_bottom,
    text_top,
    page_name
}) => {

    return (
        <div
            className={styles.element}

            style={{
                backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 80%), 
    image-set(
      url('${avif_background_image}') type('image/avif'),
      url('${webp_background_image}') type('image/webp'),
      url('${background_image}') type('image/jpeg')
    )`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <p>
                {text_top}
            </p>
            <h3>
                {page_name}
            </h3>
            <p>
                {text_bottom}
            </p>
        </div>
    )
};