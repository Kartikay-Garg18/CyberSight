import React from 'react';
import bellIcon from '../assets/bell.svg';
import checkCircleIcon from '../assets/check-circle.svg';
import globeIcon from '../assets/globe.svg';

const severityConfig = {
  'critical': {
    bg: 'bg-gradient-to-r from-red-900/80 to-red-800/80',
    border: 'border-red-500',
    badge: 'bg-red-500',
    glow: 'shadow-lg shadow-red-500/20'
  },
  'high': {
    bg: 'bg-gradient-to-r from-orange-900/80 to-orange-800/80',
    border: 'border-orange-500',
    badge: 'bg-orange-500',
    glow: 'shadow-lg shadow-orange-500/20'
  },
  'medium': {
    bg: 'bg-gradient-to-r from-yellow-900/80 to-yellow-800/80',
    border: 'border-yellow-500',
    badge: 'bg-yellow-500',
    glow: 'shadow-lg shadow-yellow-500/20'
  },
  'low': {
    bg: 'bg-gradient-to-r from-blue-900/80 to-blue-800/80',
    border: 'border-blue-500',
    badge: 'bg-blue-500',
    glow: 'shadow-lg shadow-blue-500/20'
  },
};

function AlertsFeed({ alerts, onAlertClick }) {
  return (
    <div className="glass-card p-6 h-[600px] overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center glow-cyan float">
            <img src={bellIcon} alt="Bell" className="w-5 h-5 brightness-0 invert" />
          </div>
          <h2 className="text-xl font-bold text-white">Live Alerts Feed</h2>
        </div>
        <div className="text-sm text-gray-400 bg-slate-700/50 px-3 py-1 rounded-full backdrop-blur-md animate-pulse">
          {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'}
        </div>
      </div>
      
      <div className="space-y-3 overflow-y-auto h-[500px] pr-2 scrollbar-thin">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src={checkCircleIcon} alt="Check" className="w-16 h-16 opacity-50" />
            <p className="text-lg mt-4">No alerts detected</p>
            <p className="text-sm">System is monitoring for threats</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = severityConfig[alert.severity?.toLowerCase()] || severityConfig['low'];
            return (
              <div
                key={alert.id}
                onClick={() => onAlertClick(alert)}
                className={`${config.bg} ${config.border} ${config.glow} border-l-4 rounded-lg p-4 cursor-pointer card-hover backdrop-blur-md`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`${config.badge} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                      {alert.severity}
                    </span>
                    <p className="font-bold text-white">{alert.threat_type}</p>
                  </div>
                  <p className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                </div>
                <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                  {alert.description}
                </p>
                <div className="flex items-center space-x-2 text-xs">
                  <img src={globeIcon} alt="Globe" className="w-4 h-4 opacity-60" />
                  <span className="text-gray-400">Source: {alert.source_ip}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AlertsFeed;
