import React, { useContext } from "react";
import classNames from "classnames";
import ProductModal from "./ProductModal";
import { ModalContext } from "./Modal/ModalProvider";

const Catalog = ({ dataCategory, classPrefix }) => {

    const { modalOpen } = useContext(ModalContext);
    console.log(dataCategory)
    return (
        <section className={classNames(`${classPrefix}__catalog`)}>
            {dataCategory.services?.map((service) => {
                return (
                    <div key={service.id}
                        className={classNames(`${classPrefix}__catalog__card`)}
                        onClick={() => modalOpen(<ProductModal slug={service.slug} />)}
                    >

                        <picture>
                            {service.avif_image && (
                                <source srcSet={service.avif_image} type="image/avif" />)}
                            {service.webp_image && (<source srcSet={service.webp_image} type="image/webp" />)}
                            <img
                                src={service.image}
                                alt={service.name}
                                loading="lazy"
                                width="250"
                                height="210"

                            />
                        </picture>
                        <div className={classNames(`${classPrefix}__catalog__card__text-element`)}>
                            <p>{service.name}</p>
                            <p>Цена: {service.price}</p>
                        </div>
                    </div>)
            })}
        </section>
    )
};

export default Catalog;