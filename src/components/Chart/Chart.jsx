
// import React from 'react';
// import css from './Chart.module.css';


// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// const COLORS = ['#FF6B6B', '#A18AFF', '#7BDFF2', '#5C7CFA', '#63E6BE', '#38D9A9', '#69DB7C'];

// const Chart = ({ data = [] }) => {
//     const total = data.reduce((acc, item) => acc +  (item.amount || 0), 0);

//   const renderCenterLabel = () => {
//     if (!total) return null;
//     return (
//       <text
//         x="50%"
//         y="50%"
//         textAnchor="middle"
//         dominantBaseline="middle"
//         fill="#fff"
//         fontSize={18}
//         fontWeight="bold"
//       >
//         ₹ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//       </text>
//     );
//   };
//    return (
//     <div className={css.selectWrapper}>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//              data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             innerRadius={60}
//             fill="#8884d8"
//              dataKey="amount"
//               labelLine={false}
//             isAnimationActive={true}
//           >
//             {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//                {renderCenterLabel()}
//           </Pie>
//            <Tooltip   contentStyle={{ backgroundColor: '#2e2e5c', border: 'none', color: 'white' }}
//            />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Chart;
import React from 'react';
import css from './Chart.module.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF6B6B', '#A18AFF', '#7BDFF2', '#5C7CFA', '#63E6BE', '#38D9A9', '#69DB7C'];

const Chart = ({statistics} ) => {
  console.log("что приходит",statistics)
  const total = statistics.reduce((acc, item) => acc + (item.summ || 0), 0);

  // определим радиусы в зависимости от ширины экрана
  const screenWidth = window.innerWidth;
  const outerRadius = screenWidth <= 480 ? 100 : screenWidth <= 768 ? 80 : 110;
  const innerRadius = outerRadius - 30;

  const renderCenterLabel = () => {
    if (!total) return null;
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={screenWidth <= 480 ? 12 : 14}
        fontWeight="bold"
      >
        ₹ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </text>
    );
  };

  return (
    <div className={css.chartWrapper}>
      <ResponsiveContainer width="100%" height={screenWidth <= 480 ? 220 : 280}>
        <PieChart>
          <Pie
            data={statistics}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="summ"
            labelLine={false}
            isAnimationActive={true}
          >
            {statistics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            {renderCenterLabel()}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#2e2e5c',
              border: 'none',
              color: 'white',
              fontSize: '12px',
              padding: '4px 8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
