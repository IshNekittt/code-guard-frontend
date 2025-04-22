import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";

export default function Layout() {
    return (
        <div>
            <AppBar />
            <Outlet />
        </div>
    );
}
