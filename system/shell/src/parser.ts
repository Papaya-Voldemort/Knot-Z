import { parse as shellQuote } from "shell-quote";
import mri from "mri";

export interface ParsedShellCommand {
  command: string;
  flags: Record<string, any>;
  positional: string[];
}
/**
 * Tokonizes the raw shell string and parses the base command, flags, and extra positional arguments.
 *
 * @param raw - The unparsed command string inputed by the user
 * @returns - The structured command object, or null if raw is empty or not a string
 *
 * @example
 * ```typescript
 * const result = parseShellInput('git commit -v -m "Initial commit" index.ts');
 * // result -> {
 * //   command: 'git',
 * //   flags: { v: true, verbose: true, m: 'Initial commit' },
 * //   positional: ['commit', 'index.ts']
 * // }
 * ```
 */
export function parseShellInput(raw: string): ParsedShellCommand | null {
  const tokens = shellQuote(raw).filter((t) => typeof t === "string");
  if (tokens.length === 0) return null;

  const [command, ...args] = tokens;

  const parsed = mri(args, {
    boolean: ["v", "verbose"],
    alias: { v: "verbose" },
  });

  return {
    command, // the base command
    flags: parsed, // flags and their key value pairs
    positional: parsed._, // array of leftover non-flag values
  };
}
