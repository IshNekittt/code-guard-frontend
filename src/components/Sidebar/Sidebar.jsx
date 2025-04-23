import s from './SideBar.module.css';
import Navigation from './Navigation/Navigation';
import ExchangeRates from './ExchangeRates/ExchangeRates';
import Balance from './Balance/Balance';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SideBar = () => {
  const { pathname } = useLocation();
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showBalance = isTabletOrDesktop || pathname === '/home';
  const showStatistics = isTabletOrDesktop || pathname === '/statistics' || pathname === '/home';
  const showExchangeRates = isTabletOrDesktop || pathname === '/exchange-rates';

  return (

      <div className={s.sidebar}>
        <div className={s.balance_content}>
          <Navigation />
          {showBalance && <Balance />}
        </div>
  
        {showStatistics && (
          <div className={s.placeholder}>
            Statistics section TEST
          </div>
        )}
  
        {showExchangeRates && <ExchangeRates />}
      </div>
 
  );
};

export default SideBar;
