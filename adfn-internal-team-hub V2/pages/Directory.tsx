
import React, { useState } from 'react';
import { useHubData } from '../App';
import { Card, Modal, Input } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SearchIcon, 
  MapPinIcon, 
  MailIcon, 
  PhoneIcon, 
  UserPlusIcon,
  ChevronDownIcon,
  FilterIcon,
  BuildingIcon,
  ZapIcon
} from 'lucide-react';

const Directory: React.FC = () => {
  const { data } = useHubData();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);

  const filteredEmployees = data.employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === 'all' || emp.deptId === filterDept;
    return matchesSearch && matchesDept;
  });

  const selectedEmp = data.employees.find(e => e.id === selectedEmpId);
  const manager = selectedEmp ? data.employees.find(e => e.id === selectedEmp.managerId) : null;
  const reports = selectedEmp ? data.employees.filter(e => e.managerId === selectedEmp.id) : [];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-white/40 p-10 rounded-[3rem] border border-white glass">
        <div className="space-y-3">
          <div className="inline-flex px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full font-bold text-[10px] uppercase tracking-widest">Global Team</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">ADFN Directory</h1>
          <p className="text-slate-500 font-medium">Connecting with {data.employees.length} fitness professionals.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type="text"
              placeholder="Search talent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm font-medium"
            />
          </div>
          <div className="relative w-full sm:w-56">
            <FilterIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none appearance-none shadow-sm font-bold text-slate-700 cursor-pointer"
            >
              <option value="all">All Teams</option>
              {data.departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredEmployees.map((emp, idx) => (
            <motion.button 
              key={emp.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedEmpId(emp.id)} 
              className="text-left group"
            >
              <Card className="p-6 h-full border-none shadow-xl shadow-slate-200/50 bg-white group-hover:bg-indigo-600 transition-colors duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <img 
                      src={emp.photoUrl} 
                      alt={emp.name} 
                      className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl shadow-indigo-200 group-hover:shadow-indigo-800 transition-all duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full group-hover:border-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-white transition-colors tracking-tight">{emp.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-indigo-200 transition-colors">{emp.role}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 group-hover:border-white/10 space-y-3">
                  <div className="flex items-center text-xs text-slate-500 group-hover:text-indigo-100 space-x-3">
                    <BuildingIcon className="w-4 h-4 opacity-50" />
                    <span className="font-medium">{data.departments.find(d => d.id === emp.deptId)?.name}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 group-hover:text-indigo-100 space-x-3">
                    <MapPinIcon className="w-4 h-4 opacity-50" />
                    <span className="font-medium">{emp.location}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                   {emp.skills.slice(0, 2).map(skill => (
                     <span key={skill} className="px-2 py-1 bg-slate-50 group-hover:bg-white/10 rounded-lg text-[9px] font-black uppercase text-slate-400 group-hover:text-white transition-colors">
                       {skill}
                     </span>
                   ))}
                </div>
              </Card>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <Modal isOpen={!!selectedEmpId} onClose={() => setSelectedEmpId(null)} title="Team Member Profile">
        {selectedEmp && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full"></div>
                <img src={selectedEmp.photoUrl} alt={selectedEmp.name} className="relative w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedEmp.name}</h2>
                  <div className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Team {selectedEmp.team}</div>
                </div>
                <p className="text-lg text-slate-500 font-bold">{selectedEmp.role}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedEmp.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-tight">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2">
                    <ZapIcon className="w-3 h-3 text-indigo-500" />
                    <span>Communications</span>
                  </h4>
                  <div className="space-y-3">
                    <a href={`mailto:${selectedEmp.email}`} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 group transition-all border border-transparent hover:border-indigo-100">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <MailIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-900 transition-colors">{selectedEmp.email}</span>
                    </a>
                    <a href={`tel:${selectedEmp.phone}`} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 group transition-all border border-transparent hover:border-indigo-100">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <PhoneIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-900 transition-colors">{selectedEmp.phone}</span>
                    </a>
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-transparent">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400">
                        <MapPinIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{selectedEmp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Professional Bio</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium bg-indigo-50/30 p-6 rounded-[2rem] border border-indigo-50/50 italic">
                    "{selectedEmp.bio}"
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Reporting Structure</h4>
                  <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Lead</span>
                      <span className="font-extrabold text-slate-900">{manager?.name || 'Executive'}</span>
                    </div>
                    <div className="w-full h-px bg-slate-50"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Growth</span>
                      <span className="font-extrabold text-indigo-600">{reports.length} Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Directory;
