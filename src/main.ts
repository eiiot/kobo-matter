import { ENDPOINTS, Feed, FeedResponse, authedRequest } from "./api";

import {
  DEFAULT_SETTINGS,
  MatterSettings,
  MatterSettingsTab,
} from "./settings";
import { remark } from "remark";
import html from "remark-html";

import * as fs from "fs";

export default class MatterPlugin {
  settings: MatterSettings;

  constructor() {
    const matterFilePath = "./matter.json";
    try {
      const matterFileText = fs.readFileSync(matterFilePath, "utf-8");
      this.settings = JSON.parse(matterFileText) as MatterSettings;
    } catch (e) {
      console.error("Failed to load settings file");
      this.settings = DEFAULT_SETTINGS;
    }

    const settingsTab = new MatterSettingsTab(this);
    settingsTab.loadInterface();
  }

  async getQueue() {
    let url: string | null = ENDPOINTS.QUEUE_FEED;
    let feedEntries: Feed[] = [];

    if (!this.settings.hasCompletedInitialSetup || !this.settings.accessToken) {
      throw new Error("No access token");
    }

    // Load all feed items new to old.
    while (url !== null) {
      const response: FeedResponse = await this._authedRequest(url);
      feedEntries = feedEntries.concat(response.feed);
      url = response.next;
    }

    const entries = Promise.all(
      feedEntries.map(async (entry) => {
        const processedContent = await remark()
          .use(html)
          .process(entry.content.article?.markdown);

        const contentHtml = processedContent.toString();

        return {
          ...entry,
          contentHtml,
        };
      }),
    );

    return entries;
  }

  private async _authedRequest(url: string) {
    if (!this.settings.accessToken) {
      throw new Error("No access token");
    }

    try {
      return await authedRequest(this.settings.accessToken, url);
    } catch (e) {
      await this._refreshTokenExchange();
      return await authedRequest(this.settings.accessToken, url);
    }
  }

  private async _refreshTokenExchange() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const response = await fetch(ENDPOINTS.REFRESH_TOKEN_EXCHANGE, {
      method: "POST",
      headers,
      body: JSON.stringify({ refresh_token: this.settings.refreshToken }),
    });
    const payload = await response.json();
    this.settings.accessToken = payload.access_token;
    this.settings.refreshToken = payload.refresh_token;

    if (!this.settings.accessToken) {
      throw new Error("Authentication failed");
    }
  }
}
