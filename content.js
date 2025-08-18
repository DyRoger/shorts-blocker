// YouTube Shorts Blocker Content Script
(function() {
  'use strict';

  let isEnabled = true;
  let processedElements = new Set(); // Track elements we've already counted

  // Increment blocked shorts counter by a specific amount
  async function incrementBlockedCount(count = 1) {
    try {
      const result = await chrome.storage.sync.get(['blockedShortsCount']);
      const currentCount = result.blockedShortsCount || 0;
      await chrome.storage.sync.set({ blockedShortsCount: currentCount + count });
    } catch (error) {
      console.log('Failed to update blocked shorts counter:', error);
    }
  }

  // Check if blocker is enabled
  async function checkEnabled() {
    try {
      const result = await chrome.storage.sync.get(['shortsBlockerEnabled']);
      isEnabled = result.shortsBlockerEnabled !== false; // Default to true
    } catch (error) {
      isEnabled = true; // Fallback to enabled
    }
  }

  // Initialize enabled state
  checkEnabled();

  // Redirect if current URL is a Shorts URL
  function checkAndRedirect() {
    if (!isEnabled) return false;
    
    if (window.location.pathname.startsWith('/shorts/') || window.location.pathname === '/shorts') {
      incrementBlockedCount(); // Count the blocked redirect
      window.location.replace('https://www.youtube.com/');
      return true;
    }
    return false;
  }

  // Remove Shorts UI elements
  function removeShortsElements() {
    if (!isEnabled) return;
    
    let actualShortsBlocked = 0; // Count only actual Shorts videos
    
    // First, find and count actual Shorts videos (individual videos with /shorts/ URLs)
    const shortsVideoSelectors = [
      'a[href*="/shorts/"]', // Any link to a Shorts video
    ];
    
    shortsVideoSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(link => {
        if (link.href && link.href.includes('/shorts/')) {
          // Extract the video ID from the URL to create unique identifier
          const videoIdMatch = link.href.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
          const videoId = videoIdMatch ? videoIdMatch[1] : link.href;
          
          // Only count unique Shorts videos we haven't seen before
          if (!processedElements.has(videoId)) {
            processedElements.add(videoId);
            
            // Find the video container (the actual video item)
            let container = link.closest('ytd-video-renderer, ytd-compact-video-renderer, ytd-rich-item-renderer, ytd-reel-item-renderer');
            if (container && container.offsetParent !== null && container.style.display !== 'none') {
              container.style.display = 'none';
              actualShortsBlocked++;
            } else if (link.offsetParent !== null && link.style.display !== 'none') {
              // If no container found, hide the link itself
              link.style.display = 'none';
              actualShortsBlocked++;
            }
          } else {
            // Already counted this video, but still hide it
            let container = link.closest('ytd-video-renderer, ytd-compact-video-renderer, ytd-rich-item-renderer, ytd-reel-item-renderer');
            if (container && container.offsetParent !== null && container.style.display !== 'none') {
              container.style.display = 'none';
            } else if (link.offsetParent !== null && link.style.display !== 'none') {
              link.style.display = 'none';
            }
          }
        }
      });
    });
    
    // Then hide other Shorts UI elements (but don't count these)
    const shortsUISelectors = [
      // Shorts shelf on homepage
      'ytd-rich-shelf-renderer[is-shorts]',
      'ytd-reel-shelf-renderer',
      '[aria-label*="Shorts"]',
      
      // Shorts tab/button in sidebar and mobile
      'ytd-guide-entry-renderer a[href="/shorts"]',
      'ytd-mini-guide-entry-renderer a[href="/shorts"]',
      'tp-yt-paper-tab a[href="/shorts"]',
      
      // Shorts-specific containers
      '[id*="shorts"]:not(a)', // Exclude links as we handled them above
      '[class*="shorts"]:not(a)'
    ];

    shortsUISelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (element.offsetParent !== null && element.style.display !== 'none') {
          element.style.display = 'none';
          // Don't count these UI elements, only actual videos
        }
      });
    });

    // Update counter with the actual number of unique Shorts videos blocked
    if (actualShortsBlocked > 0) {
      incrementBlockedCount(actualShortsBlocked);
    }
  }

  // Set up MutationObserver to handle dynamic content
  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldProcess = true;
        }
      });
      
      if (shouldProcess) {
        checkAndRedirect();
        removeShortsElements();
      }
    });

    // Start observing
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  // Handle URL changes (for single-page app navigation)
  function handleUrlChange() {
    // Clear processed elements when navigating to new pages
    processedElements.clear();
    
    // Check for redirect first, if redirected don't process elements
    if (checkAndRedirect()) {
      return;
    }
    removeShortsElements();
  }

  // More aggressive URL monitoring
  function monitorUrlChanges() {
    let lastUrl = location.href;
    
    // Check URL every 100ms for immediate detection
    setInterval(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        handleUrlChange();
      }
    }, 100);
  }

  // Initialize immediately
  checkAndRedirect();

  // Set up when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      removeShortsElements();
      setupObserver();
      monitorUrlChanges();
    });
  } else {
    removeShortsElements();
    setupObserver();
    monitorUrlChanges();
  }

  // Listen for navigation changes (YouTube is a SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      handleUrlChange();
    }
  }).observe(document, { subtree: true, childList: true });

  // Also listen for popstate and pushstate events
  window.addEventListener('popstate', handleUrlChange);
  
  // Override pushState and replaceState to catch programmatic navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(handleUrlChange, 0);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(handleUrlChange, 0);
  };

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleBlocker') {
      isEnabled = message.enabled;
      if (isEnabled) {
        handleUrlChange();
      }
      sendResponse({ success: true });
    }
  });

})();
