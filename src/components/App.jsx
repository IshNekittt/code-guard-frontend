import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import { Suspense } from "react";
import RestrictedRoute from "./RestrictedRoute";


export default function App() {
  return (
  <Suspense fallback={null}>
    <Layout>
      <Routes>
        <Route path="/login" element={<RestrictedRoute route={<LoginPage />} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  </Suspense>
  );
}
