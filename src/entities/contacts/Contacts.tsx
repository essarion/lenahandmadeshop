import { ContactsType } from "@/shared/types";
import styles from "@/entities/contacts/contacts.module.scss";


export const Contacts = ({ title, phone, email, address }: ContactsType) => {

    return (
        <section
            className={styles.contactBlock}
        >
            {title && <h2
                className={styles.heading}
            >
                {title}
            </h2>}

            <div
                className={styles.textInfo}
            >
                {phone && <p>{phone}</p>}
                {email && <p>{email}</p>}
                {address && <p>{address}</p>}
            </div>
        </section>
    )
};