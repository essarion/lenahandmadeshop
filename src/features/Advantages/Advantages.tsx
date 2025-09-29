import { AdvantageItem } from "@/entities/advantageItem/AdvantageItem";
import { AdvantageItemType } from "@/shared/types";
import styles from "./advantages.module.scss";

export interface AdvantagesProps extends Record<string, unknown> {
    advantages: AdvantageItemType[];
}

export const Advantages: React.FC<AdvantagesProps> = ({ advantages }) => {

    return (
        <section
            className={styles.advantages}
        >
            <h2>Преимущества</h2>
            <div
                className={styles.advantageField}
            >
                {advantages?.map((advantage, index) => {
                    return (
                        <AdvantageItem
                            key={index}
                            {...advantage}
                        />
                    )
                })}
            </div>

        </section>
    )
};