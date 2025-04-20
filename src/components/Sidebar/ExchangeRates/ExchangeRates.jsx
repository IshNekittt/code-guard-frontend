import s from './ExchangeRates.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../Chart/Chart';

const STORAGE_KEY = 'monobank_rates';

// 🔹 Тимчасові фейкові дані (поки бек не готовий)
const USE_FAKE_DATA = true;

const ExchangeRates = () => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      const now = Date.now();

      // 🔹 Якщо включений режим фейкових даних — показати заглушку
      if (USE_FAKE_DATA) {
        const fakeData = {
          USD: { purchase: 27.55, sale: 27.65 },
          EUR: { purchase: 30.0, sale: 30.1 },
        };
        setRates(fakeData);
        return;
      }

      const cached = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (cached && now - cached.timestamp < 60 * 60 * 1000) {
        setRates(cached.data);
        return;
      }

      try {
        const { data } = await axios.get('/api/sidebar/exchange-rates');
        if (data && typeof data === 'object') {
          setRates(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: now, data }));
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    fetchRates();
  }, []);

  const formatRate = (value) => (typeof value === 'number' ? value.toFixed(2) : '-');

  return (
    <section className={s.rates}>
      <div className={s.header}>
        <span>Currency</span>
        <span>Purchase</span>
        <span>Sale</span>
      </div>

      {rates ? (
        Object.entries(rates).map(([currency, rate]) => (
          <div className={s.row} key={currency}>
            <span>{currency}</span>
            <span>{formatRate(rate.purchase)}</span>
            <span>{formatRate(rate.sale)}</span>
          </div>
        ))
      ) : (
        <div className={s.row_content}>
          <div className={s.row}>
            <span>USD</span>
            <span>-</span>
            <span>-</span>
          </div>
          <div className={s.row}>
            <span>EUR</span>
            <span>-</span>
            <span>-</span>
          </div>
        </div>
      )}
      <Chart/>
    </section>
  );
};

export default ExchangeRates;
