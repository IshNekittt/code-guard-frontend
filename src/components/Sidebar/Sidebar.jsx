import s from './SideBar.module.css';
import Navigation from './Navigation/Navigation';
import Balance from './Balance/Balance';
import ExchangeRates from './ExchangeRates/ExchangeRates';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StatisticsTest from './StatisticsTest';

const SideBar = () => {
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(window.innerWidth >= 768);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={s.sidebar}>
  <div className={s.balance_content}>
    <Navigation />
    {isTabletOrDesktop && <Balance />}
    {!isTabletOrDesktop && <Outlet />}
  </div>
  {isTabletOrDesktop && <ExchangeRates />}
  
  {isTabletOrDesktop && pathname.includes('statistics') && <StatisticsTest />}
</div>

  );
};

export default SideBar;
