import React, { useContext } from "react";
import classNames from "classnames";
import ProductModal from "./ProductModal";
import { ModalContext } from "./Modal/ModalProvider";

const Catalog = ({ dataCategory, classPrefix }) => {

    const { modalOpen } = useContext(ModalContext);

    return (
        <section className={classNames(`${classPrefix}__catalog`)}>
            {dataCategory.services?.map((service) => {
                return (
                    <div key={service.id}
                        className={classNames(`${classPrefix}__catalog__card`)}
                        onClick={() => modalOpen(<ProductModal slug={service.slug} />)}
                    >
                        <img src={`http://localhost:8000${service.image}`} alt={service.name} />
                        <div className={classNames(`${classPrefix}__catalog__card__text-content`)}>
                            <p>{service.name}</p>
                            <p>Цена: {service.priсe}</p>
                        </div>
                    </div>)
            })}
        </section>
    )
};

export default Catalog;