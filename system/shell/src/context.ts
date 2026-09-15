export interface shellContext {
  cwd: string;
  env: Record<string, null>;
  stdin: string;
  stdout: (output: string) => void;
  stderr: (output: string) => void;
}

