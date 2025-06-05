import react, { useState } from "react";
import Navbar from "../components/Navbar";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form"
import classNames from "classnames";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object({
    username: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль')
})

function Login() {

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [serverError, setServerError] = useState(null);

    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            await login({ username: data.username, password: data.password });
            setServerError(null);
            navigate(from, { replace: true });
        } catch (error) {
            setServerError(error.response?.data?.error || 'Ошибка входа');
        }

    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(loginSchema), mode: 'onChange' });
    return (
        <div className={classNames('login-form')}>
            <Navbar />
            <h1 className={classNames('login-form__heading')}>Войти</h1>
            {serverError && <p className={classNames('login-form__server-error')}>{serverError}</p>}
            <form className={classNames('login-form__form')} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Введите логин</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Введите login"
                    autoComplete="username"
                    {...register('username')}
                />
                {errors.username && <p className={classNames('login-form__form__error')}>{errors.username.message}</p>}

                <label htmlFor="password">Введите пароль</label>
                <input type="password"
                    id="password"
                    autoComplete="password"
                    placeholder="Введите пароль"
                    {...register('password')}
                />
                {errors.password && <p className={classNames('login-form__form__error')}>{errors.password.message}</p>}

                <button type="submit"
                    disabled={!isValid}
                    className={classNames('login-form__form__button')}
                >Войти</button>

            </form>
            <div className={classNames('login-form__link-contain')}>
                <Link to='/register' className={classNames('login-form__link-contain__link')}>Нет аккаунта? Зарегистрироваться</Link>
            </div>

        </div >
    )
}

export default Login
