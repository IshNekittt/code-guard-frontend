import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import s from "./RegisterForm.module.css";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(12),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required(),
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
                <h2 className={s.formTitle}>Money Guard</h2>

                <div className={s.inputGroup}>
                    <FaUser className={s.inputIcon} />
                    <input type="text" placeholder="Name" {...register('name')} />
                </div>
                {errors.name && <p className={s.errorMessage}>{errors.name.message}</p>}

                <div className={s.inputGroup}>
                    <FaEnvelope className={s.inputIcon} />
                    <input type="email" placeholder="E-mail" {...register('email')} />
                </div>
                {errors.email && <p className={s.errorMessage}>{errors.email.message}</p>}

                <div className={s.inputGroup}>
                    <FaLock className={s.inputIcon} />
                    <input type="password" placeholder="Password" {...register('password')} />
                </div>
                {errors.password && <p className={s.errorMessage}>{errors.password.message}</p>}

                <div className={s.inputGroup}>
                    <FaLock className={s.inputIcon} />
                    <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
                    <div className={s.progressBar}>
                    <div className={s.progress} style={{ width: `${progressPercent}%` }}></div>
                </div>
                </div>
                {errors.confirmPassword && <p className={s.errorMessage}>{errors.confirmPassword.message}</p>}

               

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