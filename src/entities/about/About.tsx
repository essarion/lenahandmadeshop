import { AboutProps } from "./about.types";
import styles from "@/entities/about/about.module.scss";


export const About = ({ title, text }: AboutProps) => {
    if (!title || !text) return null;

    return (
        <section
            className={styles.aboutBlock}
        >
            <h2>{title}</h2>
            <p>{text}</p>
        </section>
    )
}