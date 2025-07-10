import React from "react";
import classNames from "classnames";

const Contacts = ({ dataCategory, classPrefix }) => {

    return (
        <section className={classNames(`${classPrefix}__contacts`)}>
            <h2 className={classNames(`${classPrefix}__contacts__haeding`)}>{dataCategory.contacts?.title}</h2>
            <div className={classNames(`${classPrefix}__contacts__text-info`)}>
                <p>{dataCategory.contacts?.phone}</p>
                <p>{dataCategory.contacts?.email}</p>
                <p>{dataCategory.contacts?.address}</p>
            </div>
        </section>
    )
};
export default Contacts;