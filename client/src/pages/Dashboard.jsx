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
    const socket = io('https://cybersight.onrender.com');

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
    <div className="min-h-screen bg-[#0f0f1e]">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] border-b border-[#2a2a3e] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-sm text-gray-400 mt-1">Real-time threat monitoring and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#16213e] px-4 py-2 rounded-lg border border-[#2a2a3e]">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Row - Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6 hover:border-red-500/50 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Critical</span>
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                <span className="text-xl">🔴</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-4xl font-bold text-red-400">{stats.critical}</h3>
              <span className="text-sm text-gray-500">threats</span>
            </div>
            <div className="mt-4 h-1 bg-[#2a2a3e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${(() => {
                    const total = stats.critical + stats.high + stats.medium + stats.low;
                    return total > 0 ? Math.min((stats.critical / total) * 100, 100) : 0;
                  })()}%` 
                }}
              ></div>
            </div>
          </div>

          <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6 hover:border-orange-500/50 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">High</span>
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                <span className="text-xl">🟠</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-4xl font-bold text-orange-400">{stats.high}</h3>
              <span className="text-sm text-gray-500">threats</span>
            </div>
            <div className="mt-4 h-1 bg-[#2a2a3e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${(() => {
                    const total = stats.critical + stats.high + stats.medium + stats.low;
                    return total > 0 ? Math.min((stats.high / total) * 100, 100) : 0;
                  })()}%` 
                }}
              ></div>
            </div>
          </div>

          <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6 hover:border-yellow-500/50 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Medium</span>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                <span className="text-xl">🟡</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-4xl font-bold text-yellow-400">{stats.medium}</h3>
              <span className="text-sm text-gray-500">threats</span>
            </div>
            <div className="mt-4 h-1 bg-[#2a2a3e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${(() => {
                    const total = stats.critical + stats.high + stats.medium + stats.low;
                    return total > 0 ? Math.min((stats.medium / total) * 100, 100) : 0;
                  })()}%` 
                }}
              ></div>
            </div>
          </div>

          <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6 hover:border-blue-500/50 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Low</span>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <span className="text-xl">🔵</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-4xl font-bold text-blue-400">{stats.low}</h3>
              <span className="text-sm text-gray-500">threats</span>
            </div>
            <div className="mt-4 h-1 bg-[#2a2a3e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${(() => {
                    const total = stats.critical + stats.high + stats.medium + stats.low;
                    return total > 0 ? Math.min((stats.low / total) * 100, 100) : 0;
                  })()}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Alerts Feed */}
          <div className="lg:col-span-7 space-y-6">
            <AlertsFeed alerts={alerts} onAlertClick={setSelectedAlert} />
          </div>

          {/* Right Column - Chart and AI Analysis */}
          <div className="lg:col-span-5 space-y-6">
            <ThreatChart alerts={alerts} />
            <AiSummaryCard alert={selectedAlert} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
