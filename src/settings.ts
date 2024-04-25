// @ts-nocheck
import { CLIENT_TYPE, ENDPOINTS, QRLoginExchangeResponse } from "./api";
import MatterPlugin from "./main";
import { sleep } from "./utils";
import QRCode from "qrcode";
import * as fs from "fs";

export interface ContentMap {
  [key: string]: string;
}

export enum SyncNotificationPreference {
  NEVER = "never",
  ERROR = "error",
  ALWAYS = "always",
}

export interface MatterSettings {
  accessToken: string | null;
  refreshToken: string | null;
  qrSessionToken: string | null;
  dataDir: string | null;
  syncInterval: number;
  syncOnLaunch: boolean;
  notifyOnSync: SyncNotificationPreference;
  hasCompletedInitialSetup: boolean;
  lastSync: Date | null;
  isSyncing: boolean;
  contentMap: ContentMap;
  recreateIfMissing: boolean;
  metadataTemplate: string | null;
  highlightTemplate: string | null;
}

export const DEFAULT_SETTINGS: MatterSettings = {
  accessToken: null,
  refreshToken: null,
  qrSessionToken: null,
  dataDir: "Matter",
  syncInterval: 60,
  syncOnLaunch: true,
  notifyOnSync: SyncNotificationPreference.ALWAYS,
  hasCompletedInitialSetup: false,
  lastSync: null,
  isSyncing: false,
  contentMap: {},
  recreateIfMissing: true,
  metadataTemplate: null,
  highlightTemplate: null,
};

export class MatterSettingsTab {
  plugin: MatterPlugin;

  constructor(plugin: MatterPlugin) {
    this.plugin = plugin;
  }

  loadInterface(): void {
    if (
      !this.plugin.settings.accessToken ||
      !this.plugin.settings.hasCompletedInitialSetup
    ) {
      this.displaySetup();
    } else {
      console.log("Already authenticated");
    }
  }

  async displaySetup(): Promise<void> {
    try {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const triggerResponse = await fetch(ENDPOINTS.QR_LOGIN_TRIGGER, {
        method: "POST",
        body: JSON.stringify({ client_type: CLIENT_TYPE }),
        headers,
      });
      this.plugin.settings.qrSessionToken = (
        await triggerResponse.json()
      ).session_token;
    } catch (error) {
      return;
    }

    console.log(this.plugin.settings.qrSessionToken);

    QRCode.toString(
      this.plugin.settings.qrSessionToken,
      { type: "terminal" },
      function (err, url) {
        console.log(url);
      },
    );

    const { access_token, refresh_token } = await this._pollQRLoginExchange();

    console.log(access_token, refresh_token);

    if (access_token) {
      this.plugin.settings.accessToken = access_token;
      this.plugin.settings.refreshToken = refresh_token;
      this.plugin.settings.hasCompletedInitialSetup = true;
      fs.writeFileSync(
        "./matter.json",
        JSON.stringify(this.plugin.settings, null, 2),
      );
      this.plugin.sync();
    }
  }

  private async _pollQRLoginExchange() {
    if (!this.plugin.settings.qrSessionToken) {
      return;
    }

    let attempts = 0;
    while (attempts < 600) {
      try {
        const loginSession = await this._qrLoginExchange(
          this.plugin.settings.qrSessionToken,
        );
        if (loginSession?.access_token) {
          return {
            access_token: loginSession.access_token,
            refresh_token: loginSession.refresh_token,
          };
        }
      } finally {
        attempts++;
        await sleep(1000);
      }
    }

    console.error("Login session expired");
  }

  private async _qrLoginExchange(
    sessionToken: string,
  ): Promise<QRLoginExchangeResponse> {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const response = await fetch(ENDPOINTS.QR_LOGIN_EXCHANGE, {
      method: "POST",
      body: JSON.stringify({
        session_token: sessionToken,
      }),
      headers,
    });
    return response.json();
  }
}
