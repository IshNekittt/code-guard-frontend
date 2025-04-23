import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
