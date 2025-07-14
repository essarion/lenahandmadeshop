import React from "react";
import classNames from "classnames";


const Advantages = ({ dataCategory, classPrefix }) => {

    console.log(dataCategory)

    return (
        <section className={classNames(`${classPrefix}__advantages`)}>
            <h2>Преимущества</h2>
            <div className={classNames(`${classPrefix}__advantages__elements-field`)}>
                {dataCategory.advantages?.map((advantage, index) => {
                    return (<div key={index}
                        className={classNames(`${classPrefix}__advantages__elements-field__element`)}>
                        <picture>
                            {advantage.avif_icon && (
                                <source srcSet={advantage.avif_icon} type="image/avif" />
                            )}
                            {advantage.webp_icon && (
                                <source srcSet={advantage.webp_icon} type="image/webp" />
                            )}
                            <img
                                src={advantage.icon}
                                alt={advantage.title}
                                loading="lazy"
                                decoding="async"
                                width="122"
                                height="125"
                            />
                        </picture>
                        <h3>{advantage.title}</h3>
                        <p>{advantage.description}</p>
                    </div>)
                })}
            </div>

        </section>
    )
};
export default Advantages;