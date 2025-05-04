import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar";
import css from "./DashboardPage.module.css";
import HeaderWithLogoutModal from "../../components/HeaderWithLogoutModal/HeaderWithLogoutModal";
import { useState } from "react";

const DashboardPage = () => {
  const [balance, setBalance] = useState(0);

  return (
    <div className={css.layout}>
      <div className={css.wrapper}>
        <div>
          <HeaderWithLogoutModal />
        </div>
        <div className={css.sideBarAndTransaction}>
          <div className={css.sideBar}>
            <SideBar balance={balance} setBalance={setBalance} />
          </div>
          <div className={css.content}>
            <Outlet context={{ balance, setBalance }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
