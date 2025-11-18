import Parser from 'rss-parser';
import { BlogFeedItem, FeedSource } from '../types';

export class BlogFeedService {
  private parser: Parser;
  private sources: FeedSource[];

  constructor(sources: FeedSource[]) {
    this.parser = new Parser();
    this.sources = sources;
  }

  async checkForUpdates(): Promise<Map<string, BlogFeedItem | null>> {
    const updates = new Map<string, BlogFeedItem | null>();

    for (const source of this.sources) {
      try {
        console.log(`🔍 Checking ${source.displayName} feed...`);
        const latestItem = await this.getLatestFeedItem(source.feedUrl);

        if (!latestItem) {
          console.log(`⚠️  No items found in ${source.displayName} feed`);
          updates.set(source.name, null);
          continue;
        }

        if (!source.lastKnownGuid || source.lastKnownGuid !== latestItem.guid) {
          console.log(`✅ New update found in ${source.displayName}: ${latestItem.title}`);
          updates.set(source.name, latestItem);
        } else {
          console.log(`📋 No new updates in ${source.displayName}`);
          updates.set(source.name, null);
        }
      } catch (error) {
        console.error(`❌ Error checking ${source.displayName}:`, error);
        updates.set(source.name, null);
      }
    }

    return updates;
  }

  async getLatestFeedItem(feedUrl: string): Promise<BlogFeedItem | null> {
    try {
      const feed = await this.parser.parseURL(feedUrl);

      if (!feed.items || feed.items.length === 0) {
        return null;
      }

      const latestItem = feed.items[0];

      return {
        title: latestItem.title || 'Untitled',
        link: latestItem.link || '',
        pubDate: latestItem.pubDate || latestItem.isoDate || new Date().toISOString(),
        guid: latestItem.guid || latestItem.link || '',
        description: latestItem.contentSnippet || latestItem.content || '',
        author: latestItem.creator || latestItem.author || ''
      };
    } catch (error) {
      console.error(`❌ Error parsing feed ${feedUrl}:`, error);
      throw error;
    }
  }

  getSource(sourceName: string): FeedSource | undefined {
    return this.sources.find(s => s.name === sourceName);
  }

  getAllSources(): FeedSource[] {
    return this.sources;
  }

  updateSourceGuid(sourceName: string, guid: string): void {
    const source = this.sources.find(s => s.name === sourceName);
    if (source) {
      source.lastKnownGuid = guid;
      source.lastCheckTime = new Date().toISOString();
    }
  }
}
