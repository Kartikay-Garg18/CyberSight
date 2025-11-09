import Dashboard from './pages/Dashboard';
import shieldIcon from './assets/shield.svg';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f1e] text-gray-100 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#1a1a2e] border-r border-[#2a2a3e] flex-col fixed h-screen z-50">
        <div className="p-6 border-b border-[#2a2a3e]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <img src={shieldIcon} alt="Shield" className="w-7 h-7 brightness-0 invert" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CyberSight</h1>
              <p className="text-xs text-gray-400">Threat Intelligence</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-300">Live Monitoring</span>
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-[#2a2a3e]">
          <div className="bg-[#16213e] rounded-lg p-4 border border-[#2a2a3e]">
            <p className="text-xs text-gray-400 mb-2">System Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">Operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 bg-[#0f0f1e]">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

