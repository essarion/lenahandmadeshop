import React from "react";
import classNames from "classnames";
import telegram from "../images/contacts/telegram-svgrepo-com.svg";
import vk from "../images/contacts/vk-logo.svg";
import inst from "../images/contacts/instagram-sign-logo.svg";

const Footer = ({ data }) => {

    return (
        <section
            className={classNames('footer')}
        >
            <div
                className={classNames('footer__sety-block')}
            >
                <p>Мы в соц сетях:</p>
                <div
                    className={classNames('footer__sety-block__images')}
                >
                    <a href="https://t.me/redbud_candles" target="_blank" rel="noopener noreferrer">
                        <img
                            src={telegram}
                            alt="telegram"
                            width='40px'
                            height='40px'
                            loading="lazy" />
                    </a>

                    <a href="https://vk.com/redbud_candles" target="_blank" rel="noopener noreferrer">
                        <img
                            src={vk}
                            alt="vk"
                            width='40px'
                            height='40px'
                            loading="lazy" />
                    </a>

                    <a href="https://www.instagram.com/redbud_candles" target="_blank" rel="noopener noreferrer">
                        <img
                            src={inst}
                            alt="Instagram"
                            width='40px'
                            height='40px'
                            loading="lazy" />
                    </a>
                </div>
            </div>
            <div className={classNames('footer__middle-text-optional-block')}>
                <p>Все права защищены</p>
                <p>Адрес: {data.contacts?.address}</p>

            </div>

            <div className={classNames('footer__contacts-block')}>
                <p>Контакты для связи:</p>
                <p>Телефон: {data.contacts?.phone}</p>
                <p>Почта: {data.contacts?.email}</p>
            </div>
        </section>
    )
};

export default Footer;