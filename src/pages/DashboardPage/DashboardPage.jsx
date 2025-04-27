import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar";
import TransactionsList from "../../components/transactions/TransactionsList";
import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { pathname } = useLocation();
  const isBalancePage = pathname === "/home";
  const isExchangeRatesPage = pathname === "/home/exchange-rates";
  const isStatisticsPage = pathname === "/home/statistics";
  return (
    <div className={css.loyat}>
      <div className={css.sideBar}>
        <SideBar />
      </div>
      <div className={css.transactionsContainer}>
        {!(isBalancePage || isExchangeRatesPage || isStatisticsPage) && (
          <Outlet />
        )}
        {/* {!isBalancePage && <Outlet />} */}
        {/* <Outlet /> */}
        <TransactionsList />
      </div>
    </div>
  );
};

export default DashboardPage;
