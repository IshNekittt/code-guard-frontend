import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import css from "./Chart.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Зарегистрируем компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Здесь нужно либо скопировать ваш объект categoryColors,
// либо импортировать его из родительского модуля
const categoryColors = {
  "Main expenses": "#FED057",
  Products: "#FFD8D0",
  Car: "#FD9498",
  "Self care": "#C5BAFF",
  "Child care": "#6E78E8",
  "Household products": "#4A56E2",
  Education: "#81E1FF",
  Leisure: "#24CCA7",
  "Other expenses": "#00AD84",
  Entertainment: "#69DB7C",
};

const Chart = ({ statistics }) => {
  const [balance, setBalance] = useState(0);

  // Создаём массив лейблов и данных
  const labels = statistics.map((item) => item.category);
  const dataValues = statistics.map((item) => item.summ);

  // Мапим цвета так, чтобы индексы совпадали
  const backgroundColor = statistics.map(
    (item) => categoryColors[item.category] || "#ccc"
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get("/sidebar/balance");
        setBalance(res.data.balance || 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(0);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className={css.chartWrapper}>
      <div className={css.chartSize}>
        <Pie data={data} options={options} />
        {balance > 0 && (
          <div className={css.chartStyle}>
            ₴ {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
