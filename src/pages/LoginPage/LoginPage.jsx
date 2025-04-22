import LoginForm from "../../components/LoginForm/LoginForm";
import { Helmet } from "react-helmet-async";
import s from "./LoginPage.module.css";

export default function LoginPage() {
    return (
        <div className="s.loginPage">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <LoginForm />
        </div>
    );
}