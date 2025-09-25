import React from "react";
import { ServiceItemType } from "@/shared/types";
import { PictureSetElement } from "@/shared/ui/PictureSetElement/PictureSetElement";
import styles from "@/entities/catalogItem/catalogItem.module.scss";


interface ServiceItemProps {
    service: ServiceItemType;
    onOpenModal: (slug: string) => void;
}


const CatalogItemComponent: React.FC<ServiceItemProps> = ({ service, onOpenModal }) => {

    return (
        <section
            onClick={() => onOpenModal(service.slug)}
            className={styles.productCard}
        >

            <PictureSetElement
                className={styles.pictureWrapper}
                imageSrc={service.image ?? undefined}
                avif={service.avif_image ?? undefined}
                webp={service.webp_image ?? undefined}
                loading="lazy"
                decoding="async"
                height={210}
                width={250}
                alt={service.name}
            />
            <div
                className={styles.textElement}
            >
                <p>{service.name}</p>
                <p>Цена: {service.price}</p>
            </div>

        </section>
    )
}

export const CatalogItem = React.memo(CatalogItemComponent);