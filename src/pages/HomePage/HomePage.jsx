import { Outlet } from "react-router-dom";
import HeaderWithLogoutModal from "../../components/HeaderWithLogoutModal/HeaderWithLogoutModal";

export default function HomePage() {
  return (
    <div>
      <HeaderWithLogoutModal />
      <Outlet />
    </div>
  );
}
