import React from "react";
import Navbar from "../components/Navbar";
import classNames from "classnames";
import useHomePage from "../../hooks/useHomePage"
import Advantages from "../components/Advantages";
import Catalog from "../components/Catalog";
import Delivery from "../components/Delivery";
import About from "../components/About";
import Contacts from "../components/Contacts";
import Showcase from "../components/Showcase";
import Footer from "../components/Footer";


function Home() {
    const { data, loading, error } = useHomePage();


    if (loading) return <p>Загрузка, подождите немного</p>
    if (error || !data) return <p>{error.message || 'Нет данных'}</p>
    return (
        <div className={classNames('main-page')}>
            <Navbar />
            <header className={classNames('main-page__greeting-form')}>
                <h1 className={classNames('main-page__greeting-form__heading')}>{data.welcome?.title}</h1>
                <p>{data.welcome?.text}</p>
            </header>

            <Showcase
                dataCategory={data}
                classPrefix={'main-page'}
            />

            <section className={classNames('main-page__catalog-intro')}>
                <h2>{data.catalog_intro?.title}</h2>
                <p>{data.catalog_intro?.text}</p>
            </section>

            <Catalog
                dataCategory={data}
                classPrefix={'main-page'}
            />

            <Advantages
                dataCategory={data}
                classPrefix={'main-page'}
            />

            <Delivery
                dataCategory={data}
                classPrefix={'main-page'}
            />

            <About
                dataCategory={data}
                classPrefix={'main-page'}
            />

            <Contacts
                dataCategory={data}
                classPrefix={'main-page'}
            />


            <Footer
                data={data}
            />
        </div>
    )
}

export default Home