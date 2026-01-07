
import React from 'react';
import { useHubData } from '../App';
import { Card } from '../components/UI';
import { ChevronRightIcon, UserIcon } from 'lucide-react';

const Hierarchy: React.FC = () => {
  const { data } = useHubData();

  // Recursive component for rendering branches
  const OrgNode: React.FC<{ empId: string, level: number }> = ({ empId, level }) => {
    const employee = data.employees.find(e => e.id === empId);
    if (!employee) return null;

    const reports = data.employees.filter(e => e.managerId === empId);

    return (
      <div className="flex flex-col items-center">
        <div className={`
          relative p-4 bg-white border-2 rounded-2xl shadow-sm w-56 transition-all hover:shadow-lg
          ${level === 0 ? 'border-slate-900' : 'border-slate-100'}
        `}>
          {level > 0 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-200" />
          )}
          <div className="flex items-center space-x-3">
            <img src={employee.photoUrl} alt={employee.name} className="w-10 h-10 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="font-bold text-slate-900 truncate text-sm">{employee.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase truncate tracking-tight">{employee.role}</p>
            </div>
          </div>
        </div>

        {reports.length > 0 && (
          <div className="relative pt-8 flex flex-col items-center">
            {/* Horizontal Connector Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200" />
            {reports.length > 1 && (
               <div className="absolute top-8 left-1/2 -translate-x-1/2 h-0.5 bg-slate-200" style={{
                 width: `calc(100% - ${100 / reports.length}%)`
               }} />
            )}
            
            <div className="flex items-start space-x-8">
              {reports.map((report) => (
                <div key={report.id} className="relative">
                   <OrgNode empId={report.id} level={level + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const roots = data.employees.filter(e => !e.managerId);

  return (
    <div className="max-w-full space-y-12 pb-20 overflow-x-auto hide-scrollbar">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Organizational Chart</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Visualizing the ADFN reporting structure and team hierarchy.
        </p>
      </div>

      <div className="min-w-fit flex justify-center p-8">
        <div className="space-y-20">
          {roots.map(root => (
            <OrgNode key={root.id} empId={root.id} level={0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hierarchy;
