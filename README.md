# Changelog Notification Tool

Multi-source changelog and blog update notification tool. Monitor Claude Code releases, React blog posts, and Next.js blog posts with instant desktop notifications.

## Features

- 🔔 Desktop notifications for multiple sources:
  - Claude Code CHANGELOG.md updates
  - React Blog posts (https://react.dev/blog)
  - Next.js Blog posts (https://nextjs.org/blog)
- ⏰ Configurable polling intervals (5 minutes to 2 hours)
- 🔊 Optional notification sounds (Submarine sound on macOS)
- 📋 System tray integration with "CL" menu bar text
- 🌐 Quick access to all monitored sources from tray menu
- 🎯 Individual notifications for each source
- ⚙️ Unified notification control (enable/disable all sources together)

## Status

⚠️ **Development Version** - This is currently in development. Packaged releases (`.app`, `.exe`) will be available in the future.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/camoneart/changelog-notification.git
   cd changelog-notification
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. (Optional) Set up GitHub token for higher rate limits:
   ```bash
   cp .env.example .env
   # Edit .env and add your GitHub Personal Access Token
   ```

## Development

1. Build the TypeScript code:
   ```bash
   pnpm run build
   ```

2. Run the application:
   ```bash
   pnpm run dev
   ```

## Usage

1. Start the application - it will appear in your system tray as "CL" (ChangeLog)
2. Right-click the tray icon to access the context menu:
   - **Check for Updates Now**: Manually check all sources for updates
   - **Notifications: ON/OFF**: Toggle notifications for all sources
   - **Sound: ON/OFF**: Toggle notification sounds
   - **Test Notification**: Test the notification system
   - **View CC on GitHub**: Open Claude Code CHANGELOG
   - **View React Blog**: Open React blog
   - **View Next.js Blog**: Open Next.js blog
   - **Quit**: Exit the application

## Monitored Sources

The app monitors the following sources for updates:

1. **Claude Code CHANGELOG**: [anthropics/claude-code/CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
   - Monitors Git commit SHA changes
   - Notifies on new version releases

2. **React Blog**: [react.dev/blog](https://react.dev/blog)
   - RSS feed: https://react.dev/rss.xml
   - Monitors latest blog post GUID

3. **Next.js Blog**: [nextjs.org/blog](https://nextjs.org/blog)
   - RSS feed: https://nextjs.org/feed.xml
   - Monitors latest blog post GUID

## Configuration

The app stores its configuration in your system's user data directory:
- **macOS**: `~/Library/Application Support/changelog-notification/config.json`
- **Windows**: `%APPDATA%\\changelog-notification\\config.json`
- **Linux**: `~/.config/changelog-notification/config.json`

### Configuration Options

- `notification.enabled`: Enable/disable notifications for all sources
- `notification.soundEnabled`: Enable/disable notification sounds
- `notification.pollInterval`: Check interval in minutes (5-120)
- `blogFeeds.sources`: Array of blog feed configurations
  - `name`: Source identifier (e.g., "react", "nextjs")
  - `displayName`: Human-readable name for notifications
  - `feedUrl`: RSS feed URL
  - `webUrl`: Web URL for the blog
  - `lastKnownGuid`: Last seen blog post GUID (auto-updated)
  - `lastCheckTime`: Timestamp of last check (auto-updated)

## GitHub Token (Optional but Recommended)

While the tool works without a token (60 API calls/hour), setting up a GitHub token is recommended for stability:

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Create a new token with `public_repo` permission
3. Set the `GITHUB_TOKEN` environment variable or add it to a `.env` file

## Building for Distribution

⚠️ **Note**: Package commands (`pack`, `dist`) are not yet configured. Coming soon!

## Requirements

- Node.js 18+
- pnpm package manager
- **macOS only**: `terminal-notifier` (automatically installed via Homebrew when running the app)

## Dependencies

- `@octokit/rest`: GitHub API client for CHANGELOG monitoring
- `rss-parser`: RSS feed parser for blog monitoring
- `node-notifier`: Cross-platform notification system
- `electron`: Desktop application framework

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
