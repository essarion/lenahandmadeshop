import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import classNames from "classnames";
import useHomePage from "../../hooks/useHomePage"
import Catalog from "../components/Catalog";

import Showcase from "../components/Showcase";
import Footer from "../components/Footer";
import greetingAvif from '../images/greeting_img.avif';
import greetingWebp from '../images/greeting_img.webp';
import greetingJpg from '../images/greeting_img.jpg';


const Advantages = React.lazy(() => import("../components/Advantages"));
const Delivery = React.lazy(() => import("../components/Delivery"));
const About = React.lazy(() => import("../components/About"));
const Contacts = React.lazy(() => import("../components/Contacts"));


function Home() {
    const { data, loading, error } = useHomePage();


    if (loading) return <p>Загрузка, подождите немного</p>
    if (error || !data) return <p>{error.message || 'Нет данных'}</p>
    return (
        <div className={classNames('main-page')}>
            <Navbar />
            <header className={classNames('main-page__greeting-form')}>
                <picture
                    className={classNames('main-page__greeting-form__bg')}
                >
                    <source srcSet={greetingAvif} type="image/avif" />
                    <source srcSet={greetingWebp} type="image/webp" />
                    <img
                        src={greetingJpg}
                        alt="Приветствие"
                        loading="lazy"
                        width="250"
                        height="210"

                    />
                </picture>
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

            <Suspense fallback={<div>Загрузка данных...</div>}>
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
            </Suspense>




            <Footer
                data={data}
            />
        </div>
    )
}

export default Home