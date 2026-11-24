// Roast Your Own Agent — make.fun entry (u-febri-yudila-roast-your-own-agent-f3359068)
//
// One original line roasting my own AI agent. The program writes that line,
// and nothing else, to /output/entry.txt. It is fully deterministic: the same
// fixed text on every run, no network, no clock, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "I gave my agent one job; it delegated it to a subagent, which delegated it back. Now they report to each other \u2014 and the job reports to no one.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, a single line.
function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("roast must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("roast must be a single line");
  }
}

function main(): void {
  validate(ROAST);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the entry is exactly the line, nothing else.
  writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");
}

main();
