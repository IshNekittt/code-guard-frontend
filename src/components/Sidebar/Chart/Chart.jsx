import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import s from './Chart.module.css';

const Chart = () => {
  const [data, setData] = useState([]);

  // 🔹 Тимчасові дані (заглушка)
  const testData = [
    { currency: 'USD', value: 27.55 },
    { currency: 'EUR', value: 30.00 },
    { currency: 'PLN', value: 28.2 },
    { currency: 'CHF', value: 29.1 },
    { currency: 'GBP', value: 31.3 },
  ];
  

  useEffect(() => {
    // 🔹 Використовуємо тестові дані
    setData(testData);

    // 🔸 Коли бекенд готовий — підключити:
    /*
    axios
      .get('/sidebar/chart')
      .then(res => setData(res.data.points))
      .catch(err => console.error('Chart fetch error:', err));
    */
  }, []);

  return (
    <div className={s.chart}>
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
              <stop offset="37.49%" stopColor="#ffffff" stopOpacity={0.54} />
              <stop offset="60.91%" stopColor="#ffffff" stopOpacity={0.27} />
              <stop offset="76.6%" stopColor="#ffffff" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />

          <Area
  type="basis"
  dataKey="value"
  stroke="#ff868d"
  strokeWidth={1}
  fill="url(#colorValue)"
  dot={{ r: 4, fill: '#ff868d' }}
  activeDot={{ r: 6 }}
  isAnimationActive={true}
/>
<Tooltip
  contentStyle={{ background: 'transparent', border: 'none', color: '#fff' }}
  cursor={false}
/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
