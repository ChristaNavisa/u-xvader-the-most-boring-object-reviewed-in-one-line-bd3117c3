// The Most Boring Object, Reviewed in One Line — entry program.
//
// Writes one funny, true review of a boring everyday object to
// /output/entry.txt. The review is a fixed string: the program's job is to
// deliver it exactly, nothing more. No network, no randomness, no reading
// from anywhere else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The output directory comes from the environment, defaulting to /output.
// Paths are never resolved from the working directory: the grader may run
// the program from anywhere. The entry is written with no trailing newline,
// so the file holds exactly the review and nothing else.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const REVIEW =
  "My tea towel's job is drying dishes. It's been wet since Tuesday.";

// Mirror the sealed gate locally: the entry must be UTF-8 text of 1 to 200
// characters and not only white space. Fail loudly instead of shipping an
// entry the gate would refuse.
if (REVIEW.length < 1 || REVIEW.length > 200 || REVIEW.trim() === "") {
  throw new Error(
    `review fails the gate: ${REVIEW.length} characters, ` +
      `whitespace-only=${REVIEW.trim() === ""}`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${REVIEW.length} characters)`);
