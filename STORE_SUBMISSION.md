Store submission checklist and suggested text for the Chrome Web Store listing.

Requirements identified from the Web Store screenshot provided by the user and suggested text to paste into the developer dashboard.

1) Permissions justifications (Privacy practices tab)

- Host permissions / Tabs / Content scripts:
  Reason: The extension needs to access YouTube pages (https://www.youtube.com/*) to detect and hide Shorts UI elements and to redirect Shorts URLs to the main YouTube view. All processing runs locally in the browser; no page content is uploaded.

- Storage:
  Reason: The extension uses the browser storage API to persist user settings and the counter that tracks unique Shorts videos that were blocked.

- Remote code:
  Reason: The extension does NOT execute remote code. (This is a negative justification; select "No" for remote code or state that no remote code is used.)

- Tabs:
  Reason: Required to find and refresh YouTube tabs when the user toggles the blocker on/off.

2) Language
- Primary language: English

3) Categories
- Recommended category: Productivity or Accessibility (choose whichever fits your store listing options)

4) Icon
- You must upload a 128×128 PNG icon in the developer dashboard. Suggested file: `icon-active.png` (ensure it is 128×128 and a valid PNG). If your `icon-active.png` is not 128×128, generate or resize it before upload.

5) Screenshots / Video
- At least one screenshot is required. Suggested screenshot captures to upload:
  - Popup UI showing the toggle and counter (`popup.html` displayed with the extension enabled)
  - YouTube page showing Shorts elements hidden (a before/after pair is ideal)

6) Description text

- Short (single purpose) description (required):
  "Blocks YouTube Shorts by redirecting Shorts URLs, hiding Shorts UI elements, and counting blocked Shorts. Works locally without sending data outside your browser."

- Detailed description (min 25 chars):
  "YouTube Shorts Blocker prevents Shorts from interrupting your browsing by redirecting Shorts URLs to the main YouTube view and hiding Shorts-related UI elements. It keeps a local counter of unique Shorts videos blocked and stores settings locally using the browser storage API. No data is sent to external servers."

7) Data usage certification
- In the Privacy practices tab, certify that:
  - You collect only the data described (storage for local settings and counter).
  - You don't transfer data to third parties.
  - You don't use remote code.

8) Privacy policy
- Upload or point the store to `privacy_policy.html` (hosted on your website or GitHub Pages) or upload the text in the dashboard.

9) Additional notes
- Make sure the manifest's `icons` entry includes a 128×128 icon path (it already does). Ensure the actual file dimensions match the declared sizes.
- Provide a contact email or link in the dashboard.

---

Pasteable fields

- Short description (single purpose):
  Blocks YouTube Shorts by redirecting Shorts URLs, hiding Shorts UI elements, and counting blocked Shorts. Works locally without sending data outside your browser.

- Long description (detailed):
  YouTube Shorts Blocker prevents Shorts from interrupting your browsing by redirecting Shorts URLs to the main YouTube view and hiding Shorts-related UI elements. It keeps a local counter of unique Shorts videos blocked and stores settings locally using the browser storage API. No data is sent to external servers.

- Permissions justification (host permissions):
  The extension needs access to https://www.youtube.com/* to detect and hide Shorts UI elements and to redirect Shorts URLs to the main YouTube view. All processing is done locally; no content is uploaded.

- Permissions justification (storage):
  Storage is used to persist user preferences and the local counter of unique Shorts videos that were blocked.

- Permissions justification (tabs):
  Tabs permission is used to locate and refresh YouTube tabs when the user toggles the blocker.

- Remote code statement:
  This extension does not download or execute remote code at runtime; all code is bundled in the extension package.
