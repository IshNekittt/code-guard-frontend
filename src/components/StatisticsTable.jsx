// src/components/StatisticsTable.jsx
import React from 'react';

const StatisticsTable = ({ data }) => {
  return (
    <div>
      <h2>Таблица статистики</h2>
      {data && data.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc' }}>Месяц</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Значение</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.month}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет данных для отображения</p>
      )}
    </div>
  );
};

export default StatisticsTable;
