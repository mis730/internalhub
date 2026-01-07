
import React from 'react';
import { useHubData } from '../App';
import { Card } from '../components/UI';
import { 
  LinkIcon, 
  ExternalLinkIcon, 
  CopyIcon,
  CheckIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  WrenchIcon
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  HR: ShieldCheckIcon,
  Tools: WrenchIcon,
  SOPs: BookOpenIcon,
  Policies: ShieldCheckIcon
};

const Resources: React.FC = () => {
  const { data } = useHubData();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = Array.from(new Set(data.resources.map(r => r.category)));

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Resource Center</h1>
        <p className="text-lg text-slate-500">
          Central hub for all tools, documents, and internal policies.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map(cat => (
          <div key={cat} className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                {React.createElement(categoryIcons[cat] || LinkIcon, { className: "w-5 h-5" })}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{cat}</h2>
            </div>

            <div className="grid gap-4">
              {data.resources.filter(r => r.category === cat).map(res => (
                <Card key={res.id} className="p-6 transition-all hover:border-slate-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">{res.name}</h3>
                      <p className="text-sm text-slate-500">{res.description}</p>
                      <div className="text-xs font-mono text-slate-400 pt-1 truncate max-w-xs sm:max-w-md">
                        {res.url}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => copyToClipboard(res.url, res.id)}
                        className={`p-2 rounded-xl transition-all ${copiedId === res.id ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
                      >
                        {copiedId === res.id ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                      </button>
                      <a 
                        href={res.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md"
                      >
                        <ExternalLinkIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.resources.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <LinkIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No resources available</h3>
          <p className="text-slate-400">Content will be added by the admin soon.</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
