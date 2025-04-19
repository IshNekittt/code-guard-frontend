import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import s from "./HomePage.module.css";

export default function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
 
        </div>
    );
}