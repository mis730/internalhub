
import React, { useState } from 'react';
import { useHubData } from '../App';
import { Card, Modal } from '../components/UI';
import { 
  BuildingIcon, 
  TrendingUpIcon, 
  AppleIcon, 
  SettingsIcon,
  CheckCircle2Icon,
  ChevronRightIcon
} from 'lucide-react';

const iconMap: Record<string, any> = {
  TrendingUp: TrendingUpIcon,
  Apple: AppleIcon,
  Settings: SettingsIcon,
  Building: BuildingIcon
};

const Departments: React.FC = () => {
  const { data } = useHubData();
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  const selectedDept = data.departments.find(d => d.id === selectedDeptId);
  const deptLead = selectedDept ? data.employees.find(e => e.id === selectedDept.leadId) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Departments</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          The structural pillars of ADFN. Understand roles, ownership, and key contacts.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {data.departments.map((dept) => {
          const Icon = iconMap[dept.icon] || BuildingIcon;
          return (
            <button key={dept.id} onClick={() => setSelectedDeptId(dept.id)} className="text-left group">
              <Card className="p-8 h-full transition-all group-hover:-translate-y-2 group-hover:shadow-xl border-t-4 border-t-transparent group-hover:border-t-slate-900">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h3>
                <p className="text-slate-500 mb-6 line-clamp-2">{dept.description}</p>
                <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                  <span>View Details</span>
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      <Modal 
        isOpen={!!selectedDeptId} 
        onClose={() => setSelectedDeptId(null)} 
        title={selectedDept?.name || ""}
      >
        {selectedDept && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Purpose</h4>
              <p className="text-lg text-slate-700 leading-relaxed">{selectedDept.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Core Responsibilities</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedDept.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl">
                    <CheckCircle2Icon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span className="text-sm text-slate-700">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Department Lead</h4>
                {deptLead ? (
                  <div className="flex items-center space-x-4">
                    <img src={deptLead.photoUrl} alt={deptLead.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-slate-900">{deptLead.name}</p>
                      <p className="text-xs text-slate-500">{deptLead.role}</p>
                    </div>
                  </div>
                ) : <p className="text-sm text-slate-400 italic">No lead assigned</p>}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Processes Owned</h4>
                <div className="space-y-2">
                  {data.workflow.filter(w => w.ownerDept === selectedDept.id).map(w => (
                    <div key={w.id} className="text-sm font-medium py-1 px-3 border-l-2 border-slate-200">
                      {w.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Departments;
