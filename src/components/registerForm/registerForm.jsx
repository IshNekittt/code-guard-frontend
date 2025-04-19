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

    const onSubmit = (data) => {
        console.log(data);
    }

    const watchedFields = watch();
  const filledFieldsCount = ['name', 'email', 'password', 'confirmPassword'].filter(field => watchedFields[field]?.length > 0).length;
  const progressPercent = (filledFieldsCount / 4) * 100;
    return(
        <div className={s.formContainer}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.header}>
                    <svg class="money-guard" width="36" height="36">
                        <use href="/src/assets/icons.svg#icon-money-guard"></use>
                    </svg>
                    <h2 className={s.formTitle}>Money Guard</h2>
                </div>
                <div className={s.inputGroup}>
                    <svg className={s.inputIcon} width="24" height="24">
                        <use href="/src/assets/icons.svg#icon-user"></use>
                    </svg>
                    <input type="text" placeholder="Name" {...register('name')} />
                </div>
                {errors.name && <p className={s.errorMessage}>{errors.name.message}</p>}

                <div className={s.inputGroup}>
                    <svg className={s.inputIcon} width="24" height="24">
                        <use href="/src/assets/icons.svg#icon-email"></use>
                    </svg>
                    <input type="email" placeholder="E-mail" {...register('email')} />
                </div>
                {errors.email && <p className={s.errorMessage}>{errors.email.message}</p>}

                <div className={s.inputGroup}>
                    <svg className={s.inputIcon} width="24" height="24">
                        <use href="/src/assets/icons.svg#icon-password"></use>
                    </svg>
                    <input type="password" placeholder="Password" {...register('password')} />
                </div>
                {errors.password && <p className={s.errorMessage}>{errors.password.message}</p>}

                <div className={s.inputGroup} style={{marginBottom: '10px'}}>
                    <svg className={s.inputIcon} width="24" height="24">
                        <use href="/src/assets/icons.svg#icon-password"></use>
                    </svg>
                    <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
                    {errors.confirmPassword && (<p className={s.errorMessage}>{errors.confirmPassword.message}</p>)}

                </div>

               
                <div className={s.progressBar}>
                    <div className={s.progress} style={{ width: `${progressPercent}%` }}></div>
                </div>

                <button type="submit" className={s.registerButton}> 
                    Register
                </button>

                <button type="button" className={s.loginButton}> 
                    Log In
                </button>
            </form>
        </div>
    )
}

export default RegistrationForm;