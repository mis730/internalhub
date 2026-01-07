
import React, { useState, useRef } from 'react';
import { useHubData } from '../App';
import { Card, Button, Input } from '../components/UI';
import { 
  LockIcon, 
  LayoutDashboardIcon, 
  UsersIcon, 
  BuildingIcon, 
  RefreshCwIcon, 
  DownloadIcon, 
  UploadIcon,
  LogOutIcon,
  Trash2Icon,
  PlusIcon,
  Edit2Icon,
  AlertTriangleIcon,
  FileJsonIcon,
  HardDriveIcon,
  ShieldCheckIcon,
  XIcon,
  ImageIcon,
  LayoutIcon
} from 'lucide-react';

const Admin: React.FC = () => {
  const { data, setData, isAdmin, setIsAdmin, resetData, fileHandle, setFileHandle } = useHubData();
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'departments' | 'workflow' | 'settings' | 'data'>('dashboard');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const THEME_PRESETS = [
    { 
      name: 'Fresh Nutrition', 
      url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000',
      category: 'Food'
    },
    { 
      name: 'Modern Operations', 
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
      category: 'Operations'
    },
    { 
      name: 'Clinical Clean', 
      url: 'https://images.unsplash.com/photo-1505751172107-5739a007721d?auto=format&fit=crop&q=80&w=2000',
      category: 'Operations'
    },
    { 
      name: 'Organic Prep', 
      url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=2000',
      category: 'Food'
    },
    { 
      name: 'Team Collaboration', 
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000',
      category: 'Operations'
    },
    { 
      name: 'Healthy Greens', 
      url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2000',
      category: 'Food'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === data.config.adminPasscode) {
      setIsAdmin(true);
      setPasscode('');
    } else {
      alert("Invalid Passcode.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const connectLocalFile = async () => {
    try {
      // @ts-ignore
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'ADFN Database JSON',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const file = await handle.getFile();
      const content = await file.text();
      const imported = JSON.parse(content);
      
      setFileHandle(handle);
      setData(imported);
      alert(`Linked to local file: ${handle.name}. Changes will now auto-save to disk.`);
    } catch (err) {
      console.error(err);
      if ((err as Error).name !== 'AbortError') {
        alert("Failed to connect to file.");
      }
    }
  };

  const createLocalFile = async () => {
    try {
      // @ts-ignore
      const handle = await window.showSaveFilePicker({
        suggestedName: 'adfn-hub-db.json',
        types: [{
          description: 'ADFN Database JSON',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
      
      setFileHandle(handle);
      alert(`Database created on disk: ${handle.name}`);
    } catch (err) {
      console.error(err);
      if ((err as Error).name !== 'AbortError') {
        alert("Failed to create file.");
      }
    }
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setData({
          ...data,
          config: {
            ...data.config,
            bgImage: base64String
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const setPresetBg = (url: string) => {
    setData({
      ...data,
      config: {
        ...data.config,
        bgImage: url
      }
    });
  };

  const removeBg = () => {
    setData({
      ...data,
      config: {
        ...data.config,
        bgImage: undefined
      }
    });
  };

  const exportData = (filename: string, content: any) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card className="p-10 text-center space-y-8 shadow-2xl glass border-none">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <LockIcon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Admin Mode</h1>
            <p className="text-sm text-slate-500 font-medium">Authentication required to manage the ecosystem.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              label="Admin Passcode" 
              type="password" 
              value={passcode} 
              onChange={setPasscode} 
              placeholder="1234"
            />
            <Button type="submit" className="w-full h-12">Unlock Portal</Button>
          </form>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
            Authorized Personnel Only
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass p-8 rounded-[3rem] border border-white">
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-slate-900 text-white rounded-[1.5rem] shadow-xl">
            <LayoutDashboardIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Control</h1>
            <div className="flex items-center space-x-2 text-sm font-bold">
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-500 flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-1" /> Verified Admin
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleLogout} className="h-12 border-none bg-white text-slate-600 shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-all">
            <LogOutIcon className="w-4 h-4 mr-2" /> End Session
          </Button>
        </div>
      </div>

      <Card className="p-8 border-indigo-100 bg-white/40 glass">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 text-indigo-600 mb-2">
              <HardDriveIcon className="w-6 h-6" />
              <h3 className="text-xl font-extrabold tracking-tight">Live File Sync</h3>
            </div>
            <p className="text-sm text-indigo-900/60 font-medium max-w-md">
              Store your data in a specific JSON file on your computer for absolute local persistence.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {fileHandle ? (
              <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-sm flex items-center space-x-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <HardDriveIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Linked File</p>
                  <p className="text-sm font-bold text-slate-900">{fileHandle.name}</p>
                </div>
                <button onClick={() => setFileHandle(null)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Button onClick={connectLocalFile} variant="secondary" className="bg-white shadow-sm border-slate-200">
                  <UploadIcon className="w-4 h-4 mr-2" /> Open Local File
                </Button>
                <Button onClick={createLocalFile} className="bg-indigo-600 shadow-xl shadow-indigo-100">
                  <HardDriveIcon className="w-4 h-4 mr-2" /> Initialize Disk DB
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100/50 rounded-2xl hide-scrollbar backdrop-blur-md">
        {[
          { id: 'dashboard', label: 'Stats', icon: LayoutDashboardIcon },
          { id: 'employees', label: 'Team', icon: UsersIcon },
          { id: 'settings', label: 'Portal Branding', icon: Edit2Icon },
          { id: 'data', label: 'System', icon: FileJsonIcon },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap
              ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-900'}
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-500">
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 text-center bg-white/60 border-none shadow-xl glass">
              <p className="text-5xl font-black text-slate-900 mb-2">{data.employees.length}</p>
              <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest">Team Members</h4>
            </Card>
            <Card className="p-10 text-center bg-white/60 border-none shadow-xl glass">
              <p className="text-5xl font-black text-slate-900 mb-2">{data.departments.length}</p>
              <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest">Departments</h4>
            </Card>
            <Card className="p-10 text-center bg-white/60 border-none shadow-xl glass">
              <p className="text-5xl font-black text-slate-900 mb-2">{data.workflow.length}</p>
              <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest">Core Processes</h4>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-6xl mx-auto space-y-12">
             <Card className="p-10 space-y-10 border-none shadow-2xl bg-white/80 glass">
                <div className="space-y-1 text-center mb-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Identity & Visuals</h2>
                  <p className="text-sm text-slate-400 font-medium">Control the visual language of your internal ecosystem.</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16">
                  {/* Background Management */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2" /> Portal Background
                      </h3>
                    </div>
                    
                    <div className="relative aspect-[16/9] rounded-[2.5rem] bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center p-4 group">
                      {data.config.bgImage ? (
                        <>
                          <img src={data.config.bgImage} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Button variant="danger" onClick={removeBg} className="scale-90 shadow-2xl">Remove Asset</Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center space-y-3">
                          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No background set</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                        <LayoutIcon className="w-3 h-3 mr-2" /> Quick Presets
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {THEME_PRESETS.map((theme) => (
                          <button 
                            key={theme.name}
                            onClick={() => setPresetBg(theme.url)}
                            className="relative aspect-video rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all group"
                          >
                            <img src={theme.url} className="w-full h-full object-cover" alt={theme.name} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            <div className="absolute bottom-0 inset-x-0 p-1 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-[8px] text-white font-bold truncate">{theme.name}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <input type="file" ref={fileInputRef} onChange={handleBgUpload} className="hidden" accept="image/*" />
                      <Button onClick={() => fileInputRef.current?.click()} className="w-full h-14 bg-slate-900 hover:bg-black">
                         <UploadIcon className="w-4 h-4 mr-2" /> Embed Custom Local Image
                      </Button>
                    </div>
                  </div>

                  {/* Config Settings */}
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-800">Global Configuration</h3>
                      <div className="grid gap-6">
                        <Input 
                          label="Broadcast Announcement" 
                          value={data.config.announcement} 
                          onChange={(val) => setData({ ...data, config: { ...data.config, announcement: val } })} 
                          placeholder="What's happening in the company?"
                        />
                        <Input 
                          label="Footer Copyright Text" 
                          value={data.config.footerText} 
                          onChange={(val) => setData({ ...data, config: { ...data.config, footerText: val } })} 
                        />
                        <Input 
                          label="Admin Console Passcode" 
                          type="password"
                          value={data.config.adminPasscode} 
                          onChange={(val) => setData({ ...data, config: { ...data.config, adminPasscode: val } })} 
                        />
                      </div>
                    </div>

                    <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                      <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4">Technical Note</h4>
                      <p className="text-xs text-indigo-700/70 font-medium leading-relaxed">
                        Embedding large images into the database file will increase the file size. 
                        Recommended image size is under 1MB for optimal performance.
                      </p>
                    </div>

                    <div className="pt-4">
                       <Button onClick={() => alert("Ecosystem Updated!")} className="w-full h-16 text-lg shadow-xl shadow-indigo-100">Update Branding</Button>
                    </div>
                  </div>
                </div>
             </Card>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-10 space-y-6 border-none shadow-xl bg-white/60 glass">
              <div className="flex items-center space-x-4 mb-2">
                 <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                   <DownloadIcon className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900">Database Backup</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Download a portable .JSON snapshot of your entire ecosystem including binary-embedded background images.</p>
              <div className="grid gap-3">
                 <Button variant="secondary" onClick={() => exportData('adfn_hub_backup.json', data)} className="justify-between bg-white border-none hover:bg-slate-50 shadow-sm h-14">
                    <span className="font-bold">Export Database</span> <DownloadIcon className="w-4 h-4" />
                 </Button>
              </div>
            </Card>

            <Card className="p-10 space-y-6 border-none shadow-xl bg-white/60 glass">
              <div className="flex items-center space-x-4 mb-2">
                 <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                   <Trash2Icon className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900">Emergency Reset</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Wipe all local changes and revert to the factory-shipped state. This action is irreversible.</p>
              <div className="pt-4">
                 <Button variant="danger" onClick={resetData} className="w-full shadow-rose-100 h-14">Restore Defaults</Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'employees' && (
           <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personnel Management</h2>
               <Button onClick={() => alert("Demo Mode: Direct JSON editing is required for deep data changes.")} className="rounded-xl h-12">
                 <PlusIcon className="w-4 h-4 mr-2" /> Create Record
               </Button>
             </div>
             <Card className="border-none shadow-2xl bg-white/80 glass overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50 border-b border-slate-100">
                       <tr>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional</th>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation</th>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       {data.employees.map(emp => (
                         <tr key={emp.id} className="hover:bg-white/50 transition-colors">
                           <td className="px-8 py-6 flex items-center space-x-4">
                              <img src={emp.photoUrl} alt={emp.name} className="w-10 h-10 rounded-xl object-cover" />
                              <span className="font-extrabold text-slate-900">{emp.name}</span>
                           </td>
                           <td className="px-8 py-6 text-sm text-slate-500 font-bold">{emp.role}</td>
                           <td className="px-8 py-6 text-right space-x-2">
                             <button className="p-2.5 text-slate-400 hover:text-slate-900 bg-white/50 rounded-xl transition-all"><Edit2Icon className="w-4 h-4" /></button>
                             <button className="p-2.5 text-rose-300 hover:text-rose-600 bg-rose-50/50 rounded-xl transition-all"><Trash2Icon className="w-4 h-4" /></button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                  </table>
                </div>
             </Card>
           </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
