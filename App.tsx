
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, AppWindow, BrainCircuit, PlusCircle, Clock, Zap, Target, Search, Menu, X, ChevronRight, BarChart3, TrendingUp, Play, Info, MoreHorizontal, Bell, Settings } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { MOCK_APPS, TIMELINE_DATA } from './constants';
import { AppTracker, ViewType } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getProductivityInsights } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [apps, setApps] = useState<AppTracker[]>(MOCK_APPS);
  const [selectedApp, setSelectedApp] = useState<AppTracker | null>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (currentView === 'insights' && !insights) {
      handleFetchInsights();
    }
  }, [currentView]);

  const handleFetchInsights = async () => {
    setLoadingInsights(true);
    const result = await getProductivityInsights(apps);
    setInsights(result);
    setLoadingInsights(false);
  };

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const Sidebar = () => (
    <aside className="fixed left-0 inset-y-0 w-20 flex flex-col items-center py-8 bg-[#000000] border-r border-white/5 z-50">
      <div className="mb-12">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
          <Zap size={22} className="text-black fill-black" />
        </div>
      </div>
      <nav className="flex flex-col gap-6 flex-1">
        <SideNavItem active={currentView === 'dashboard'} icon={<LayoutDashboard size={22} />} onClick={() => setCurrentView('dashboard')} />
        <SideNavItem active={currentView === 'apps' || currentView === 'detail'} icon={<AppWindow size={22} />} onClick={() => setCurrentView('apps')} />
        <SideNavItem active={currentView === 'insights'} icon={<BrainCircuit size={22} />} onClick={() => setCurrentView('insights')} />
      </nav>
      <div className="flex flex-col gap-6">
        <button className="text-secondary hover:text-white transition-colors"><Bell size={20} /></button>
        <button className="text-secondary hover:text-white transition-colors"><Settings size={20} /></button>
        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden border border-white/10">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
        </div>
      </div>
    </aside>
  );

  const Dashboard = () => {
    const activeApp = apps[0];
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Focus" value={formatTime(apps.reduce((acc, curr) => acc + curr.totalMinutesToday, 0))} trend="+14.2%" icon={<Clock size={16} />} />
          <StatCard label="Active Sessions" value="12" icon={<Play size={16} />} />
          <StatCard label="Goal Status" value="On Track" icon={<Target size={16} />} />
          <StatCard label="Productivity" value="94/100" trend="+4" icon={<Zap size={16} />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chart Section */}
          <div className="lg:col-span-8 bg-surface rounded-3xl p-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-bold tracking-tight">Timeline Performance</h3>
                <p className="text-secondary text-xs">Real-time usage distribution across the day.</p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl">
                <button className="px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg bg-white text-black">Today</button>
                <button className="px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg text-secondary hover:text-white transition-colors">Week</button>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#ffffff' }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="minutes" stroke="#ffffff" strokeWidth={1.5} fill="url(#areaGradient)" />
                  <XAxis dataKey="hour" hide />
                  <YAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Featured App Card */}
          <div className="lg:col-span-4 bg-surface rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={140} />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <span className="text-[10px] font-black tracking-widest text-teal-400 uppercase mb-4">Most Active Today</span>
              <h4 className="text-2xl font-bold mb-1 truncate">{activeApp.name}</h4>
              <p className="text-secondary text-xs mb-8">{activeApp.developer}</p>
              
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-secondary font-medium">Session Duration</span>
                  <span className="text-lg font-bold tracking-tight">{formatTime(activeApp.totalMinutesToday)}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000" style={{ width: '75%' }} />
                </div>
                <button 
                  onClick={() => { setSelectedApp(activeApp); setCurrentView('detail'); }}
                  className="w-full py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors"
                >
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Tracked Table Style */}
        <div className="bg-surface rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
             <h3 className="text-sm font-bold tracking-widest uppercase">Recent Executables</h3>
             <button onClick={() => setCurrentView('apps')} className="text-[10px] font-bold text-secondary hover:text-white transition-colors">SEE ALL</button>
          </div>
          <div className="divide-y divide-white/5">
            {apps.slice(0, 4).map(app => (
              <div key={app.id} className="px-8 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group" onClick={() => { setSelectedApp(app); setCurrentView('detail'); }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg">{app.icon}</div>
                  <div>
                    <p className="text-sm font-bold">{app.name}</p>
                    <p className="text-[10px] text-secondary font-mono uppercase tracking-tighter">{app.executable}</p>
                  </div>
                </div>
                <div className="flex gap-12 text-right">
                  <div className="hidden sm:block">
                    <p className="text-secondary text-[10px] font-bold uppercase mb-0.5 tracking-tighter">Usage Today</p>
                    <p className="text-xs font-bold">{formatTime(app.totalMinutesToday)}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-secondary text-[10px] font-bold uppercase mb-0.5 tracking-tighter">Status</p>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span className="text-xs font-bold text-teal-400">TRACKING</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight size={16} className="text-secondary group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AppList = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Library</h2>
          <p className="text-secondary text-sm">Managing {apps.length} tracked executables.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
             <input type="text" placeholder="Filter..." className="w-full pl-10 pr-4 py-2 bg-surface text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20" />
          </div>
          <button className="bg-white text-black p-2 rounded-xl hover:bg-slate-200 transition-all"><PlusCircle size={20} /></button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {apps.map(app => (
          <div key={app.id} onClick={() => { setSelectedApp(app); setCurrentView('detail'); }} className="bg-surface p-6 rounded-3xl group cursor-pointer hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-8">
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">{app.icon}</div>
               <div className="flex flex-col items-end">
                 <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Today</span>
                 <span className="text-lg font-bold">{formatTime(app.totalMinutesToday)}</span>
               </div>
            </div>
            <h4 className="text-lg font-bold mb-1 truncate">{app.name}</h4>
            <p className="text-secondary text-xs font-mono uppercase tracking-tighter mb-6">{app.executable}</p>
            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Total Week: {formatTime(app.totalMinutesWeek)}</span>
              <button className="p-2 rounded-lg hover:bg-white/5 text-secondary hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AppDetail = () => {
    if (!selectedApp) return null;
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <button onClick={() => setCurrentView('apps')} className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
           <ChevronRight size={16} className="rotate-180" /> Back to library
        </button>

        <div className="bg-surface p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="w-32 h-32 rounded-[2rem] bg-white/5 flex items-center justify-center text-6xl shadow-2xl">{selectedApp.icon}</div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter">{selectedApp.name}</h2>
              <p className="text-secondary font-mono text-sm tracking-tighter uppercase mt-1">{selectedApp.executable}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <StatItem label="Daily Avg" value={formatTime(Math.round(selectedApp.totalMinutesWeek / 7))} />
              <StatItem label="Week Total" value={formatTime(selectedApp.totalMinutesWeek)} />
              <StatItem label="Peak Hour" value="19:00" />
            </div>
          </div>
          <div className="flex gap-3">
             <button className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Export Data</button>
             <button className="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-4 py-3 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><X size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[400px]">
           <div className="lg:col-span-8 bg-surface rounded-3xl p-8">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-10">Usage intensity</h3>
              <div className="h-full">
                <ResponsiveContainer width="100%" height="70%">
                   <BarChart data={[
                     { d: 'M', v: 45 }, { d: 'T', v: 120 }, { d: 'W', v: 180 }, { d: 'T', v: 60 }, { d: 'F', v: 240 }, { d: 'S', v: 310 }, { d: 'S', v: 280 }
                   ]}>
                     <Bar dataKey="v" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={40} />
                     <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
           <div className="lg:col-span-4 bg-surface rounded-3xl p-8">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-8">Quick Stats</h3>
              <div className="space-y-6">
                <MiniRow label="First tracking" value="Jan 12, 2024" />
                <MiniRow label="Main developer" value={selectedApp.developer || "Unknown"} />
                <MiniRow label="Type" value="System App" />
                <MiniRow label="Last session" value="2h ago" />
              </div>
           </div>
        </div>
      </div>
    );
  };

  const Insights = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold tracking-tighter mb-2">Cognitive Analysis</h2>
        <p className="text-secondary">AI-driven patterns and productivity optimizations based on your behavior.</p>
      </div>

      {loadingInsights ? (
        <div className="py-32 flex flex-col items-center justify-center gap-6">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] animate-pulse">Computing clusters...</p>
        </div>
      ) : insights ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-surface p-10 rounded-[2.5rem] flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-400">Behavioral Summary</h3>
              <p className="text-xl font-medium leading-relaxed">{insights.analysis}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4">
              {insights.recommendations.map((r: string, i: number) => (
                <div key={i} className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-sm text-secondary font-medium">{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
             <div className="bg-surface p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary block mb-4">Thought of the day</span>
                <p className="text-2xl font-serif italic text-white/90 leading-tight">"{insights.quote}"</p>
             </div>
             <button onClick={handleFetchInsights} className="w-full py-6 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-200 transition-all">Re-evaluate Patterns</button>
          </div>
        </div>
      ) : (
        <div className="bg-surface p-20 rounded-[2.5rem] text-center max-w-2xl mx-auto">
          <BrainCircuit size={48} className="mx-auto text-white/20 mb-6" />
          <h3 className="text-2xl font-bold mb-3">AI Cluster Idle</h3>
          <p className="text-secondary text-sm mb-10">Grant permission to evaluate your usage history and unlock predictive insights.</p>
          <button onClick={handleFetchInsights} className="bg-white text-black px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest">Connect AI</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000]">
      <Sidebar />
      <main className="lg:ml-20 p-6 lg:p-16 min-h-screen">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <div className="lg:hidden w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Zap size={22} className="text-black fill-black" />
            </div>
            <div>
              <p className="text-secondary text-[10px] font-black uppercase tracking-widest">Session Summary</p>
              <h1 className="text-2xl font-black tracking-tighter uppercase">Overview</h1>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
              <Bell size={16} />
            </button>
            <button className="bg-white text-black px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
              <PlusCircle size={14} /> New Tracking
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 bg-surface rounded-xl"><Menu size={20} /></button>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-black p-10 flex flex-col gap-8 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex justify-between items-center mb-10">
               <Zap className="text-white" />
               <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <button onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} className="text-4xl font-black tracking-tighter uppercase text-left">Dashboard</button>
            <button onClick={() => { setCurrentView('apps'); setMobileMenuOpen(false); }} className="text-4xl font-black tracking-tighter uppercase text-left">Library</button>
            <button onClick={() => { setCurrentView('insights'); setMobileMenuOpen(false); }} className="text-4xl font-black tracking-tighter uppercase text-left">Insights</button>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'apps' && <AppList />}
          {currentView === 'detail' && <AppDetail />}
          {currentView === 'insights' && <Insights />}
        </div>
      </main>
    </div>
  );
};

const SideNavItem = ({ active, icon, onClick }: { active: boolean, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${active ? 'bg-white text-black shadow-lg shadow-white/10 active-glow' : 'text-secondary hover:text-white hover:bg-white/5'}`}
  >
    {icon}
    {!active && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-surface text-[10px] font-bold uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5 z-50">
        Navigation
      </div>
    )}
  </button>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl">
    <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg font-bold tracking-tight">{value}</p>
  </div>
);

const MiniRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-3">
    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold">{value}</span>
  </div>
);

export default App;
