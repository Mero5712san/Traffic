import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const laneNames = ["North", "East", "South", "West"];

function AnalyticsChart({ lanesData }) {
  const data = laneNames.map((ln) => ({
    name: ln,
    count: lanesData[ln].count,
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-4 h-full">
      <h4 className="font-semibold mb-3">Traffic Intensity</h4>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsChart;
