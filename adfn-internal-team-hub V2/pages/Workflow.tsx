
import React, { useState } from 'react';
import { useHubData } from '../App';
import { Card } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightCircleIcon, 
  ClockIcon, 
  WrenchIcon, 
  DatabaseIcon, 
  UserIcon,
  ChevronRightIcon,
  ZapIcon
} from 'lucide-react';

const Workflow: React.FC = () => {
  const { data } = useHubData();
  const sortedWorkflow = [...data.workflow].sort((a, b) => a.order - b.order);
  const [activeStep, setActiveStep] = useState(sortedWorkflow[0]?.id);

  const currentStep = sortedWorkflow.find(s => s.id === activeStep);
  const currentIndex = sortedWorkflow.findIndex(s => s.id === activeStep);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold text-xs uppercase tracking-widest items-center space-x-2"
        >
          <ZapIcon className="w-3 h-3" />
          <span>Operational Lifecycle</span>
        </motion.div>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">The Growth Engine</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          A step-by-step map of how we transform curiosity into clinical success.
        </p>
      </div>

      {/* Visual Stepper */}
      <div className="relative bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 overflow-x-auto hide-scrollbar">
        <div className="flex items-center space-x-4 min-w-max px-4">
          {sortedWorkflow.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setActiveStep(step.id)}
                className={`
                  relative flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300
                  ${activeStep === step.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}
                `}
              >
                <span className={`text-sm font-black ${activeStep === step.id ? 'text-white' : 'text-slate-300'}`}>
                  0{idx + 1}
                </span>
                <span className="font-bold whitespace-nowrap">{step.title}</span>
              </button>
              {idx < sortedWorkflow.length - 1 && (
                <ChevronRightIcon className="w-5 h-5 text-slate-200 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="p-10 md:p-16 border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
            
            <div className="grid lg:grid-cols-12 gap-16 relative z-10">
              <div className="lg:col-span-7 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-indigo-600 font-bold text-sm tracking-widest uppercase">
                    <span>{data.departments.find(d => d.id === currentStep?.ownerDept)?.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-200"></span>
                    <span>Stage 0{currentIndex + 1}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                    {currentStep?.title}
                  </h2>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    {currentStep?.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                    <div className="flex items-center space-x-3 text-slate-400 mb-3">
                      <DatabaseIcon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Input Requirements</span>
                    </div>
                    <p className="text-slate-700 font-semibold">{currentStep?.inputs}</p>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-[1.5rem] border border-indigo-100">
                    <div className="flex items-center space-x-3 text-indigo-400 mb-3">
                      <ArrowRightCircleIcon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Key Deliverables</span>
                    </div>
                    <p className="text-indigo-900 font-bold">{currentStep?.outputs}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 bg-slate-900 text-white rounded-[2rem] shadow-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Level Agreement</p>
                      <p className="text-2xl font-black text-white">{currentStep?.sla}</p>
                    </div>
                    <ClockIcon className="w-10 h-10 text-indigo-400 opacity-50" />
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Software Ecosystem</p>
                    <div className="flex flex-wrap gap-2">
                      {currentStep?.tools.map(tool => (
                        <span key={tool} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold border border-white/5">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white border border-slate-100 rounded-[2rem] flex items-center space-x-4 shadow-sm">
                  <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-2xl flex items-center justify-center">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Stakeholder</p>
                    <p className="text-lg font-bold text-slate-900">{data.departments.find(d => d.id === currentStep?.ownerDept)?.name} Team</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Workflow;
