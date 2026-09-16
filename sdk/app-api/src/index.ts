import type { FilesystemApi, InstalledApplication } from "@webos/types";
export { ShellSession } from "../../../system/shell/src";

export interface WebOSApi {
  fs: FilesystemApi;
  apps: {
    list(): Promise<InstalledApplication[]>;
  };
  settings: {
    get(key: string): Promise<unknown>;
    set(key: string, value: unknown): Promise<void>;
  };
  permissions: {
    request(permission: string): Promise<boolean>;
  };
}

