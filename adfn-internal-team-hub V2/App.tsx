
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_DATA } from './constants';
import { HubData } from './types';
import Home from './pages/Home';
import Workflow from './pages/Workflow';
import Departments from './pages/Departments';
import Directory from './pages/Directory';
import Hierarchy from './pages/Hierarchy';
import Resources from './pages/Resources';
import Admin from './pages/Admin';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  RefreshCwIcon, 
  UsersIcon, 
  BuildingIcon, 
  SearchIcon, 
  BookOpenIcon, 
  SettingsIcon,
  MenuIcon,
  XIcon,
  ChevronRightIcon,
  DatabaseIcon,
  SaveIcon
} from 'lucide-react';

interface DataContextType {
  data: HubData;
  setData: (data: HubData) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  resetData: () => void;
  fileHandle: any | null;
  setFileHandle: (handle: any | null) => void;
  saveToFile: (customData?: HubData) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useHubData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useHubData must be used within a DataProvider");
  return context;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { data, isAdmin, fileHandle } = useHubData();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/workflow', label: 'Workflow', icon: RefreshCwIcon },
    { path: '/departments', label: 'Teams', icon: BuildingIcon },
    { path: '/directory', label: 'Directory', icon: SearchIcon },
    { path: '/hierarchy', label: 'Org Chart', icon: UsersIcon },
    { path: '/resources', label: 'Resources', icon: BookOpenIcon },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin Panel', icon: SettingsIcon }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Full Page Dynamic Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-50">
        {data.config.bgImage ? (
          <>
            <img 
              src={data.config.bgImage} 
              className="w-full h-full object-cover" 
              alt="background"
            />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          </>
        ) : (
          <div className="mesh-bg w-full h-full"></div>
        )}
      </div>

      {/* Mobile Top Bar - Removed Logo */}
      <div className="lg:hidden flex items-center justify-between p-6 glass sticky top-0 z-50">
        <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-lg">A</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl active:scale-90 transition-transform"
        >
          {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Auto-Hide / Collapsible Sidebar - Minimalist (No Text/Logo Header) */}
      <motion.aside 
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
        initial={false}
        animate={{ 
          width: isMobileMenuOpen ? '100%' : (isSidebarExpanded ? 280 : 96),
          x: isMobileMenuOpen ? 0 : (window.innerWidth < 1024 && !isMobileMenuOpen ? -300 : 0)
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          fixed inset-y-0 left-0 z-40 bg-white/60 backdrop-blur-3xl border-r border-white/20 
          lg:sticky lg:top-0 h-screen overflow-hidden flex flex-col
          ${isMobileMenuOpen ? 'block w-full' : 'hidden lg:flex'}
        `}
      >
        <div className="h-full flex flex-col p-6 overflow-hidden">
          {/* Top spacer replaces logo area */}
          <div className="mb-12 h-12"></div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-3 overflow-hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center px-4 py-4 rounded-[1.5rem] transition-all duration-300 group relative
                  ${isActive(item.path) 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'}
                `}
              >
                <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  <item.icon className={`w-5 h-5 transition-colors ${isActive(item.path) ? 'text-indigo-400' : 'group-hover:text-indigo-600'}`} />
                </div>
                
                {(isSidebarExpanded || isMobileMenuOpen) && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-4 font-bold text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            ))}
          </nav>

          {/* Storage Mode Indicator */}
          <div className="mb-4">
            <AnimatePresence>
              {(isSidebarExpanded || isMobileMenuOpen) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl border ${fileHandle ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700' : 'bg-white/40 border-slate-100 text-slate-400'}`}
                >
                  {fileHandle ? <SaveIcon className="w-4 h-4" /> : <DatabaseIcon className="w-4 h-4" />}
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black uppercase tracking-widest">{fileHandle ? 'Disk Synced' : 'Browser Storage'}</p>
                    {fileHandle && <p className="text-[8px] truncate font-medium opacity-60">{fileHandle.name}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Area */}
          <div className="mt-auto pt-6 border-t border-slate-200/20 space-y-4 overflow-hidden">
             {(isSidebarExpanded || isMobileMenuOpen) ? (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-4"
               >
                 {!isAdmin ? (
                   <Link to="/admin" className="block p-4 bg-indigo-500 text-white rounded-2xl text-center group transition-all hover:bg-indigo-600 shadow-lg shadow-indigo-200">
                      <p className="text-xs font-black uppercase tracking-widest">Admin</p>
                   </Link>
                 ) : (
                   <div className="p-3 bg-emerald-500 text-white rounded-xl text-center text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200">
                     Admin Online
                   </div>
                 )}
                 <p className="text-[9px] text-slate-400 text-center font-bold px-2 leading-tight uppercase tracking-tighter">
                   {data.config.footerText}
                 </p>
               </motion.div>
             ) : (
               <div className="flex justify-center">
                 <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                    <ChevronRightIcon className="w-4 h-4" />
                 </div>
               </div>
             )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden min-h-screen relative z-10">
        <div className="p-6 lg:p-12 lg:max-w-7xl lg:mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<HubData>(() => {
    const saved = localStorage.getItem('adfn_hub_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('adfn_admin_session') === 'true';
  });

  const [fileHandle, setFileHandle] = useState<any | null>(null);

  useEffect(() => {
    if (!fileHandle) {
      localStorage.setItem('adfn_hub_data', JSON.stringify(data));
    }
  }, [data, fileHandle]);

  useEffect(() => {
    sessionStorage.setItem('adfn_admin_session', isAdmin.toString());
  }, [isAdmin]);

  const saveToFile = useCallback(async (customData?: HubData) => {
    if (!fileHandle) return;
    const dataToSave = customData || data;
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(dataToSave, null, 2));
      await writable.close();
      console.log('Successfully saved to local disk file:', fileHandle.name);
    } catch (err) {
      console.error('Failed to save to disk:', err);
      setFileHandle(null);
    }
  }, [fileHandle, data]);

  useEffect(() => {
    if (fileHandle) {
      saveToFile();
    }
  }, [data, fileHandle, saveToFile]);

  const resetData = () => {
    if (confirm("Restore system defaults? Current local edits will be lost.")) {
      setData(INITIAL_DATA);
      setFileHandle(null);
    }
  };

  return (
    <DataContext.Provider value={{ 
      data, setData, 
      isAdmin, setIsAdmin, 
      resetData, 
      fileHandle, setFileHandle,
      saveToFile 
    }}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/hierarchy" element={<Hierarchy />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </HashRouter>
    </DataContext.Provider>
  );
};

export default App;
