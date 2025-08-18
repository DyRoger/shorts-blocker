# YouTube Shorts Blocker

A Chrome extension that blocks YouTube Shorts by redirecting URLs and hiding Shorts-related UI elements, with a counter to track how many Shorts you've avoided.

## Features

- 🚫 **Blocks YouTube Shorts**: Automatically redirects from Shorts URLs to the main YouTube homepage
- 👁️ **Hides Shorts UI**: Removes Shorts shelves, buttons, and video recommendations from the interface
- 📊 **Counts Blocked Shorts**: Tracks the actual number of unique Shorts videos you've encountered and blocked
- 🔄 **Real-time Updates**: Counter updates live as you browse YouTube
- ⚡ **Easy Toggle**: Simple on/off switch in the popup
- 🎯 **Smart Detection**: Uses video IDs to avoid counting the same Short multiple times
- 💾 **Persistent Settings**: Your preferences are saved and synced across devices

## Installation

### From Source (Development)

1. **Download the extension**:
   - Clone or download this repository
   - Extract the files to a folder

2. **Enable Developer Mode**:
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right corner

3. **Load the extension**:
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

4. **Pin the extension** (optional):
   - Click the puzzle piece icon in Chrome's toolbar
   - Pin the YouTube Shorts Blocker for easy access

## Usage

### Basic Usage

1. **Click the extension icon** in your browser toolbar
2. **Toggle "Block Shorts"** to enable/disable blocking
3. **Watch the counter** increment as Shorts are blocked
4. **Reset counter** anytime using the reset button

### What Gets Blocked

- ✅ Direct Shorts URLs (`youtube.com/shorts/...`)
- ✅ Shorts videos in recommendations
- ✅ Shorts shelves on the homepage
- ✅ Shorts tab in the sidebar
- ✅ Shorts buttons and UI elements

### Counter Details

The counter shows the **actual number of unique Shorts videos** you've encountered:

- **Counts**: Individual Shorts videos (by unique video ID)
- **Doesn't count**: UI elements, buttons, or duplicate appearances
- **Persists**: Across browser sessions and device syncing
- **Resets**: Only when you click the reset button

## How It Works

### URL Redirection
When you navigate to a Shorts URL, the extension automatically redirects you to the YouTube homepage and increments the counter.

### UI Element Blocking
The extension scans the page for Shorts-related elements and hides them:
- Shorts video thumbnails and links
- Shorts carousel/shelf sections
- Navigation buttons and tabs
- Search result Shorts videos

### Smart Counting
- Extracts video IDs from Shorts URLs
- Tracks unique videos to prevent double-counting
- Only counts actual video content, not UI elements

## Technical Details

### Files Structure
```
shorts-blocker/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── content.js            # Content script for blocking
├── popup.html            # Popup interface
├── popup.js              # Popup functionality
├── icon-active.png       # Active state icon
├── icon-disabled.png     # Disabled state icon
└── README.md            # This file
```

### Permissions
- `storage`: Save settings and counter data
- `tabs`: Refresh YouTube tabs when toggling

### Browser Compatibility
- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## Development

### Building
No build process required - this is a pure JavaScript extension.

### Testing
1. Load the extension in developer mode
2. Navigate to YouTube
3. Test blocking functionality
4. Verify counter accuracy

### Debugging
- Check browser console for error messages
- Use Chrome DevTools to inspect content script behavior
- Monitor extension popup for real-time updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Privacy

This extension:
- ✅ Works entirely locally in your browser
- ✅ Does not send data to external servers
- ✅ Only accesses YouTube pages
- ✅ Stores settings locally using Chrome's storage API

## Troubleshooting

### Extension Not Working
- Ensure it's enabled in `chrome://extensions/`
- Refresh YouTube tabs after enabling
- Check that you're on `youtube.com` (not other video sites)

### Counter Not Updating
- Refresh the YouTube page
- Check that the extension is enabled
- Try toggling the blocker off and on

### Shorts Still Appearing
- Some Shorts may load before the extension activates
- Refresh the page to apply blocking
- Ensure you're using the latest version

## License

GPL 3.0 License - feel free to modify and distribute under the terms of the GNU General Public License v3.0.

## Changelog

### v1.0
- Initial release
- Basic Shorts blocking functionality
- Counter implementation
- Popup interface

---

**Made with ❤️ to help you focus on long-form content instead of endless Shorts scrolling!**
