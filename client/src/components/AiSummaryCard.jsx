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
      <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6 sticky top-24">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#2a2a3e]">
          <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
            <img src={lightbulbIcon} alt="Lightbulb" className="w-5 h-5 brightness-0 invert opacity-80" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">AI Analysis</h2>
            <p className="text-xs text-gray-400">Gemini AI</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-[#1a1a2e] rounded-xl flex items-center justify-center mb-4 border border-[#2a2a3e]">
            <img src={infoIcon} alt="Info" className="w-10 h-10 opacity-50" />
          </div>
          <p className="text-gray-300 mb-2 font-semibold">No alert selected</p>
          <p className="text-sm text-gray-500 max-w-xs">Select an alert to view AI analysis</p>
        </div>
      </div>
    );
  }

  const config = severityConfig[alert.severity?.toLowerCase()] || severityConfig['low'];

  return (
    <div className="bg-[#16213e] border border-[#2a2a3e] rounded-xl p-6 sticky top-24">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#2a2a3e]">
        <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
          <img src={lightbulbIcon} alt="Lightbulb" className="w-5 h-5 brightness-0 invert opacity-80" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">AI Analysis</h2>
          <p className="text-xs text-gray-400">Gemini AI</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className={`${config.bg} ${config.border} border rounded-lg p-4`}>
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">Severity</p>
          <p className={`text-2xl font-bold ${config.color} uppercase`}>{alert.severity}</p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">Threat Type</p>
          <p className="text-white font-semibold">{alert.threat_type}</p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">Description</p>
          <p className="text-sm text-gray-300 leading-relaxed">{alert.description}</p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">Source IP</p>
          <p className="text-white font-mono text-sm bg-[#0f0f1e] px-3 py-2 rounded border border-[#2a2a3e]">{alert.source_ip}</p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">Detected At</p>
          <p className="text-white text-sm font-mono bg-[#0f0f1e] px-3 py-2 rounded border border-[#2a2a3e]">{new Date(alert.timestamp).toLocaleString()}</p>
        </div>

        {alert.ai_reason && (
          <div className="bg-[#1a1a2e] border border-violet-500/30 rounded-lg p-4">
            <p className="text-xs text-violet-400 mb-3 flex items-center space-x-2 font-semibold uppercase">
              <span>🤖</span>
              <span>AI Reasoning</span>
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{alert.ai_reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiSummaryCard;
