import React from "react";
import classNames from "classnames";

const Delivery = ({ dataCategory, classPrefix }) => {

    return (
        <section className={classNames(`${classPrefix}__delivery`)}>
            <h2>{dataCategory.delivery?.title}</h2>
            <p>{dataCategory.delivery?.text}</p>
        </section>
    )
};

export default Delivery;