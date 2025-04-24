import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeaderWithLogoutModal from "../../components/HeaderWithLogoutModal/HeaderWithLogoutModal";
import styles from './HomePage.module.css';

export default function HomePage() {
    return (
        <div className={styles.logout}>
            {/* <title>Home</title> */}
            <HeaderWithLogoutModal />
        </div>
    );
}
