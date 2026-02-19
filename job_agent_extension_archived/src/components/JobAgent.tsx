import React, { useState } from 'react';
import { useProfileStore } from '../stores/useProfileStore';

const JobAgent: React.FC = () => {
  const { profile } = useProfileStore();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

  const startAgent = async () => {
    if (!jobTitle) {
      alert('Please enter a job title');
      return;
    }

    setIsRunning(true);
    addLog(`Starting agent for: ${jobTitle}...`);

    // Send message to background script to start the process
    chrome.runtime.sendMessage({
      action: 'START_JOB_AGENT',
      searchCriteria: {
        keywords: jobTitle,
        location: location || 'Remote', // Default to remote if empty
      }
    }, () => {
        if (chrome.runtime.lastError) {
            addLog(`Error: ${chrome.runtime.lastError.message}`);
            setIsRunning(false);
        } else {
            addLog('Agent started in background. Check LinkedIn tabs.');
        }
    });
  };

  const stopAgent = () => {
    setIsRunning(false);
    addLog('Stopping agent...');
    chrome.runtime.sendMessage({ action: 'STOP_JOB_AGENT' });
  };

  // Auto-fill from profile if empty
  React.useEffect(() => {
    if (!jobTitle && profile.experience.length > 0) {
      setJobTitle(profile.experience[0].position);
    }
    if (!location && profile.contact.location) {
      setLocation(profile.contact.location);
    }
  }, [profile]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Autonomous Job Agent</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title / Keywords</label>
          <input 
            type="text" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            placeholder="e.g. Remote, New York"
          />
        </div>

        <div className="flex gap-4">
          {!isRunning ? (
            <button 
              onClick={startAgent}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
            >
              Start Applying
            </button>
          ) : (
            <button 
              onClick={stopAgent}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold"
            >
              Stop Agent
            </button>
          )}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded border h-48 overflow-y-auto text-xs font-mono">
          {logs.length === 0 && <p className="text-gray-400">Agent logs will appear here...</p>}
          {logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobAgent;
