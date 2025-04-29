import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar";
import css from "./DashboardPage.module.css";
import HeaderWithLogoutModal from "../../components/HeaderWithLogoutModal/HeaderWithLogoutModal";

const DashboardPage = () => {
  return (
    <div className={css.layout}>
      <div className={css.wrapper}>
        <div>
          <HeaderWithLogoutModal />
        </div>
        <div className={css.sideBarAndTransaction}>
          <div className={css.sideBar}>
            <SideBar />
          </div>
          <div className={css.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
