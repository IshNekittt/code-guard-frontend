import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import HeaderWithLogoutModal from "../../components/HeaderWithLogoutModal/HeaderWithLogoutModal";
import css from "./HomePage.module.css";
import TransactionsList from "../../components/transactions/TransactionsList";

export default function HomePage() {
  return (
    <div>
      <HeaderWithLogoutModal />
      <Outlet />
      {/* <TransactionsList /> */}
    </div>
  );
}
