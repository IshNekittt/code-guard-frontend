// src/components/StatisticsDashboard.jsx
import React from 'react';

const StatisticsDashboard = ({ stats }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Dashboard</h2>
      {stats ? (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      ) : (
        <p>Нет данных</p>
      )}
    </div>
  );
};

export default StatisticsDashboard;
