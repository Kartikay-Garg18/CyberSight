import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';
import AlertsFeed from '../components/AlertsFeed';
import ThreatChart from '../components/ThreatChart';
import AiSummaryCard from '../components/AiSummaryCard';

function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [stats, setStats] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  useEffect(() => {
    // Fetch initial alerts
    api.get('/alerts')
      .then(res => {
        setAlerts(res.data);
        calculateStats(res.data);
      })
      .catch(err => console.error('Error fetching alerts:', err));

    // Connect to Socket.IO
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('new-alert', (alert) => {
      console.log('New alert received:', alert);
      setAlerts(prev => {
        const updatedAlerts = [alert, ...prev];
        calculateStats(updatedAlerts);
        return updatedAlerts;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const calculateStats = (alertsList) => {
    const newStats = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    alertsList.forEach(alert => {
      const severity = alert.severity?.toLowerCase();
      if (severity in newStats) {
        newStats[severity]++;
      }
    });

    setStats(newStats);
  };

  return (
    <div className="p-6 cyber-grid min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 card-hover glow-red">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">Critical Threats</p>
              <h3 className="text-3xl font-bold text-red-500">{stats.critical}</h3>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔴</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 card-hover glow-orange-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">High Priority</p>
              <h3 className="text-3xl font-bold text-orange-500">{stats.high}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🟠</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 card-hover shadow-lg shadow-yellow-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">Medium Risk</p>
              <h3 className="text-3xl font-bold text-yellow-500">{stats.medium}</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🟡</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 card-hover glow-blue">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">Low Risk</p>
              <h3 className="text-3xl font-bold text-blue-500">{stats.low}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔵</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AlertsFeed alerts={alerts} onAlertClick={setSelectedAlert} />
          <ThreatChart alerts={alerts} />
        </div>
        <div>
          <AiSummaryCard alert={selectedAlert} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
