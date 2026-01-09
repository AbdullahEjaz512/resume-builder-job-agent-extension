import React, { useState, useEffect } from 'react';
import { useProfileStore } from '../stores/useProfileStore';
import { calculateResumeScore } from '../utils/aiGenerator';

const ResumeScore: React.FC = () => {
  const { profile } = useProfileStore();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string; improvements: string[] } | null>(null);

  useEffect(() => {
    // Construct a text representation of the profile if available
    if (profile.contact.fullName) {
      const text = `
Name: ${profile.contact.fullName}
Summary: ${profile.summary}
Skills: ${profile.skills.join(', ')}
Experience:
${profile.experience.map(e => `- ${e.position} at ${e.company}: ${e.description}`).join('\n')}
Education:
${profile.education.map(e => `- ${e.degree} in ${e.field} from ${e.school}`).join('\n')}
      `.trim();
      setResumeText(text);
    }
  }, [profile]);

  const handleAnalyze = async () => {
    if (!jobDescription) {
      alert('Please enter a job description.');
      return;
    }
    if (!resumeText) {
      alert('Please enter your resume text or fill out the profile wizard.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const analysis = await calculateResumeScore(resumeText, jobDescription);
      setResult(analysis);
    } catch (error) {
      alert('Failed to analyze. Make sure Ollama is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Resume Score Checker</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <textarea
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Resume Content</label>
          <textarea
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Paste your resume text here (or use the Wizard to auto-fill)..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            * Auto-filled from your profile if available. You can edit this text before analyzing.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
          }`}
        >
          {loading ? 'Analyzing with AI...' : 'Check Score'}
        </button>

        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Analysis Result</h3>
              <div className={`text-2xl font-black px-4 py-2 rounded-full ${
                result.score >= 80 ? 'bg-green-100 text-green-600' :
                result.score >= 60 ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {result.score}/100
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Feedback</h4>
              <p className="text-gray-600 leading-relaxed">{result.feedback}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Suggested Improvements</h4>
              <ul className="list-disc list-inside space-y-1">
                {result.improvements.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeScore;
