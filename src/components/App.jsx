import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Layout from "./Layout";
import Loader from "./Loader/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RegistrationPage = lazy(() =>
  import("../components/registerForm/registerForm")
);
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() =>
  import("../pages/DashboardPage/DashboardPage")
);
const HomeTab = lazy(() =>
  import("../components/transactions/TransactionsList")
);
const StatisticsTab = lazy(() =>
  import("./statistics/StatisticsMain/StatisticsMain")
);
const CurrencyTab = lazy(() => import("./Sidebar/ExchangeRates/ExchangeRates"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/auth/operations";
import { selectToken } from "../redux/auth/selectors";
import toast from "react-hot-toast";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo())
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          toast.error("Time is out!");
          navigate("/login");
        });
    }
  }, [token, dispatch]);

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
