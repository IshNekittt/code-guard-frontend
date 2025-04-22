import { logIn } from "../../redux/auth/operations";
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";


const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().required("Field requred"),
    password: Yup.string().trim().required("Field required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: location.state?.email ?? "",
    password: location.state?.password ?? "",
    };
    
const handleSubmit = (values) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Logged in");
        navigate("/contacts", { replace: true });
      })
      .catch(() => {
        toast.error("Something went wrong! Check your email or password!");
      });
    };
      return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
    
          <Form className={s.loginForm}>
          <div className={s.loginLogo}>
          <svg className={s.loginLogoIcon} viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg" 
>
  <path fill="#ffc727" d="M22.44 4.308c-2.219-0.555-4.438-1.664-6.102-3.328-1.664 1.664-3.883 2.774-6.102 3.328 0.555 4.993 2.219 8.321 6.102 11.095 3.883-2.774 6.102-6.102 6.102-11.095z"/>
  <path fill="#fbfbfb" d="M20.221 24.963l-15.533-18.307v8.876l12.204 13.869 3.329-4.438z"/>
  <path fill="#fbfbfb" d="M21.886 23.299l6.657-7.766v-8.321l-10.54 12.204 3.883 3.883z"/>
  <path fill="#fbfbfb" d="M22.44 26.073v4.993l6.102-7.212v-4.993l-6.102 7.212z"/>
  <path fill="#fbfbfb" d="M10.79 26.073l-6.102-7.212v4.993l6.102 7.212v-4.993z"/>
</svg>

              <h2 className={s.loginTitle}>Money Guard</h2>
            </div>
              <label className={s.loginLabel}>
<svg className={s.loginIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
  <path
    fill="#fff"
    opacity="0.4"
    d="M26.667 5.333h-21.333c-1.467 0-2.653 1.2-2.653 2.667l-0.013 16c0 1.467 1.2 2.667 2.667 2.667h21.333c1.467 0 2.667-1.2 2.667-2.667v-16c0-1.467-1.2-2.667-2.667-2.667zM26.667 10.667l-10.667 6.667-10.667-6.667v-2.667l10.667 6.667 10.667-6.667v2.667z"
  />
</svg>

              <Field type="text" name="email" className={s.loginField} placeholder="E-mail" />
              </label>

            <label className={s.loginLabel}>
            <svg className={s.loginIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
  <path
    fill="#fff"
    opacity="0.4"
    d="M24 10.667h-1.333v-2.667c0-3.68-2.987-6.667-6.667-6.667s-6.667 2.987-6.667 6.667v2.667h-1.333c-1.467 0-2.667 1.2-2.667 2.667v13.333c0 1.467 1.2 2.667 2.667 2.667h16c1.467 0 2.667-1.2 2.667-2.667v-13.333c0-1.467-1.2-2.667-2.667-2.667zM16 22.667c-1.467 0-2.667-1.2-2.667-2.667s1.2-2.667 2.667-2.667c1.467 0 2.667 1.2 2.667 2.667s-1.2 2.667-2.667 2.667zM20.133 10.667h-8.267v-2.667c0-2.28 1.853-4.133 4.133-4.133s4.133 1.853 4.133 4.133v2.667z"
  />
</svg>

          <Field type="password" name="password" className={s.loginField} placeholder="Password" />
              </label>
            
        <div className={s.buttonGroup}>
          <button type="submit" className={s.loginButton}>
            Log In
          </button>
          <button type="submit" className={s.registerButton}>
            Register
          </button>
        </div>
      </Form>
        </Formik>
  );
}