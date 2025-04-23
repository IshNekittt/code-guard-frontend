import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import StatisticsMain from '../../components/StatisticsMain/StatisticsMain';

import styles from './StatisticsPage.module.css';

const StatisticsPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <StatisticsMain />
    </div>
  );
};

export default StatisticsPage;
