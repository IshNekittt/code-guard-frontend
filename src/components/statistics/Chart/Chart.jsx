
import React from 'react';
import { Pie } from 'react-chartjs-2';
import css from './Shart.module.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#FF6B6B', '#A18AFF', '#7BDFF2', '#5C7CFA', '#63E6BE', '#38D9A9', '#69DB7C'];

const Chart = ({ statistics }) => {
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
      backgroundColor: '#2e2e5c',
      titleColor: '#fff',
      bodyColor: '#fff',
      bodyFont: { size: 12 },
      padding: 8,
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
        {/* Центрированный текст сверху круга */}
        {total > 0 && (
          <div className={css.chartStyle}>
            ₹ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;

// import React from 'react';
// import css from './Shart.module.css';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const COLORS = ['#FF6B6B', '#A18AFF', '#7BDFF2', '#5C7CFA', '#63E6BE', '#38D9A9', '#69DB7C'];

// const Chart = ({statistics} ) => {
//   console.log("что приходит",statistics)
//   const total = statistics.reduce((acc, item) => acc + (item.summ || 0), 0);

  
//   const screenWidth = window.innerWidth;
//   const outerRadius = screenWidth <= 480 ? 100 : screenWidth <= 768 ? 60 : 110;
//   const innerRadius = outerRadius - 30;

//   const renderCenterLabel = () => {
//     if (!total) return null;
//     return (
//       <text
//         x="50%"
//         y="50%"
//         textAnchor="middle"
//         dominantBaseline="middle"
//         fill="#fff"
//         fontSize={screenWidth <= 480 ? 12 : 14}
//         fontWeight="bold"
//         labelLine={false}
//         isAnimationActive={true}
//          strokeWidth={0}   
//         //  stroke="none" 
//       >
//         ₹ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//       </text>
//     );
//   };

//   return (
//     <div className={css.chartWrapper}>
//       <ResponsiveContainer width="100%" height={screenWidth <= 480 ? 220 : 280}>
//         <PieChart>
//           <Pie
//             data={statistics}
//             cx="50%"
//             cy="50%"
//             outerRadius={outerRadius}
//             innerRadius={innerRadius}
//             fill="#8884d8"
//             dataKey="summ"
//             labelLine={false}
//             isAnimationActive={true}
//           >
//             {statistics.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//             {renderCenterLabel()}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: '#2e2e5c',
//               border: 'none',
//               color: 'white',
//               fontSize: '12px',
//               padding: '4px 8px',
//             }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Chart;
