import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
