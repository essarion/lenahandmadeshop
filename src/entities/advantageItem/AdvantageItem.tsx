import { AdvantageItemType } from "@/shared/types";
import { PictureSetElement } from "@/shared/ui/PictureSetElement/PictureSetElement";
import styles from '@/entities/advantageItem/advantageItem.module.scss';

export const AdvantageItem = ({ title, description, icon, webp_icon, avif_icon }: AdvantageItemType) => {

    return (
        <section
            className={styles.advantageItem}
        >
            <PictureSetElement
                webp={webp_icon}
                avif={avif_icon}
                imageSrc={icon}
                alt={title}
                loading="lazy"
                decoding="async"
                width={122}
                height={125}
            />
            <h3>{title}</h3>
            <p>{description}</p>
        </section>
    )
};