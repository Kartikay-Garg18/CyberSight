import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ThreatChart({ alerts }) {
  // Group alerts by threat type
  const threatCounts = alerts.reduce((acc, alert) => {
    const type = alert.threat_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(threatCounts).map(([name, value]) => ({
    name,
    threats: value,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold text-sm mb-1">{payload[0].payload.name}</p>
          <p className="text-violet-400 text-sm font-semibold">
            {payload[0].value} {payload[0].value === 1 ? 'threat' : 'threats'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
          <span className="text-lg">📊</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Threat Distribution</h2>
          <p className="text-xs text-gray-400">By threat type</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" opacity={0.5} />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: '#2a2a3e' }}
          />
          <YAxis
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: '#2a2a3e' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="threats"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
            stroke="#a78bfa"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatChart;
