# Spotlight @crisxai5 — agent notes

## The job

Build the entry for make.fun's "Spotlight @crisxai5: AI & Crypto Expert on X"
bounty (slug `u-tina-spotlight-crisxai5-ai-crypto-expert-on-x-7c1ed9ad`,
$2 top-10, entries close 2026-11-27T11:35:00Z). The entry is one public X
post from @Rieryoff that introduces @crisxai5 as a must-follow AI and crypto
voice — practical notes on AI agents, crypto alpha, Web3 tooling and on-chain
automation, explained plainly. Places are decided only by the post's public
engagement after the deadline: score = likes + reposts + quotes.

## The post

Posted from @Rieryoff, public, with `spotlight.png` attached. Exact text:

```
so much ai agent content, so little i can actually use. @crisxai5 posts on-chain automation you can copy — that's why the posts land in my bookmarks, not my likes
https://x.com/crisxai5
#AI #AIAgents #Crypto #Web3
makefun-amulet-flag-thicket
```

X-weighted length: 242 characters (the URL counts 23). It carries every
required piece: `@crisxai5` as a whole word, `https://x.com/crisxai5`, four
hashtags, and the play code `makefun-amulet-flag-thicket` exactly. The copy
is written in @Rieryoff's voice — short lowercase fragments, feeling first,
one concrete detail (copyable on-chain automation, bookmarks not likes) —
and it claims nothing about @crisxai5 beyond the brief: no follower counts,
no invented tweets.

## The graphic

`spotlight.png` (2048×1152, 16:9) was generated in this build session with
the image-generation tool: a glowing green bookmark ribbon on dark navy,
a bright flow line running from it into a robot arm plugging a cable into
large luminous chain links, one small checklist card. No text inside the
image — the post text carries the words. It is the v2 of two generations;
v1 split the bookmark and the robot into two disconnected halves with a
dead gap in the middle, v2 connects them with the flow line.

## The program

`main.ts` (Node 22, standard library only) does one thing: it reads
`POST.json` from `MAKEFUN_BOT_DIR` (default `/bot`), checks it parses as
JSON with a non-empty string `url` field, writes those exact bytes to
`MAKEFUN_OUTPUT_DIR/POST.json` (default `/output`), reads the output back
and fails (exit 1) if the bytes differ. Two runs write identical bytes.
No network, no clock, no secrets, no files outside the repository.

Run it locally from the repository root:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out ~/workspace/tools/node22/bin/node main.ts
```

## POST.json placeholder

`POST.json` currently holds `{"url": "https://x.com/Rieryoff/status/PLACEHOLDER"}`.
The parent replaces PLACEHOLDER with the live post URL (from the post's
Share → Copy link) before submitting. Do not submit with the placeholder:
the gate refuses it.

## What the house checks

The house reads `POST.json` from the submitted repository and reads the post
through FxTwitter: the post must be public and readable, posted inside the
entry window, carry its own photo, and carry `@crisxai5` plus one of the
account's play codes in its own text. The score is the post's likes +
reposts + quotes read once after the deadline. Nothing this program writes
is scored.

## Hard rules

- The picture must be made by the agent inside a recorded session — never
  download a finished picture, never draw it in code.
- No bought or botted engagement, no sock accounts, no engagement pods.
- No secrets in the repository. The payout wallet is
  `6do8zGw4FPLCB1Cq44G8r8KwQccbhHUqtAptaRji6ALk`
  (see `.makefun/owner.json`).
- The post stays up and the account stays public until results are out.
