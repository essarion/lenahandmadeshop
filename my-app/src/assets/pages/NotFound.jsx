import React from "react";
import { Link } from "react-router-dom";
import classNames from 'classnames';


function NotFound() {
    return (
        <div className={classNames('not-found-page')}>
            <h1 className={classNames('not-found-page__text')}>Страница, которую Вы ищете, не существует</h1>
            <Link to='/' className={classNames('not-found-page__buttom-home')}>
                Вернуться на главную страницу
            </Link>

        </div>
    )
}

export default NotFound