import React from 'react';
import { Pie } from 'react-chartjs-2';
import css from './Shart.module.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { selectBalanсe } from '../../../redux/auth/selectors';
ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#FF6B6B', '#A18AFF', '#7BDFF2', '#5C7CFA', '#63E6BE', '#38D9A9', '#69DB7C'];

const Chart = ({ statistics }) => {
  const balance = useSelector(selectBalanсe);
  console.log('баланс',balance)
  const total = statistics.reduce((acc, item) => acc + (item.summ || 0), 0);

  const data = {
    labels: statistics.map(item => item.name || ''), 
    datasets: [
      {
        data: statistics.map(item => item.summ),
        backgroundColor: COLORS,
        borderWidth: 0, 
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    tooltip: {
       enabled: false,
      // backgroundColor: '#2e2e5c',
      // titleColor: '#fff',
      // bodyColor: '#fff',
      // bodyFont: { size: 12 },
      // padding: 8,
    },
    legend: {
      display: false,
    },
  },
};


  return (
    <div className={css.chartWrapper}>
      <div className={css.chartSize}>
        <Pie data={data} options={options} />
        
        {total > 0 && (
          <div className={css.chartStyle}>
            ₴ {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;