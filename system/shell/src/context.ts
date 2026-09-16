export interface ShellContext {
  cwd: string;
  env: Record<string, string>;
  stdin: string;
  stdout: (output: string) => void;
  stderr: (output: string) => void;
}

