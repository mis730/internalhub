
import React from 'react';
import { Link } from 'react-router-dom';
import { useHubData } from '../App';
import { Card } from '../components/UI';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  RefreshCwIcon, 
  BuildingIcon, 
  SearchIcon, 
  BookOpenIcon,
  BellIcon,
  SparklesIcon,
  ActivityIcon
} from 'lucide-react';

const Home: React.FC = () => {
  const { data } = useHubData();

  const navCards = [
    { title: 'Interactive Workflow', desc: 'Process lifecycle from lead to success.', path: '/workflow', icon: RefreshCwIcon, color: 'text-indigo-600', bg: 'bg-indigo-50', gradient: 'from-indigo-50 to-white' },
    { title: 'Departments', desc: 'Structure, roles, and responsibilities.', path: '/departments', icon: BuildingIcon, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', gradient: 'from-fuchsia-50 to-white' },
    { title: 'Team Directory', desc: 'Connect with your global teammates.', path: '/directory', icon: SearchIcon, color: 'text-emerald-600', bg: 'bg-emerald-50', gradient: 'from-emerald-50 to-white' },
    { title: 'Resource Hub', desc: 'Policies, tools, and shared knowledge.', path: '/resources', icon: BookOpenIcon, color: 'text-orange-600', bg: 'bg-orange-50', gradient: 'from-orange-50 to-white' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Animated Announcement */}
      {data.config.announcement && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 rounded-[2rem] flex items-center space-x-3 shadow-[0_20px_50px_rgba(8,112,184,0.07)]"
        >
          <div className="bg-slate-900 p-2 rounded-xl text-white">
            <BellIcon className="w-4 h-4 animate-pulse" />
          </div>
          <p className="text-sm font-bold text-slate-700">{data.config.announcement}</p>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3.5rem] bg-slate-900/90 backdrop-blur-md p-10 md:p-20 text-white shadow-2xl">
        {/* Animated Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 blur-[80px] rounded-full -ml-10 -mb-10"></div>
        
        <div className="relative z-10 max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-6 backdrop-blur-md">
              <SparklesIcon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Operational Ecosystem</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Elevating health <span className="text-indigo-400 font-black">standardized.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-400 leading-relaxed font-medium"
          >
            A unified space built for operational clarity, clinical precision, and collective growth.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link to="/directory" className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold shadow-2xl hover:bg-slate-100 transition-all hover:-translate-y-1">
              Team Directory
            </Link>
            <Link to="/workflow" className="px-8 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
              Live Workflow
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {navCards.map((card, idx) => (
          <Link key={card.path} to={card.path} className="group">
            <Card className={`h-full p-8 border-none bg-white/80 glass shadow-xl shadow-slate-200/40`} delay={idx * 0.1}>
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className={`${card.bg} ${card.color} w-16 h-16 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all`}
              >
                <card.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{card.desc}</p>
              <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                <span>Access Module</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </div>
            </Card>
          </Link>
        ))}
      </section>

      {/* Culture & Visuals */}
      <section className="grid md:grid-cols-2 gap-12 items-center py-10">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Fueling Human <br/> Potential</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Our internal culture mirrors the care we give our clients. We leverage data and empathy to build a sustainable fitness future.
            </p>
          </div>
          
          <div className="grid gap-4">
            {[
              { title: 'Operational Excellence', icon: ActivityIcon, color: 'text-indigo-500' },
              { title: 'Data-Driven Clinicals', icon: RefreshCwIcon, color: 'text-emerald-500' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 p-5 bg-white/60 glass rounded-[1.5rem] shadow-sm border border-white hover:border-slate-200 transition-colors">
                <div className={`${item.color} p-3 bg-white rounded-xl shadow-sm`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-slate-500 to-indigo-500 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[4/3] border-8 border-white">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000" alt="Culture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
