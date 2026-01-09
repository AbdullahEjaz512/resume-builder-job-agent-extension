// This script runs on the LinkedIn Job Search Results page

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'SCRAPE_JOB_LINKS') {
    console.log('Scraping job links...');
    
    // Selectors for job cards in the search results
    // LinkedIn changes these often, so we try a few common ones
    const jobCards = Array.from(document.querySelectorAll('.job-card-container, .jobs-search-results__list-item'));
    
    const jobs = jobCards.map(card => {
      const anchor = card.querySelector('a.job-card-container__link, a.job-card-list__title') as HTMLAnchorElement;
      const id = anchor?.getAttribute('data-job-id') || anchor?.href.split('view/')[1]?.split('/')[0];
      
      // Check for "Easy Apply" indicator
      const textContent = card.textContent?.toLowerCase() || '';
      const isEasyApply = textContent.includes('easy apply');

      return {
        id,
        url: anchor?.href,
        title: anchor?.textContent?.trim(),
        isEasyApply
      };
    }).filter(job => job.id && job.isEasyApply); // Only return Easy Apply jobs for now

    console.log(`Found ${jobs.length} Easy Apply jobs`);
    sendResponse({ jobs });
  }
});
