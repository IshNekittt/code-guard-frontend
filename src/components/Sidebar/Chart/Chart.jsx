import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import s from "./Chart.module.css";

const Chart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/sidebar/chart")
      .then((res) => {
        const points = res.data.points;

        if (points.length !== 0) {
          const newData = points.map((point, index) => {
            if (index === 0) {
              return [
                {
                  value: point.value * 0.75,
                  label: "Helper 1 Start",
                },
                {
                  value: point.value,
                  label: point.currency || `Point ${index + 1}`,
                },
                {
                  value: point.value * 0.6,
                  label: "Helper 1 End",
                },
              ];
            } else if (index === 1) {
              return [
                {
                  value: point.value,
                  label: point.currency || `Point ${index + 1}`,
                },
                {
                  value: point.value * 0.75,
                  label: "Helper 2 Start",
                },
              ];
            } else {
              return [];
            }
          });

          setData(newData.flat());
        }
      })
      .catch((err) => console.error("Chart fetch error:", err));
  }, []);

  return (
    <div className={s.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
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
            type="monotone"
            dataKey="value"
            stroke="#ff868d"
            strokeWidth={1}
            fill="url(#colorValue)"
            dot={(props) =>
              props.index === 1 || props.index === 3 ? (
                <circle
                  key={props.index}
                  cx={props.cx}
                  cy={props.cy}
                  r={4}
                  fill="#ff868d"
                />
              ) : null
            }
            activeDot={false}
            isAnimationActive={true}
          />
          <Tooltip
            contentStyle={{
              display: "none",
            }}
            cursor={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
