import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}


