import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import Sidebar from "./Sidebar/Sidebar";
import ExchangeRates from "./Sidebar/ExchangeRates/ExchangeRates";
import Balance from "./Sidebar/Balance/Balance";
//import Statistics from "./Sidebar/StatisticsTest";
import Statistics from "../pages/statisticsPage/StatisticsPage";


import Layout from "./Layout";
import { Suspense } from "react";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

export default function App() {
  return (
    <Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/home" element={<HomePage />}>
            <Route element={<DashboardPage />}>
              <Route index element={<Balance />} />
              <Route path="exchange-rates" element={<ExchangeRates />} />
              <Route path="statistics" element={<Statistics/>} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

// import { useEffect, useState } from "react";
// import { getTransactions, addTransaction } from "../redux/transactionsOp";
// import TransactionsList from "./transactions/TransactionsList";
// import { useDispatch } from "react-redux";
// import ButtonAddTransactions from "./transactions/ButtonAddTransactions";
// import ModalAddTransaction from "./transactions/ModalAddTransaction";
// import { CATEGORIES } from "../constants/categories";

// export default function App() {
//   const dispatch = useDispatch();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const API_URL = import.meta.env.VITE_API_URL;
//   useEffect(() => {
//     dispatch(getTransactions());
//     setCategories(CATEGORIES);
//     /*fetch(`${API_URL}/categories`)
//       .then((r) => r.json())
//       .then(setCategories);*/
//   }, [dispatch]);
//   const handleCreate = async (data) => {
//     try {
//       dispatch(addTransaction({ ...data, date: data.date.toISOString() }));
//       setModalOpen(false);
//     } catch (err) {}
//   };

//   return (
//     <>
//       <TransactionsList />

//       <ButtonAddTransactions onClick={() => setModalOpen(true)} />

//       <ModalAddTransaction
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         categories={categories}
//         onCreate={handleCreate}
//       />
//     </>

//   );
// }
