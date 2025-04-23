import s from './SideBar.module.css';
import Navigation from './Navigation/Navigation';
import Chart from './Chart/Chart';
import ExchangeRates from './ExchangeRates/ExchangeRates';
import Balance from './Balance/Balance';


const SideBar = () => {
  return (
    <div className={s.sidebar}> 
    <Navigation/>
      <Balance />
      <ExchangeRates />
    </div>
  );
};

export default SideBar;
