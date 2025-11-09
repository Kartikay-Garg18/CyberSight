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
        <div className="glass-card p-3 border border-cyan-500/30">
          <p className="text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-cyan-400 text-sm">{payload[0].value} threats</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <span>📊</span>
        <span>Threat Distribution</span>
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="threats"
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatChart;
