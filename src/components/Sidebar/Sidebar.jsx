import s from './SideBar.module.css';
import Navigation from './Navigation/Navigation';
import Chart from './Chart/Chart';
import ExchangeRates from './ExchangeRates/ExchangeRates';
import Balance from './Balance/Balance';


const SideBar = () => {
  return (
    <div className={s.sidebar}> 
   <div className={s.balance_content}>
      <Navigation/>
        <Balance />
   </div>
      <ExchangeRates />
    </div>
  );
};

export default SideBar;
