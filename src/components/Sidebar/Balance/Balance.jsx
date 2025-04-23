import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalBalance } from '../../../redux/financeSlice';
import s from './Balance.module.css';


const Balance = () => {
  const dispatch = useDispatch();
  const totalBalance = useSelector(state => state.finance.totalBalance);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get('/api/sidebar/balance');
        dispatch(setTotalBalance(res.data.balance));
      } catch (error) {
        console.error('Error loading balance:', error);

      }
    };

    fetchBalance();
  }, [dispatch]);

  return (
    <section className={s.balance}>
      <p className={s.label}>Your balance</p>
      <p className={s.amount}><span className={s.amount_symbol}>₴</span> {totalBalance?.toFixed(2) ?? '0.00'}</p>
    </section>
  );
};


export default Balance;