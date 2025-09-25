'use client';

import { ShowcaseElement } from "./ShowcaseElement";
import type { ShowcaseType } from "@/app/homePage.types";
import styles from "./showcase.module.scss";

export const Showcase: React.FC<ShowcaseType> = ({
    title,
    items
}) => {

    return (
        <section
            className={styles.showcase}
        >
            <h2>
                {title}
            </h2>
            <div
                className={styles.productDirectiry}
            >
                {items.map((item, index) => (
                    <ShowcaseElement
                        key={index}
                        {...item}

                    />
                )
                )}

            </div>
        </section>
    )
};