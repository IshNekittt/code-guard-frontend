import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import Sidebar from './Sidebar/Sidebar';
import ExchangeRates from './Sidebar/ExchangeRates/ExchangeRates';
import Balance from './Sidebar/Balance/Balance';
import Statistics from './Sidebar/StatisticsTest';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/home" element={<HomePage />}>
  <Route element={<Sidebar />}>
    <Route index element={<Balance />} />
    <Route path="exchange-rates" element={<ExchangeRates />} />
    <Route path="statistics" element={<Statistics />} /> 
  </Route>
</Route>


      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
