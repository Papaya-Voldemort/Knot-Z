/** Public application metadata used by bundled and future remote packages. */
export interface ApplicationManifest {
  id: string;
  name: string;
  version: string;
  entry: string;
  permissions: string[];
}

export interface FilesystemEntry {
  path: string;
  name: string;
  kind: "file" | "directory";
}

export interface FilesystemApi {
  list(path: string): Promise<FilesystemEntry[]>;
  readFile(path: string): Promise<Uint8Array>;
  writeFile(path: string, content: Uint8Array): Promise<void>;
}

export interface InstalledApplication {
  manifest: ApplicationManifest;
  source: "bundled" | "registry";
  installedAt: string;
}
