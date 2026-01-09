import React, { useState, useRef } from 'react';
import ResumeWizard from './components/ResumeWizard';
import JobAgent from './components/JobAgent';
import ResumeScore from './components/ResumeScore';
import { useProfileStore } from './stores/useProfileStore';

type View = 'home' | 'wizard' | 'score' | 'upload' | 'agent';

const actions = [
  {
    key: 'wizard',
    title: 'Create New Resume',
    desc: 'Start from scratch with guided steps',
    badge: 'Guided',
    color: 'from-indigo-500/80 to-blue-500/80',
    icon: '📝',
    onClick: 'create',
  },
  {
    key: 'wizard-edit',
    title: 'Edit Existing',
    desc: 'Jump back into your saved draft',
    badge: 'Continue',
    color: 'from-purple-500/80 to-fuchsia-500/80',
    icon: '✏️',
    onClick: 'edit',
  },
  {
    key: 'upload',
    title: 'Upload Resume',
    desc: 'Use a PDF/Word file you already have',
    badge: 'Import',
    color: 'from-emerald-500/80 to-teal-500/80',
    icon: '📂',
    onClick: 'upload',
  },
  {
    key: 'agent',
    title: 'Auto-Apply Agent',
    desc: 'Search & apply on LinkedIn automatically',
    badge: 'Automation',
    color: 'from-amber-500/80 to-orange-500/80',
    icon: '🤖',
    onClick: 'agent',
  },
  {
    key: 'score',
    title: 'Resume Score Checker',
    desc: 'Measure fit against job descriptions',
    badge: 'AI',
    color: 'from-cyan-500/80 to-sky-500/80',
    icon: '📊',
    onClick: 'score',
  },
];

function App() {
  const [view, setView] = useState<View>('home');
  const { resetProfile, setResumeFile, resumeFile } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateNew = () => {
    if (confirm('This will clear your current resume data. Are you sure?')) {
      resetProfile();
      setView('wizard');
    }
  };

  const handleEditExisting = () => {
    setView('wizard');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setResumeFile({ name: file.name, content });
      alert(`Resume "${file.name}" uploaded successfully! You can now use it for job applications.`);
      setView('home');
    };
    reader.readAsDataURL(file);
  };

  const handleActionClick = (action: string) => {
    if (action === 'create') return handleCreateNew();
    if (action === 'edit') return handleEditExisting();
    if (action === 'upload') return setView('upload');
    if (action === 'agent') return setView('agent');
    if (action === 'score') return setView('score');
  };

  return (
    <div className="min-h-screen w-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 p-4">
      {view === 'home' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 shadow-2xl p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300">All-in-One</p>
                <h1 className="text-3xl font-black text-white drop-shadow-sm">Job Agent</h1>
                <p className="text-sm text-slate-200 mt-2">
                  Build resumes, auto-apply on LinkedIn, and score your fit — all in one place.
                </p>
              </div>
              <div className="px-3 py-2 rounded-xl bg-emerald-400/15 text-emerald-200 text-xs font-semibold border border-emerald-300/30">
                {resumeFile ? `Resume loaded: ${resumeFile.name}` : 'No resume selected'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={() => handleActionClick(action.onClick)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl text-left p-4 transition transform hover:-translate-y-1 hover:shadow-2xl active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              >
                <div
                  className={`absolute inset-0 opacity-70 bg-gradient-to-br ${action.color} blur-2xl translate-x-4 translate-y-4 group-hover:translate-x-1 group-hover:translate-y-1 transition`}
                />
                <div className="relative flex items-start gap-3">
                  <div className="text-2xl">{action.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white drop-shadow-sm">{action.title}</h3>
                      <span className="text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-100">
                        {action.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 mt-1">{action.desc}</p>
                    {action.key === 'upload' && (
                      <p className="text-xs text-emerald-200 mt-2">
                        {resumeFile ? `Current: ${resumeFile.name}` : 'PDF, DOCX, or TXT supported'}
                      </p>
                    )}
                  </div>
                  <div className="text-slate-200 group-hover:text-white transition">→</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'wizard' && (
        <div>
          <button onClick={() => setView('home')} className="mb-4 text-sm text-slate-200 hover:text-white">
            ← Back to Menu
          </button>
          <ResumeWizard />
        </div>
      )}

      {view === 'agent' && (
        <div>
          <button onClick={() => setView('home')} className="mb-4 text-sm text-slate-200 hover:text-white">
            ← Back to Menu
          </button>
          <JobAgent />
        </div>
      )}

      {view === 'upload' && (
        <div className="bg-white/10 border border-white/10 backdrop-blur p-6 rounded-xl shadow-2xl">
          <button onClick={() => setView('home')} className="mb-4 text-sm text-slate-200 hover:text-white">
            ← Back to Menu
          </button>
          <h2 className="text-xl font-bold text-white mb-4">Upload Resume</h2>
          <div
            className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:bg-white/5 transition cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-slate-200 mb-4">Drag and drop your resume here, or click to select.</p>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt"
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/30"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Select File
            </button>
          </div>
          {resumeFile && (
            <div className="mt-4 p-4 bg-emerald-500/10 text-emerald-100 rounded border border-emerald-400/30">
              <p className="font-semibold">Current Resume:</p>
              <p>{resumeFile.name}</p>
            </div>
          )}
        </div>
      )}

      {view === 'score' && (
        <div>
          <button onClick={() => setView('home')} className="mb-4 text-sm text-slate-200 hover:text-white">
            ← Back to Menu
          </button>
          <ResumeScore />
        </div>
      )}
    </div>
  );
}

export default App;