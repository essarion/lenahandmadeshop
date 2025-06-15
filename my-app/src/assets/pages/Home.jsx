import React from "react";
import Navbar from "../components/Navbar";
import classNames from "classnames";
import useHomePage from "../../hooks/useHomePage"
import { useContext } from "react";
import { ModalContext } from "../components/Modal/ModalProvider";
import ProductModal from "../components/ProductModal";


function Home() {
    const { data, loading, error } = useHomePage();
    const { modalOpen } = useContext(ModalContext);


    if (loading) return <p>Загрузка, подождите немного</p>
    if (error || !data) return <p>{error.message || 'Нет данных'}</p>
    return (
        <div className={classNames('main-page')}>
            <Navbar />
            <header className={classNames('main-page__greeting-form')}>
                <h1 className={classNames('main-page__greeting-form__heading')}>{data.welcome?.title}</h1>
                <p>{data.welcome?.text}</p>
            </header>
            <section className={classNames('main-page__showcase')}>
                <h2>{data.showcase?.title}</h2>
                <div className={classNames('main-page__showcase__product-directiry')}>
                    {data.showcase?.items?.map((item, index) => (
                        <div key={index}
                            style={{ backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 80%), url(http://localhost:8000${item.background_image})` }}
                            className={classNames('main-page__showcase__product-directiry__product-element')}
                        >

                            <p>{item.text_top}</p>
                            <h3>{item.page_name}</h3>
                            <p>{item.text_bottom}</p>
                        </div>
                    ))}
                </div>

            </section>

            <section className={classNames('main-page__catalog-intro')}>
                <h2>{data.catalog_intro?.title}</h2>
                <p>{data.catalog_intro?.text}</p>
            </section>

            <section className={classNames('main-page__catalog')}>
                {data.services?.map((service) => {
                    return (<div key={service.id}
                        className={classNames('main-page__catalog__card')}

                        onClick={() => modalOpen(<ProductModal slug={service.slug} />)}
                    >

                        <img src={`http://localhost:8000${service.image}`} alt={service.name} />
                        <div className={classNames('main-page__catalog__card__text-element')}>
                            <p>{service.name}</p>
                            <p>`Цена: ${service.price}`</p>
                        </div>

                    </div>)
                })}


            </section>

            <section className={classNames('main-page__advantages')}>
                <h2>Преимущества</h2>
                <div className={classNames('main-page__advantages__elements-field')}>
                    {data.advantages?.map((advantage, index) => {
                        return (<div key={index}
                            className={classNames('main-page__advantages__elements-field__element')}>
                            <img src={`http://localhost:8000${advantage.icon}`} alt={advantage.title} />
                            <h3>{advantage.title}</h3>
                            <p>{advantage.description}</p>
                        </div>)
                    })}
                </div>

            </section>

            <section className={classNames('main-page__delivery')}>
                <h2>{data.delivery?.title}</h2>
                <p>{data.delivery?.text}</p>
            </section>

            <section className={classNames('main-page__about')}>
                <h2>{data.about?.title}</h2>
                <p>{data.about?.text}</p>
            </section>

            <section className={classNames('main-page__contacts')}>
                <h2 className={classNames('main-page__contacts__haeding')}>{data.contacts?.title}</h2>
                <div className={classNames('main-page__contacts__text-info')}>
                    <p>{data.contacts?.phone}</p>
                    <p>{data.contacts?.email}</p>
                    <p>{data.contacts?.address}</p>
                </div>
            </section>

        </div>
    )
}

export default Home