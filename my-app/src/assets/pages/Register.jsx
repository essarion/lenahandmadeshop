import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form"
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";



const registrationUserSchema = yup.object({
    username: yup.string().required(`Введите имя пользователя`).min(3, `Длинна имени не может быть менее 3 символов`).max(20, `Длинна имени не более 20 символов`),
    email: yup.string().required(`Введите Ваш e-mail`).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, `Недопустимый формат e-mail`).max(40, `Длинна почты превышает допустимую`),
    password: yup.string().required(`Заполните пароль`).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/, `Пароль должен содержать минимум 8 символов, включая строчные и заглавные буквы, цифры и спецсимвол`),
    confirmPassword: yup.string().required(`Подтвердите пароль`).oneOf([yup.ref('password')], `Пароли не совпадают`)
})


function Register() {

    const navigate = useNavigate()
    const { login } = useAuth()

    const [serverError, setServerError] = useState(null);
    const [registration, setRegistration] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(registrationUserSchema), mode: `onChange`, })


    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/register/', { username: data.username, email: data.email, password: data.password })
            setServerError(null);
            setRegistration(true);

            await login({ username: data.username, password: data.password });
            navigate('/')


        }
        catch (error) {
            setServerError(error.response?.data?.error || 'Ошибка регистрации')
        }
    }



    return (
        <div className={classNames('registration-form')}>
            <Navbar />
            <h1 className={classNames(`registration-form__heading`)}>Регистрация</h1>

            {serverError && <p className={classNames('registration-form__error')}>{serverError}</p>}
            {registration === true && <p className={classNames('registration-form__registration-message')}>Пользователь успешно зарегистрирован</p>}


            <form className={classNames(`registration-form__form`)} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Имя пользователя</label>

                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Введите имя"
                    {...register('username')}
                />
                {errors.username && <p className={classNames('registration-form__form__error')}>{errors.username.message}</p>}

                <label htmlFor="email">Введите почту</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Введите email"
                    {...register('email')}
                />
                {errors.email && <p className={classNames('registration-form__form__error')}>{errors.email.message}</p>}

                <label htmlFor="password">Введите пароль</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    {...register('password')}
                />
                {errors.password && <p className={classNames('registration-form__form__error')}>{errors.password.message}</p>}

                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Подтвердите пароль"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className={classNames('registration-form__form__error')}>{errors.confirmPassword.message}</p>}

                <button type="submit" disabled={!isValid} className={classNames('registration-form__form__button')}>Регистрация</button>
            </form>

        </div>
    )
}

export default Register