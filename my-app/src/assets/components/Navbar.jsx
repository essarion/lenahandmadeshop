import { Link, useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../images/Black_and_White_Minimalist_Candle_Product_Label_20231018_160103.svg'

function Navbar() {
    return (
        <div className={classNames('navbar')}>
            <div className={classNames('navbar__content-direction')}>
                <img
                    src={logo}
                    width='40px'
                    height='40px'
                    alt="logo"
                    loading='lazy'
                    className={classNames('navbar__content-direction__logo')}
                />

                <Link to='/'
                    className={classNames('navbar__content-direction__links')}
                >Главная</Link>
                <Link to='/candles'
                    className={classNames('navbar__content-direction__links')}
                >Свечи</Link>
                <Link to='/plasterProducts'
                    className={classNames('navbar__content-direction__links')}
                >Декор</Link>
                <Link to='/articles' className={classNames('navbar__content-direction__links')}
                >Полезные статьи</Link>
            </div>
            <div className={classNames('navbar__lc-direction')}>
                <Link to='/register' className={classNames('navbar__lc-direction__links')}>Регистрация</Link>
            </div>

        </div>
    )
}


export default Navbar