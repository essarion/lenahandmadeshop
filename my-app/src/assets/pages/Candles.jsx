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



function Candles() {
    const { slug } = useParams();
    const { dataCategory, loading, error } = useCategoriesPage(slug);




    if (loading) return <p>Загрузка...</p>;
    if (error || !dataCategory) return <p>Ошибка загрузки: {error?.message || `Нет данных`}</p>

    return (
        <div className={classNames('category-page')}>
            <Navbar />
            <div className={classNames('category-page__heading')}>
                <h1>Декоративные и Контейнерные свечи</h1>

            </div>
            <Catalog
                dataCategory={dataCategory}
                classPrefix={'category-page'}
            />

            <Advantages
                dataCategory={dataCategory}
                classPrefix={'category-page'}
            />

            <Delivery
                dataCategory={dataCategory}
                classPrefix={'category-page'}
            />
            <Contacts
                dataCategory={dataCategory}
                classPrefix={'category-page'}
            />

            <Footer
                data={dataCategory}
            />
        </div>
    )
};
export default Candles;