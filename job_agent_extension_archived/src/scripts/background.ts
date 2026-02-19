import { generateAnswer } from '../utils/aiGenerator';
import { Profile } from '../types';

// State for the agent
let agentState = {
  isRunning: false,
  jobQueue: [] as string[], // List of Job URLs
  currentJobIndex: 0,
  searchTabId: null as number | null,
  applyTabId: null as number | null
};

// Helper to get profile from storage
const getProfileFromStorage = async (): Promise<Profile | null> => {
  const storage = await chrome.storage.local.get('job-agent-profile-storage');
  if (storage && storage['job-agent-profile-storage']) {
    const parsed = JSON.parse(storage['job-agent-profile-storage']);
    return parsed.state.profile;
  }
  return null;
};

const getResumeDetails = async (): Promise<{url: string, name: string} | null> => {
    const storage = await chrome.storage.local.get('job-agent-profile-storage');
    if (storage && storage['job-agent-profile-storage']) {
      const parsed = JSON.parse(storage['job-agent-profile-storage']);
      // If we have a stored file content (Data URL)
      if (parsed.state.resumeFile && parsed.state.resumeFile.content) {
          return {
              url: parsed.state.resumeFile.content,
              name: parsed.state.resumeFile.name
          };
      }
    }
    return null;
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'GENERATE_ANSWER') {
    (async () => {
      try {
        const profile = await getProfileFromStorage();
        if (!profile) {
          sendResponse({ answer: '' }); // No profile found
          return;
        }

        const answer = await generateAnswer(request.question, profile);
        sendResponse({ answer });
      } catch (error) {
        console.error('Background script error:', error);
        sendResponse({ answer: '' });
      }
    })();
    return true; // Keep the message channel open for async response
  }

  if (request.action === 'START_JOB_AGENT') {
    agentState.isRunning = true;
    agentState.jobQueue = [];
    agentState.currentJobIndex = 0;
    
    const { keywords, location } = request.searchCriteria;
    const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}&f_AL=true`; // f_AL=true filters for Easy Apply

    chrome.tabs.create({ url: searchUrl }, (tab) => {
      if (tab.id) {
        agentState.searchTabId = tab.id;
        // Wait for page load then scrape
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            // Inject script to scrape
            setTimeout(() => {
                chrome.tabs.sendMessage(tabId, { action: 'SCRAPE_JOB_LINKS' }, (response) => {
                    if (response && response.jobs) {
                        agentState.jobQueue = response.jobs.map((j: any) => j.url || `https://www.linkedin.com/jobs/view/${j.id}`);
                        console.log('Job Queue:', agentState.jobQueue);
                        processNextJob();
                    }
                });
            }, 3000); // Wait a bit for dynamic content
          }
        });
      }
    });
    sendResponse({ status: 'started' });
  }

  if (request.action === 'STOP_JOB_AGENT') {
    agentState.isRunning = false;
    sendResponse({ status: 'stopped' });
  }
});

const processNextJob = async () => {
    if (!agentState.isRunning || agentState.currentJobIndex >= agentState.jobQueue.length) {
        console.log('Agent finished or stopped.');
        agentState.isRunning = false;
        return;
    }

    const jobUrl = agentState.jobQueue[agentState.currentJobIndex];
    agentState.currentJobIndex++;

    console.log(`Processing job ${agentState.currentJobIndex}/${agentState.jobQueue.length}: ${jobUrl}`);

    chrome.tabs.create({ url: jobUrl, active: true }, (tab) => {
        if (tab.id) {
            agentState.applyTabId = tab.id;
            
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === tab.id && info.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    
                    setTimeout(async () => {
                        const resumeDetails = await getResumeDetails();
                        
                        chrome.tabs.sendMessage(tabId, { 
                            action: 'APPLY_WITH_PROFILE',
                            data: {
                                resumeBlobUrl: resumeDetails?.url,
                                resumeName: resumeDetails?.name,
                                coverLetterText: '' 
                            }
                        }, (response) => {
                            console.log('Apply script response:', response);
                            // In a real agent, we would wait for a "Success" message from the content script
                            // For now, we just wait a bit and move to the next one to avoid spamming
                            setTimeout(() => {
                                chrome.tabs.remove(tabId);
                                processNextJob();
                            }, 10000); // 10 seconds per job
                        });
                    }, 3000);
                }
            });
        }
    });
};

