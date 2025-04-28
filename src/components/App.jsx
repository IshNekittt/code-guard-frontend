import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";

import Layout from "./Layout";
import RegistrationPage from "../components/registerForm/registerForm";
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import HomeTab from "../components/transactions/TransactionsList";
import StatisticsTab from "./statistics/StatisticsMain/StatisticsMain";
import CurrencyTab from "./Sidebar/ExchangeRates/ExchangeRates";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Loader from "./Loader/Loader";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Loader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="home" />} />
            <Route
              path="home"
              element={
                <PrivateRoute>
                  <HomeTab />
                </PrivateRoute>
              }
            />
            <Route
              path="statistics"
              element={
                <PrivateRoute>
                  <StatisticsTab />
                </PrivateRoute>
              }
            />
            <Route
              path="currency"
              element={
                <PrivateRoute>
                  <CurrencyTab />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
