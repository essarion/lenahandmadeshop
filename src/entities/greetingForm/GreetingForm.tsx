import { PictureSetElement } from "@/shared/ui/PictureSetElement/PictureSetElement";
import React from "react";
import type { WelcomeType } from "@/app/homePage.types";
import greetingAvif from "@/shared/assets/greeting_img.avif";
import greetingWebp from "@/shared/assets/greeting_img.webp";
import greetingGpg from "@/shared/assets/greeting_img.jpg";
import styles from "./greetingForm.module.scss";


export const GreetingForm: React.FC<WelcomeType> = ({
    title,
    text
}) => {

    return (
        <section
            className={styles.greetingForm}
        >
            <PictureSetElement
                alt="Приветствие"
                decoding="async"
                avif={greetingAvif}
                webp={greetingWebp}
                imageSrc={greetingGpg}
                width={190}
                height={1080}
                className={styles.bg}
                loading="eager"
            />
            <h1
                className={styles.heading}
            >
                {title}
            </h1>
            <p>
                {text}
            </p>
        </section>
    )

};