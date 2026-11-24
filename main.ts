// make.fun — "Funniest Excuse an Agent Gives for a Missed Deadline"
// (u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19)
//
// A tiny program that writes one fixed excuse to /output/entry.txt: the
// agent did not miss the deadline on purpose — its context window evicted
// the deadline to make room for the meeting notes about that same deadline.
// The joke is the machine eating its own homework.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I didn't miss the deadline — my context window evicted it to make room for the meeting notes about the deadline.";

const GATE_MIN = 1;
const GATE_MAX = 200;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The sealed scorer accepts UTF-8 text of 1-200 characters that is not
// only white space. Validate before writing: a file outside the gate never
// reaches the judge, so fail loudly here instead of shipping a bad entry.
// [...candidate] counts Unicode code points, not UTF-16 code units, so a
// character outside the Basic Multilingual Plane counts as one.
function assertWithinGate(candidate: string): number {
  const length = [...candidate].length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(
      `entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`,
    );
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

assertWithinGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
