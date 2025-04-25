import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import s from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(12, 'Password must not exceed 12 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const RegistrationForm = () =>{
    const {register, handleSubmit, formState: {errors}, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (formData) => {
        const data = {
            confirmPassword: formData.confirmPassword,
            ...safeData
        };
        console.log(data); // Перевірка виведення
    };
    
    const watchedFields = watch();
  const filledFieldsCount = ['name', 'email', 'password', 'confirmPassword'].filter(field => watchedFields[field]?.length > 0).length;
  const progressPercent = (filledFieldsCount / 4) * 100;
    return(
        <div className={s.formContainer}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.header}>
                    <svg  className={s.headerIcon}>
                        <use href="/src/assets/icons.svg#icon-money-guard"></use>
                    </svg>
                    <h2 className={s.formTitle}>Money Guard</h2>
                </div>
                <div className={s.inputGroup}>
                    <svg className={s.inputIcon}>
                        <use href="/src/assets/icons.svg#icon-user"></use>
                    </svg>
                    <input type="text" placeholder="Name" {...register('name')} />
                </div>
                <p className={s.errorMessage}>
                    {errors.name?.message || '\u00A0'}
                </p>
                <div className={s.inputGroup}>
                    <svg className={s.inputIcon} >
                        <use href="/src/assets/icons.svg#icon-email"></use>
                    </svg>
                    <input type="email" placeholder="E-mail" {...register('email')} />
                </div>
                <p className={s.errorMessage}>
                    {errors.email?.message || '\u00A0'}
                </p>
                <div className={s.inputGroup}>
                    <svg className={s.inputIcon}>
                        <use href="/src/assets/icons.svg#icon-password"></use>
                    </svg>
                    <input type="password" placeholder="Password" {...register('password')} />
                </div>
                <p className={s.errorMessage}>
                    {errors.password?.message || '\u00A0'}
                </p>
                <div className={s.inputGroup} style={{marginBottom: '0', height: '40px'}}>
                    <svg className={s.inputIcon} >
                        <use href="/src/assets/icons.svg#icon-password"></use>
                    </svg>
                    <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
                </div>
                
                <div className={s.progressBar}>
                    <div className={s.progress} style={{ width: `${progressPercent}%` }}></div>
                </div>
                    <p className={s.errorMessage} style={{top: '-50px'}}>
                        {errors.confirmPassword?.message || '\u00A0'}
                    </p>

                <button type="submit" className={s.registerButton}> 
                    Register
                </button>

                <Link className={s.loginButton} to="/login">
                    Log in
                </Link>

            </form>
        </div>
        
    )
}

export default RegistrationForm;