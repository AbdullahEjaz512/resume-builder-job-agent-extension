import React, { useState, useRef } from 'react';
import ResumeWizard from './components/ResumeWizard';
import JobAgent from './components/JobAgent';
import ResumeScore from './components/ResumeScore';
import { useProfileStore } from './stores/useProfileStore';

type View = 'home' | 'wizard' | 'score' | 'upload' | 'agent';

function App() {
  const [view, setView] = useState<View>('home');
  const { resetProfile, setResumeFile, resumeFile } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateNew = () => {
    if (confirm("This will clear your current resume data. Are you sure?")) {
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

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-[600px]">
      {view === 'home' && (
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">All-in-One Job Agent</h1>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleCreateNew}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 flex flex-col items-center"
            >
              <span className="text-lg font-semibold text-gray-800">Create New Resume</span>
              <span className="text-sm text-gray-500">Start from scratch</span>
            </button>

            <button 
              onClick={handleEditExisting}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 flex flex-col items-center"
            >
              <span className="text-lg font-semibold text-gray-800">Edit Existing Resume</span>
              <span className="text-sm text-gray-500">Continue where you left off</span>
            </button>

            <button 
              onClick={() => setView('upload')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 flex flex-col items-center"
            >
              <span className="text-lg font-semibold text-gray-800">Upload Resume</span>
              <span className="text-sm text-gray-500">
                {resumeFile ? `Current: ${resumeFile.name}` : 'Upload a PDF/Word file'}
              </span>
            </button>

            <button 
              onClick={() => setView('agent')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 flex flex-col items-center"
            >
              <span className="text-lg font-semibold text-gray-800">Auto-Apply Agent</span>
              <span className="text-sm text-gray-500">Autonomous job search & apply</span>
            </button>

            <button 
              onClick={() => setView('score')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 flex flex-col items-center"
            >
              <span className="text-lg font-semibold text-gray-800">Resume Score Checker</span>
              <span className="text-sm text-gray-500">Analyze your resume strength</span>
            </button>
          </div>
        </div>
      )}

      {view === 'wizard' && (
        <div>
          <button onClick={() => setView('home')} className="mb-4 text-sm text-gray-600 hover:text-gray-900">
            ← Back to Menu
          </button>
          <ResumeWizard />
        </div>
      )}

      {view === 'agent' && (
        <div>
          <button onClick={() => setView('home')} className="mb-4 text-sm text-gray-600 hover:text-gray-900">
            ← Back to Menu
          </button>
          <JobAgent />
        </div>
      )}

      {view === 'upload' && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <button onClick={() => setView('home')} className="mb-4 text-sm text-gray-600 hover:text-gray-900">
            ← Back to Menu
          </button>
          <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-gray-500 mb-4">Drag and drop your resume here, or click to select.</p>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt"
            />
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Select File
            </button>
          </div>
          {resumeFile && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded border border-green-200">
              <p className="font-semibold">Current Resume:</p>
              <p>{resumeFile.name}</p>
            </div>
          )}
        </div>
      )}

      {view === 'score' && (
        <div>
          <button onClick={() => setView('home')} className="mb-4 text-sm text-gray-600 hover:text-gray-900">
            ← Back to Menu
          </button>
          <ResumeScore />
        </div>
      )}
    </div>
  );
}

export default App;