import Dashboard from './pages/Dashboard';
import shieldIcon from './assets/shield.svg';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100">
      <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-cyan-500/20 shadow-xl backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center glow-cyan float">
                <img src={shieldIcon} alt="Shield" className="w-7 h-7 brightness-0 invert" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  CyberSight
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Threat Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-1 backdrop-blur-md glow-green">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-semibold">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
