// This script runs on LinkedIn job application pages

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const clickButton = (selector: string, text?: string): boolean => {
  const buttons = Array.from(document.querySelectorAll(selector));
  let target: Element | undefined;

  if (text) {
    target = buttons.find(b => b.textContent?.toLowerCase().includes(text.toLowerCase()));
  } else {
    target = buttons[0];
  }

  if (target && target instanceof HTMLElement) {
    target.click();
    return true;
  }
  return false;
};

const findAndFillCoverLetter = (coverLetterText: string) => {
  // Common selectors for cover letter text areas on LinkedIn
  const selectors = [
    'textarea[aria-label*="Cover letter"]',
    'textarea[id*="cover-letter"]',
    'textarea[name*="coverLetter"]',
    'textarea[aria-label*="Why are you a fit"]', // Sometimes they ask this instead
    'label:contains("Cover letter") + textarea', // Pseudo-selector logic, implemented manually below
  ];

  let textArea: HTMLTextAreaElement | null = null;

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) {
      textArea = el as HTMLTextAreaElement;
      break;
    }
  }

  // Fallback: Look for labels containing "Cover letter" and find associated textarea
  if (!textArea) {
    const labels = Array.from(document.querySelectorAll('label'));
    const coverLetterLabel = labels.find(l => l.textContent?.toLowerCase().includes('cover letter'));
    if (coverLetterLabel) {
      const id = coverLetterLabel.getAttribute('for');
      if (id) {
        textArea = document.getElementById(id) as HTMLTextAreaElement;
      }
    }
  }

  if (textArea) {
    console.log('Found Cover Letter text area, filling...');
    textArea.value = coverLetterText;
    
    // Dispatch events to ensure React/LinkedIn state updates
    textArea.dispatchEvent(new Event('input', { bubbles: true }));
    textArea.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    console.log('Cover Letter text area not found.');
  }
};

const uploadResume = (file: File) => {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  
  if (fileInput) {
    console.log('Found file input, uploading resume...');
    
    // Create a DataTransfer to simulate a file drop/selection
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;

    // Dispatch events
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    fileInput.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    console.log('File input for resume not found.');
  }
};

const getLabelText = (element: HTMLElement): string | null => {
  // 1. Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // 2. Check associated label
  const id = element.id;
  if (id) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label && label.textContent) return label.textContent.trim();
  }

  // 3. Check closest label wrapper
  const parentLabel = element.closest('label');
  if (parentLabel && parentLabel.textContent) {
      // Remove the input's own text if it's inside
      const clone = parentLabel.cloneNode(true) as HTMLElement;
      const inputInClone = clone.querySelector('input, textarea');
      if (inputInClone) inputInClone.remove();
      return clone.textContent?.trim() || null;
  }

  return null;
};

const scanAndFillEmptyFields = async () => {
  console.log('Scanning for empty text fields...');
  const inputs = Array.from(document.querySelectorAll('input[type="text"], textarea, input:not([type])'));
  
  for (const input of inputs) {
    const el = input as HTMLInputElement | HTMLTextAreaElement;
    
    // Skip hidden or already filled fields
    if (el.type === 'hidden' || el.value.trim() !== '' || el.style.display === 'none') continue;
    
    // Skip the cover letter field as it's handled separately (optional, but good for avoiding double work)
    // actually, if findAndFillCoverLetter ran first, this won't be empty.

    const question = getLabelText(el);
    if (question) {
      console.log(`Found empty field with question: "${question}". Asking AI...`);
      
      try {
        const response = await chrome.runtime.sendMessage({
          action: 'GENERATE_ANSWER',
          question: question
        });

        if (response && response.answer) {
          console.log(`AI Answer for "${question}":`, response.answer);
          el.value = response.answer;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } catch (err) {
        console.error('Error getting AI answer:', err);
      }
    }
  }
};

const handleApplicationFlow = async (coverLetterText: string, resumeBlobUrl?: string, resumeName?: string) => {
  console.log('Starting application flow...');

  // 1. Click "Easy Apply"
  const easyApplyBtn = document.querySelector('.jobs-apply-button--top-card button');
  if (easyApplyBtn instanceof HTMLElement) {
    console.log('Clicking Easy Apply...');
    easyApplyBtn.click();
    await sleep(2000); // Wait for modal
  } else {
    console.log('Easy Apply button not found (or already applied).');
    return;
  }

  // 2. Loop through steps
  let maxSteps = 10; // Safety break
  while (maxSteps > 0) {
    console.log('Processing step...');
    
    // A. Upload Resume if needed
    if (resumeBlobUrl) {
        // Try to find file input
        let fileInput = document.querySelector('input[type="file"]');
        
        // If not found, try clicking "Upload resume" button to maybe reveal it or just to be safe
        if (!fileInput) {
             const uploadBtn = document.querySelector('label[aria-label="Upload resume"], button[aria-label="Upload resume"]');
             if (uploadBtn instanceof HTMLElement) {
                 uploadBtn.click();
                 await sleep(500);
                 fileInput = document.querySelector('input[type="file"]');
             }
        }

        if (fileInput) {
             // We need to fetch the blob from the URL to create a File object
             try {
                const res = await fetch(resumeBlobUrl);
                const blob = await res.blob();
                // Use the actual file name if available, otherwise default
                const fileName = resumeName || "Resume.docx";
                const file = new File([blob], fileName, { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
                
                uploadResume(file);
                await sleep(2000); // Wait for upload to process
             } catch (err) {
                 console.error('Error fetching resume blob:', err);
             }
        }
    }

    // B. Fill Cover Letter if needed
    if (coverLetterText) {
        findAndFillCoverLetter(coverLetterText);
    }

    // C. Fill other fields (AI)
    await scanAndFillEmptyFields();
    await sleep(1000);

    // D. Click Next / Review / Submit
    // Prioritize "Submit application"
    if (clickButton('button', 'Submit application')) {
      console.log('Submitted application!');
      await sleep(2000);
      break;
    }
    
    // Then "Review"
    if (clickButton('button', 'Review')) {
      console.log('Clicked Review...');
      await sleep(2000);
      continue;
    }

    // Then "Next"
    if (clickButton('button', 'Next')) {
      console.log('Clicked Next...');
      await sleep(2000);
      continue;
    }

    // If no buttons found, maybe we are done or stuck
    console.log('No navigation buttons found. Stopping.');
    break;

    maxSteps--;
  }
};

// Listen for messages from the popup/background script
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'APPLY_WITH_PROFILE') {
    const { coverLetterText, resumeBlobUrl, resumeName } = request.data;
    
    handleApplicationFlow(coverLetterText, resumeBlobUrl, resumeName)
      .then(() => sendResponse({ status: 'finished' }))
      .catch(err => {
        console.error(err);
        sendResponse({ status: 'error', message: err.toString() });
      });

    return true; // Async response
  }
});
