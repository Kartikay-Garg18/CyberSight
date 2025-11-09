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
    <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl overflow-hidden h-[700px] flex flex-col">
      <div className="px-6 py-4 border-b border-[#2a2a3e] bg-[#1a1a2e]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
              <img src={bellIcon} alt="Bell" className="w-5 h-5 brightness-0 invert opacity-80" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Alerts Feed</h2>
              <p className="text-xs text-gray-400">Real-time threat notifications</p>
            </div>
          </div>
          <div className="bg-[#0f0f1e] px-3 py-1.5 rounded-lg border border-[#2a2a3e]">
            <span className="text-sm font-semibold text-gray-300">{alerts.length}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 bg-[#1a1a2e] rounded-xl flex items-center justify-center mb-4 border border-[#2a2a3e]">
              <img src={checkCircleIcon} alt="Check" className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg font-semibold text-gray-400">No alerts detected</p>
            <p className="text-sm text-gray-500">System is monitoring for threats</p>
          </div>
        ) : (
          alerts.map((alert, index) => {
            const config = severityConfig[alert.severity?.toLowerCase()] || severityConfig['low'];
            const severityColors = {
              'critical': 'border-red-500/50 bg-red-500/5',
              'high': 'border-orange-500/50 bg-orange-500/5',
              'medium': 'border-yellow-500/50 bg-yellow-500/5',
              'low': 'border-blue-500/50 bg-blue-500/5',
            };
            const colorClass = severityColors[alert.severity?.toLowerCase()] || severityColors['low'];
            
            return (
              <div
                key={alert.id}
                onClick={() => onAlertClick(alert)}
                className={`bg-[#1a1a2e] border-l-4 ${colorClass} border border-[#2a2a3e] rounded-lg p-4 cursor-pointer hover:bg-[#1f1f35] transition-all group`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`${config.badge} text-white text-xs font-bold px-2.5 py-1 rounded uppercase`}>
                      {alert.severity}
                    </span>
                    <p className="font-bold text-white text-sm">{alert.threat_type}</p>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                </div>
                <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                  {alert.description}
                </p>
                <div className="flex items-center space-x-2 text-xs">
                  <img src={globeIcon} alt="Globe" className="w-4 h-4 opacity-60" />
                  <span className="text-gray-400 font-mono">{alert.source_ip}</span>
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
