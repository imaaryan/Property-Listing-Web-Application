import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceTrendGraph = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            tickFormatter={(value) => {
              if (value >= 10000000)
                return (value / 10000000).toFixed(2) + "Cr";
              if (value >= 100000) return (value / 100000).toFixed(2) + "L";
              return value;
            }}
          />
          <Tooltip
            formatter={(value) => [
              `₹${value.toLocaleString("en-IN")}`,
              "Price",
            ]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#1244e3"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendGraph;
