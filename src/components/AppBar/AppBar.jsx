import { useSelector } from "react-redux";
import s from "./AppBar.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";


export default function AppBar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header>

           
        </header>
    );
}