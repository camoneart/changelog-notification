export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
  sha: string;
}

export interface NotificationConfig {
  enabled: boolean;
  soundEnabled: boolean;
  pollInterval: number; // minutes
}

export interface AppConfig {
  notification: NotificationConfig;
  github: {
    repo: string;
    owner: string;
    filePath: string;
  };
  lastKnownSha?: string;
  lastCheckTime?: string;
  blogFeeds?: BlogFeedConfig;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
}

export interface BlogFeedItem {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  description?: string;
  author?: string;
}

export interface FeedSource {
  name: string;
  displayName: string;
  feedUrl: string;
  webUrl: string;
  lastKnownGuid?: string;
  lastCheckTime?: string;
}

export interface BlogFeedConfig {
  sources: FeedSource[];
}