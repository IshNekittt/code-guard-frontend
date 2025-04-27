import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTransactions, addTransaction } from "../../redux/transactionsOp";
import { CATEGORIES } from "../../constants/categories";
import SideBar from "../../components/Sidebar/Sidebar";
import TransactionsList from "../../components/transactions/TransactionsList";
import ButtonAddTransactions from "../../components/transactions/ButtonAddTransactions";
import ModalAddTransaction from "../../components/transactions/ModalAddTransaction";
import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getTransactions());
    setCategories(CATEGORIES);
  }, [dispatch]);

  const handleCreate = async (data) => {
    try {
      dispatch(addTransaction({ ...data, date: data.date.toISOString() }));
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const { pathname } = useLocation();
  const isBalancePage = pathname === "/home";
  const isExchangeRatesPage = pathname === "/home/exchange-rates";
  const isStatisticsPage = pathname === "/home/statistics";

  return (
    <div className={css.layout}>
      <div className={css.sideBar}>
        <SideBar />
      </div>

      <div className={css.transactionsContainer}>
        {/* Вложенные маршруты (Balance, ExchangeRates, Statistics) */}
        {!(isBalancePage || isExchangeRatesPage || isStatisticsPage) && (
          <Outlet />
        )}

        {/* Кнопка и модалка добавления транзакции */}
        <ButtonAddTransactions
          onClick={() => {
            console.log("Кнопка нажата"); setModalOpen(true);
          }}
        />
        <ModalAddTransaction
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          categories={categories}
          onCreate={handleCreate}
        />

        {/* Список транзакций */}
        <TransactionsList />
      </div>
    </div>
  );
};

export default DashboardPage;
