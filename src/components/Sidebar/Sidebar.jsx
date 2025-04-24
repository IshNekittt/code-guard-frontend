import s from './SideBar.module.css';
import Navigation from './Navigation/Navigation';
import Balance from './Balance/Balance';
import ExchangeRates from './ExchangeRates/ExchangeRates';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StatisticsTest from './StatisticsTest';

const SideBar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  const isMobile = width < 768;
  const showStatistics = pathname.includes('statistics');

  return (
    <div className={s.sidebar_container}>

      <div className={s.sidebar}>
        <div className={s.balance_content}>
          <Navigation />
          {(isTablet || isDesktop) && <Balance />}
          {isMobile && <Outlet />}
        </div>

        {(isTablet || isDesktop) && <ExchangeRates />}
      </div>

 
      {(isTablet || isDesktop) && showStatistics && (
        <div
          className={
            isTablet
              ? s.statistics_tablet
              : isDesktop
              ? s.statistics_desktop
              : s.statistics_hidden
          }
        >
          <StatisticsTest />
        </div>
      )}
    </div>
  );
};

export default SideBar;
