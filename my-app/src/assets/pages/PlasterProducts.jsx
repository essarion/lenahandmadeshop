import React from "react";
import useCategoriesPage from "../../hooks/useCategoriesPages";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import Navbar from "../components/Navbar";
import Catalog from "../components/Catalog";
import Advantages from "../components/Advantages";
import Delivery from "../components/Delivery";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";


function PlasterProducts() {
    const { slug } = useParams();
    const { dataCategory, loading, error } = useCategoriesPage(slug);


    if (loading) return <p>Загрузка...</p>;
    if (error || !dataCategory) return <p>Ошибка загрузки: {error.message || `Нет данных`} </p>
    return (
        <div className={classNames('plaster-products')}>
            <Navbar />
            <section className={classNames('plaster-products__heading')}>
                <h1>Декор</h1>
            </section>

            <Catalog
                dataCategory={dataCategory}
                classPrefix={"plaster-products"} />

            <Advantages
                dataCategory={dataCategory}
                classPrefix={'plaster-products'}
            />

            <Delivery
                dataCategory={dataCategory}
                classPrefix={'plaster-products'}
            />

            <Contacts
                dataCategory={dataCategory}
                classPrefix={'plaster-products'}
            />

            <Footer
                data={dataCategory}
            />

        </div>
    )
}

export default PlasterProducts