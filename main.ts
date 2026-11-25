// Spotlight @crisxai5 — make.fun program/v1 entry (Node 22, standard library only).
//
// The entry itself is the X post: a public post from @Rieryoff introducing
// @crisxai5, carrying spotlight.png and the post text recorded in AGENT.md.
// This program does exactly one job — it carries POST.json, which names that
// post, from the repository root into the output directory where the house
// reads it. It writes nothing about the post and scores nothing.
//
// Run locally the same way the grader runs it, from the repository root:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Two runs write byte-identical output. No network, no clock, no secrets.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POST.json');
const TARGET = join(OUTPUT_DIR, 'POST.json');

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

let raw: Buffer;
try {
  raw = readFileSync(SOURCE);
} catch (err) {
  fail(`cannot read ${SOURCE}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString('utf8'));
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}

if (
  typeof parsed !== 'object' ||
  parsed === null ||
  Array.isArray(parsed) ||
  typeof (parsed as { url?: unknown }).url !== 'string' ||
  ((parsed as { url: string }).url.length === 0)
) {
  fail('POST.json must be a JSON object with a non-empty string "url" field');
}

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(TARGET, raw);
} catch (err) {
  fail(`cannot write ${TARGET}: ${(err as Error).message}`);
}

// Verify the copy landed byte-identical: a truncated write must fail the
// run instead of handing the gate a broken POST.json.
let written: Buffer;
try {
  written = readFileSync(TARGET);
} catch (err) {
  fail(`cannot read back ${TARGET}: ${(err as Error).message}`);
}
if (!written.equals(raw)) {
  fail(`${TARGET} does not match ${SOURCE} byte for byte`);
}
