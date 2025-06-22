# **App Name**: Kopy

## Core Features:

- Markdown Editor: Real-time markdown editor with live preview and syntax highlighting, leveraging a plugin system for custom renderers and editor extensions.
- Note Organization: Organize notes into nested notebooks with color-coded tags. Support for pinning, starring, and a trash system for deleted notes.
- User Authentication: User authentication supporting email/password, Google, and GitHub login. Secure data access rules enforced.
- Plugin System: Plugin system to support custom markdown renderers, UI components, editor extensions, themes, and keybindings. Plugin loader supports dynamic module registration and scoped access.
- Theme and Preferences: Settings for theme (light/dark/system), editor font, tab size, and auto-save interval. Theme auto-sync with OS.
- Search: Search note metadata in Firestore (title, tags, notebooks). Full text search performed locally only in IndexedDB.

## Style Guidelines:

- Primary color: Muted green (#2E7D32) for a calm and productive feel.
- Background color: Off-white (#F5F5F5) for a clean and readable interface.
- Accent color: Indigo (#536DFE) to highlight interactive elements and actions.
- Body text: JetBrainsMono Nerd Font a clean and versatile sans-serif font.
- Headline font: `FiraCode Nerd Font` (Bold weight) a bold and modern sans-serif for titles.
- Minimalist, line-based icons for notebooks, tags, and actions. Consistent style across all icons.
- Clean, distraction-free layout with a focus on readability. Use whitespace generously. Sidebar for notebooks and tags. Main content area for note editing and preview.
- Subtle transitions and animations for note creation, deletion, and navigation. Smooth scrolling and loading indicators.