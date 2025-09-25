import { DeliveryType } from "@/shared/types";
import styles from '@/entities/delivery/delivery.module.scss';


export const Delivery = ({ title, text }: DeliveryType) => {

    if (!title || !text) return null;
    return (
        <section
            className={styles.deliveryBlock}
        >
            <h2>{title}</h2>
            <p>{text}</p>
        </section>
    )
};