// Popup script for YouTube Shorts Blocker
document.addEventListener('DOMContentLoaded', async () => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const status = document.getElementById('status');
  const blockedCount = document.getElementById('blockedCount');
  const resetButton = document.getElementById('resetButton');
  
  // Get current state and blocked count
  const result = await chrome.storage.sync.get(['shortsBlockerEnabled', 'blockedShortsCount']);
  const isEnabled = result.shortsBlockerEnabled !== false; // Default to true
  const currentCount = result.blockedShortsCount || 0;
  
  // Update UI
  updateUI(isEnabled);
  updateCounter(currentCount);
  
  // Add click listener for toggle
  toggleSwitch.addEventListener('click', async () => {
    const newState = !toggleSwitch.classList.contains('active');
    
    // Save state (this will trigger background script to update icon)
    await chrome.storage.sync.set({ shortsBlockerEnabled: newState });
    
    // Update UI immediately
    updateUI(newState);
    
    // Get current tab and refresh it only if on YouTube, but don't close popup
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab && tab.url && tab.url.includes('youtube.com')) {
        // Send message to content script first
        try {
          await chrome.tabs.sendMessage(tab.id, { 
            action: 'toggleBlocker', 
            enabled: newState 
          });
        } catch (error) {
          // Content script might not be ready, that's ok
          console.log('Could not send message to content script:', error);
        }
        
        // Refresh only YouTube tabs without closing the popup
        await chrome.tabs.reload(tab.id);
        
        // Update status to show refresh happened
        status.textContent = newState ? '✅ Shorts are blocked (Page refreshed)' : '❌ Shorts are allowed (Page refreshed)';
        
        // Reset status text after 2 seconds
        setTimeout(() => {
          updateUI(newState);
        }, 2000);
      }
    } catch (error) {
      console.log('Could not refresh tab:', error);
    }
  });
  
  // Add click listener for reset button
  resetButton.addEventListener('click', async () => {
    await chrome.storage.sync.set({ blockedShortsCount: 0 });
    updateCounter(0);
  });
  
  // Listen for storage changes to update counter in real-time
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.blockedShortsCount) {
      updateCounter(changes.blockedShortsCount.newValue || 0);
    }
  });
  
  function updateUI(enabled) {
    if (enabled) {
      toggleSwitch.classList.add('active');
      status.textContent = '✅ Shorts are blocked';
    } else {
      toggleSwitch.classList.remove('active');
      status.textContent = '❌ Shorts are allowed';
    }
  }
  
  function updateCounter(count) {
    blockedCount.textContent = count.toLocaleString();
  }
});
