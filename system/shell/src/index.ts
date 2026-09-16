import { parseShellInput, type ParsedShellCommand } from "./parser";
import type { ShellContext } from "./context";

export class ShellSession {
  public context: ShellContext;

  constructor(context?: Partial<ShellContext>) {
    this.context = {
      cwd: context?.cwd ?? "/",
      env: context?.env ?? {},
      stdin: context?.stdin ?? "",
      stdout: context?.stdout ?? console.log,
      stderr: context?.stderr ?? console.error,
    };
  }

  async execute(raw: string): Promise<number> {
    const parsed = parseShellInput(raw);
    if (!parsed) return 0;

    return this.dispatch(parsed);
  }

  private async dispatch(cmd: ParsedShellCommand): Promise<number> {
    switch (cmd.command) {
      case "echo":
        this.context.stdout(cmd.positional.join(" "));
        return 0; // Command ran successfully 
      case "pwd":
        this.context.stdout(this.context.cwd);
        return 0;
      case "clear":
        this.context.stdout("!!>CLEAR>!!")
        return 0;

      default:
        this.context.stderr(`knot-z: command not found: ${cmd.command}`);
        return 127; // Command not found
    }
  }
}

/** Desktop shell: windows, taskbar, launcher, and system UI. */
export {};