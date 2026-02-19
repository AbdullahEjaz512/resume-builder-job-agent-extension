import { Profile, JobDescription } from '../types';

export const generateCoverLetter = async (
  profile: Profile,
  jobDescription: JobDescription
): Promise<string> => {
  const prompt = `
    You are a professional career coach. Write a cover letter connecting this candidate's profile to this job description.
    
    Candidate Profile:
    Name: ${profile.contact.fullName}
    Summary: ${profile.summary}
    Skills: ${profile.skills.join(', ')}
    Experience: ${profile.experience.map(e => `${e.position} at ${e.company}`).join(', ')}
    
    Job Description:
    Title: ${jobDescription.title}
    Company: ${jobDescription.company}
    Description: ${jobDescription.description}
    
    Keep it under 300 words. Tone: Professional but confident.
    Return ONLY the body of the cover letter, no preamble.
  `;

  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3', // Or whatever model the user has installed
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate cover letter');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw error;
  }
};

export const generateAnswer = async (
  question: string,
  profile: Profile
): Promise<string> => {
  const prompt = `
    You are a professional career coach assisting a candidate with a job application.
    Please answer the following question based on the candidate's profile.
    
    Question: "${question}"
    
    Candidate Profile:
    Name: ${profile.contact.fullName}
    Email: ${profile.contact.email}
    Phone: ${profile.contact.phone}
    Location: ${profile.contact.location}
    LinkedIn: ${profile.contact.linkedin}
    Summary: ${profile.summary}
    Skills: ${profile.skills.join(', ')}
    Experience: ${profile.experience.map(e => `${e.position} at ${e.company} (${e.description})`).join('; ')}
    Education: ${profile.education.map(e => `${e.degree} in ${e.field} from ${e.school}`).join('; ')}
    
    Rules:
    1. Answer directly and concisely.
    2. If the question asks for a number (e.g., years of experience), provide a number.
    3. If the question asks for a URL (e.g., portfolio), provide the LinkedIn URL if no other is available.
    4. If the answer is not in the profile, make a reasonable professional inference or say "N/A".
    5. Do not include "Here is the answer:" or quotes. Just the answer.
  `;

  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate answer');
    }

    const data = await response.json();
    return data.response.trim();
  } catch (error) {
    console.error('Error generating answer:', error);
    return ''; // Return empty string on error to avoid breaking the flow
  }
};

export const calculateResumeScore = async (
  resumeText: string,
  jobDescription: string
): Promise<{ score: number; feedback: string; improvements: string[] }> => {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) and hiring manager.
    Analyze the following resume against the provided job description.
    
    RESUME:
    ${resumeText}
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    Task:
    1. Assign a match score from 0 to 100.
    2. Provide a brief summary of why this score was given.
    3. List 3-5 specific improvements or keywords missing from the resume.
    
    Return the response in the following JSON format ONLY:
    {
      "score": 85,
      "feedback": "Good match but missing...",
      "improvements": ["Add keyword X", "Highlight experience in Y"]
    }
  `;

  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: prompt,
        stream: false,
        format: "json" // Force JSON mode if supported by the model/version, otherwise prompt engineering handles it
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate score');
    }

    const data = await response.json();
    const parsed = JSON.parse(data.response);
    return parsed;
  } catch (error) {
    console.error('Error calculating score:', error);
    // Fallback if JSON parsing fails
    return {
      score: 0,
      feedback: "Failed to analyze. Please ensure Ollama is running and try again.",
      improvements: []
    };
  }
};
