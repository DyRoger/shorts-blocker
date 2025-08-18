// Background script for YouTube Shorts Blocker
// Handles icon switching and initialization

// Update extension icon based on enabled state
function updateExtensionIcon(enabled) {
  const iconPath = enabled ? 'icon-active.png' : 'icon-disabled.png';
  
  chrome.action.setIcon({
    path: {
      "16": iconPath,
      "32": iconPath,
      "48": iconPath,
      "128": iconPath
    }
  });
}

// Set initial icon when extension starts
chrome.runtime.onStartup.addListener(async () => {
  const result = await chrome.storage.sync.get(['shortsBlockerEnabled']);
  const isEnabled = result.shortsBlockerEnabled !== false; // Default to true
  updateExtensionIcon(isEnabled);
});

// Set icon when extension is installed
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.sync.get(['shortsBlockerEnabled']);
  const isEnabled = result.shortsBlockerEnabled !== false; // Default to true
  updateExtensionIcon(isEnabled);
});

// Listen for storage changes to update icon
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.shortsBlockerEnabled) {
    const isEnabled = changes.shortsBlockerEnabled.newValue !== false;
    updateExtensionIcon(isEnabled);
  }
});
