import { CatalogIntroProps } from "./catalogIntro.types";
import styles from "@/entities/catalogIntro/catalogIntro.module.scss";


export const CatalogIntro: React.FC<CatalogIntroProps> = ({ title, text }) => {

    return (
        <section
            className={styles.catalogIntro}
        >
            <h2>{title}</h2>
            <p>{text}</p>
        </section>
    )
}