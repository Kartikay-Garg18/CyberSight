import React from 'react';
import lightbulbIcon from '../assets/lightbulb.svg';
import infoIcon from '../assets/info.svg';

const severityConfig = {
  'critical': { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' },
  'high': { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/50' },
  'medium': { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' },
  'low': { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/50' },
};

function AiSummaryCard({ alert }) {
  if (!alert) {
    return (
      <div className="glass-card p-6 sticky top-24">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center glow-green">
            <img src={lightbulbIcon} alt="Lightbulb" className="w-5 h-5 brightness-0 invert" />
          </div>
          <h2 className="text-xl font-bold text-white">AI Analysis</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
            <img src={infoIcon} alt="Info" className="w-10 h-10 opacity-60" />
          </div>
          <p className="text-gray-400 mb-2">No alert selected</p>
          <p className="text-sm text-gray-500">Select an alert to see the AI-powered analysis</p>
        </div>
      </div>
    );
  }

  const config = severityConfig[alert.severity?.toLowerCase()] || severityConfig['low'];

  return (
    <div className="glass-card p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center glow-green float">
          <img src={lightbulbIcon} alt="Lightbulb" className="w-5 h-5 brightness-0 invert" />
        </div>
        <h2 className="text-xl font-bold text-white">AI Analysis</h2>
      </div>
      
      <div className="space-y-5">
        <div className={`${config.bg} ${config.border} border rounded-lg p-4 transition-transform hover:scale-105`}>
          <p className="text-xs text-gray-400 mb-1">Severity Level</p>
          <p className={`text-2xl font-bold ${config.color} uppercase`}>{alert.severity}</p>
        </div>

        <div className="border border-slate-600/50 rounded-lg p-4 bg-slate-800/30">
          <p className="text-xs text-gray-400 mb-1">Threat Type</p>
          <p className="text-white font-semibold">{alert.threat_type}</p>
        </div>

        <div className="border border-slate-600/50 rounded-lg p-4 bg-slate-800/30">
          <p className="text-xs text-gray-400 mb-2">Description</p>
          <p className="text-sm text-gray-300 leading-relaxed">{alert.description}</p>
        </div>

        <div className="border border-slate-600/50 rounded-lg p-4 bg-slate-800/30">
          <p className="text-xs text-gray-400 mb-1">Source IP</p>
          <p className="text-white font-mono text-sm">{alert.source_ip}</p>
        </div>

        <div className="border border-slate-600/50 rounded-lg p-4 bg-slate-800/30">
          <p className="text-xs text-gray-400 mb-1">Detected At</p>
          <p className="text-white text-sm">{new Date(alert.timestamp).toLocaleString()}</p>
        </div>

        {alert.ai_reason && (
          <div className="border border-emerald-500/30 rounded-lg p-4 bg-emerald-500/5">
            <p className="text-xs text-emerald-400 mb-2 flex items-center space-x-1">
              <span>🤖</span>
              <span>AI Reasoning</span>
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{alert.ai_reason}</p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-700">
          <p className="text-xs text-gray-500 text-center">
            Powered by Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default AiSummaryCard;
