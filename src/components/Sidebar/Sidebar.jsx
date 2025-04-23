import React from 'react';
import styles from './Sidebar.module.css';
import { FaHome, FaChartPie } from 'react-icons/fa';
//import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
 
} from 'recharts';

 const data = [
  { name: 'USD', value: 27.5 },
  { name: 'EUR', value: 30.0 },
  { name: 'GBP', value: 24.8 },
  { name: 'CHF', value: 29.3 },
  { name: 'JPY', value: 22.7 }
];


const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <div className={`${styles.menuItem} ${styles.active}`}>
          <FaHome className={styles.icon} />
          <span>Home</span>
        </div>
        <div className={styles.menuItem}>
          <FaChartPie className={styles.icon} />
          <span>Statistics</span>
        </div>
      </div>

      <div className={styles.balanceCard}>
        <span className={styles.balanceLabel}>Your Balance</span>
        <div className={styles.balanceValue}>₹ 24 000.00</div>
      </div>

      <div className={styles.currencySection}>
        <div className={styles.currencyHeader}>
          <span>Currency</span>
          <span>Purchase</span>
          <span>Sale</span>
        </div>

        <div className={styles.currencyRow}>
          <span>USD</span>
          <span>27.55</span>
          <span>27.65</span>
        </div>

        <div className={styles.currencyRow}>
          <span>EUR</span>
          <span>30.00</span>
          <span>30.10</span>
        </div>
 <div style={{ width: '100%', height: 300, background: '#1e1e3f', borderRadius: '16px', padding: '1rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F38181" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#F38181" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#F38181"
            fill="url(#colorValue)"
            strokeWidth={3}
            dot={{ r: 5, fill: '#F38181', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
      </div>
    </div>
  );
};

export default Sidebar;




// import React from 'react';
// import { Home, BarChart2, Settings } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <div className="bg-[#1e1e3f] text-white w-60 min-h-screen flex flex-col items-center py-10 space-y-10 shadow-xl">
//       <div className="text-2xl font-bold">💰 MoneyGuard</div>

//       <nav className="flex flex-col gap-6 text-lg">
//         <div className="flex items-center gap-3 cursor-pointer hover:text-[#a18aff]">
//           <Home size={20} />
//           Dashboard
//         </div>
//         <div className="flex items-center gap-3 cursor-pointer hover:text-[#a18aff]">
//           <BarChart2 size={20} />
//           Statistics
//         </div>
//         <div className="flex items-center gap-3 cursor-pointer hover:text-[#a18aff]">
//           <Settings size={20} />
//           Settings
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
