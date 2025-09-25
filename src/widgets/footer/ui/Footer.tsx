import React from "react";
import { ContactBlock } from "./ContactsBlock";
import { SocialLinks } from "./SocialLinks";
import styles from "@/widgets/footer/ui/footer.module.scss";


export const Footer: React.FC = () => {

    return (
        <section
            className={styles.footer}
            aria-label="Футер сайта"
        >
            <SocialLinks
            />
            <div
                className={styles.middleTextOptionalBlock}

            >
                <p>Все права защищены</p>
            </div>

            <ContactBlock
                className={styles.contactsBlock}
            />
        </section>
    )
};