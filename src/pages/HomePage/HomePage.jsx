import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeaderWithLogoutModal from "../../components/HeaderWithLogoutModal/HeaderWithLogoutModal";


export default function HomePage() {
    return (
        <div>
            <title>Home</title>
            <HeaderWithLogoutModal />
        </div>
    );
}
