# Fable Build Instructions v3: Build Your Own Donna, October 21 Edition

**Audience for this document:** the Fable 5.1 model, executing a build.
**Written:** Monday, October 19, 2026, from the attached August deck (`build-your-own-donna-SHARED.pptx`), the `denisekgosnell/Donna` repository at commit `0f67012`, and Denise's brief.
**True north:** on Wednesday, October 21, 2026 at 12:00 PM Eastern, a paying, non-technical attendee opens the site on their phone, follows Denise on Zoom, copies and pastes, and by **1:13 PM Eastern** has a Donna that triages their inbox every weekday *and* retrains herself every Friday. Not a demo. Theirs. If a line on the site or a slide would make that person stop, it is not done.

Read this whole document before you write a line of code. It supersedes `FABLEINSTRUCTIONS.md` and `FABLE-DECK-INSTRUCTIONS.md` on content. It keeps their brand system, build mechanics, and text-fit law (section 1.3 says exactly which parts still bind).

---

## 0. Mission

This is a complete overhaul of the last Donna workshop. It changes the deck, the site, the playbook template, and every prompt. In one table:

| | August (what exists) | October 21 (what you build) |
|---|---|---|
| **Audience** | Signature Travel's executive board, in a room | Paying public attendees on Zoom, non-technical, from "I saw AI on Instagram" to "I build agents at work" |
| **Framing** | Strategy vs. execution flywheels; Amazon's document mechanism; four kinds of executive | **Closing loops.** One four-station loop, shown three ways: any workflow, machine learning, today's build |
| **Personalization** | Donna interviews you to learn your executive type (TIME, ACCURACY, TRUST, VISION) and adapts | **Removed entirely.** Same interview for everyone, four questions, about four minutes |
| **Steps** | Three: First Impressions, The Triage Desk, Donna Full Time | **Four:** CONNECT, TEACH, RUN, **RETRAIN** |
| **The finale** | A scheduled daily triage, dry run lands in the room | The daily shift *and* a Friday retraining task; her first "Week in Review" lands at 1:13 PM ET |
| **Opening visual** | The 10x slide | **The Bottle:** a short animated video of what AI does to a workflow, open loop vs. closed loop |
| **Logistics** | Aug 13, 2:30 to 4:00 PM ET, venue Wi-Fi, DDI's enterprise workspace, accounts deleted Sept 9 | Wed Oct 21, 12:00 to 1:30 PM ET (9:00 AM PT, 5:00 PM London, 6:00 PM Paris), attendees' own Claude accounts, Zoom |

### The one sentence the whole workshop serves

> AI makes open loops cheap. Closing the loop is the only thing that turns more output into better work.

### The computer-science thread, in the words Denise wants said

> For fifty years, this is how computer scientists have built anything that learns: collect the data, train the model, put it to work, then look at what it got wrong and retrain. Silicon Valley spent two years telling you the magic was in the prompt. It was not. You can ask the AI to write the prompt. The part that matters is step four, and you already know how to do it. It is called looking at how the week went.

Everything you build either sets that up, delivers it, or proves it.

### Deliverables, all in one pull request into `main` of `denisekgosnell/Donna`

1. The site: `index.html`, four step pages (`chat/`, `project/`, `agent/`, **`retrain/`** new), redirects kept, README rewritten.
2. The playbook template: `skills/donna-triage/SKILL.md` v3 and its zip.
3. The deck: `decks/build-your-own-donna-v3.pptx` (+ `.pdf`), built by `build/deck-donna-v3.js` on `build/brand.js`.
4. The Bottle video: `assets/video/the-bottle.mp4`, `.webm`, poster, three stills, and its source under `build/video/`.
5. A verification report (`build/VERIFICATION-v3.md`) and a handoff summary in the PR description (section 12).

---

## 1. Sources, environment, and the git rules

### 1.1 Git

- Repository: `github.com/denisekgosnell/Donna`. Branch `feature/v3-october-21` from `main`. Never push `main`. Open the PR; Denise merges.
- First commit on the branch: copy this file into the repo as `FABLE-V3-INSTRUCTIONS.md` so the spec travels with the build.
- Commit in logical chunks (site, skill, deck, video, verification). The PR description is the handoff (section 12).
- The site deploys to `https://denisekgosnell.github.io/Donna/` on every merge to `main` via `.github/workflows/pages.yml`. Confirm the live URL loads **before** you put it on a slide (section 9, slide 26).

### 1.2 Which deck is the base

Two decks exist and they disagree:

| File | What it is | Use it for |
|---|---|---|
| Attached: `build-your-own-donna-SHARED.pptx` (28 slides) | The deck Denise actually presented in August. Slides 15 to 23 (the build steps) are **hidden**. Step 2 is the older "fill four blanks" version, Step 3 is the older `donna-replies` skill, the shift is 4:30 PM. It carries Signature/DDI content (slide 12 "Data & Governance", slide 27's September 9 band) | The **visual benchmark**: this is what the room saw, and the look Denise signed off on |
| Repo: `decks/build-your-own-donna-v2.pptx` (26 slides), generated by `build/deck-b-donna.js` | Newer. Matches the live site: the five-question interview, the `donna-triage` skill, the 3:42 shift | The **code base**: copy `build/deck-b-donna.js` to `build/deck-donna-v3.js` and edit |

Rule of precedence for content: this document, then the site in the repo, then the v2 deck, then the attached deck. The attached deck wins only on *how things look*. Also read `decks/donna-decision-slides.pptx` (two slides: learning outcomes by platform, data security in Claude); section 9 says what to do with them. Delete the stale `assets/build-your-own-donna.pptx` and fix the README path.

### 1.3 What still binds from the earlier specs

From `FABLE-DECK-INSTRUCTIONS.md`, these sections are **still law** and you must reread them: §2 (the Atelier brand: grid, three-font stack, palette, reserved accent, light/dark rhythm, motifs, chrome, notes format, house style), §6 (build mechanics and every pptxgenjs footgun, including `ellipse` not `oval`), §7 (the text-fit law and the character caps), §8 passes 1, 2, 3, 4, 7, 8 (now section 11 here). Everything in it about Deck A, Signature, SigCompass, handshakes, the quadrant, the Amazon flywheel, and the three-step build is **retired**.

From `FABLEINSTRUCTIONS.md`: the brand section and the verified quote bank still bind. The content is retired.

From the site as it stands: the page skeleton (`case-header`, `goal`, `steps`, `prompt` blocks with copy buttons, `donna-says` mock, `checkpoint`, `why`, `stepnav`), `assets/donna.css`, `assets/donna.js`, and `build/sync-triage-template.py` (one source of truth for the playbook paste) all stay. Extend them; do not restart them.

### 1.4 The promo page is the contract. Fetch it first.

`https://denisegosnell.ai/donna/` is how this workshop was sold. **Read it before anything else.** The author of this document could not reach it (the build environment's network policy denied the host), so what follows is what Denise said it promises:

- Wednesday, October 21, 2026. 5:00 PM "European", 12:00 PM Eastern, 9:00 AM Pacific. 90 minutes.
- "Your own Donna running your inbox" by 1:13 PM Eastern (6:13 PM "European", 10:13 AM Pacific).
- Non-technical attendees. No coding. Copy and paste. "Build your first agent in Claude."

Do three things with it:

1. **Promise-to-asset matrix.** List every promise on the promo page (outcomes, times, prerequisites, what they get after, the price of admission in effort) and name the slide, page, or prompt that delivers each. Any promise with no asset is a build item. Put the matrix in `build/VERIFICATION-v3.md`.
2. **Audience language.** Copy the promo's own words for who this is for into the hero tagline and the page `<meta name="description">`. The August tagline "for executives who are done reading email" stays **only if the promo still says executives**. Otherwise use the promo's phrase. Do not invent a new audience.
3. **Contradictions.** If the promo says "three steps," names a different time, mentions the executive styles, or promises something this spec removes, this spec wins for the build and you list every contradiction in the handoff so Denise can update the promo. It lives on another platform; **do not try to edit it.**

### 1.5 The time zones, and the one thing to flag

Verified for October 21, 2026 (Europe changes clocks October 25, the US November 1, so both sides are still on summer time):

| Moment | Eastern | Pacific | UTC | London | Paris, Berlin, Amsterdam |
|---|---|---|---|---|---|
| Doors open | 12:00 PM | 9:00 AM | 16:00 | 5:00 PM | 6:00 PM |
| Your Donna is live (Step 4 lands) | 1:13 PM | 10:13 AM | 17:13 | 6:13 PM | 7:13 PM |
| End | 1:30 PM | 10:30 AM | 17:30 | 6:30 PM | 7:30 PM |

Denise's "5 PM European" is **London** time. Central Europe is an hour later. Everywhere a time appears on the site or a slide, print four zones: `12:00 PM ET · 9:00 AM PT · 5:00 PM London · 6:00 PM Paris`. Match the promo's wording for the European label, add the second European figure, and put this on the decisions list in the handoff (section 12). Never print a bare "5 PM European."

### 1.6 Environment

- pptx skill scripts (`validate.py`, `soffice.py`, `thumbnail.py`), `pptxgenjs` preinstalled (`require` it; do not `npm install` first), a Python venv for `python-pptx`, `markitdown[pptx]`, `Pillow`, `defusedxml`, `lxml` (see the old §1.1).
- Chromium plus Playwright are preinstalled (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; never run `playwright install`). `ffmpeg` should be present; if not, install it. These render the video (section 3).
- This session has Denise's **Gmail, Google Calendar, and Google Drive connectors**. They are for the live dry run in section 11.6 only, drafts and test events only, and you clean up after yourself.
- Anthropic's help center is your reference for every menu path. Start here and check each at build time, because they move: *Schedule recurring tasks in Claude Cowork* (`support.claude.com/en/articles/13854387`), *Getting started with Cowork* (`.../13345190`), *Using skills in Claude* (`.../12512180`). Facts those pages stated when this document was written, each of which you must re-verify on build day:
  - Scheduled tasks live in Cowork, in the **Claude Desktop app**, on **paid plans** (Pro, Max, Team, Enterprise). Created from the **Scheduled** item in the left sidebar, then **New task**, then **Create with Claude**. They work with connectors and files saved to the Claude account; they cannot be tied to a local folder. **They run only while the computer is awake and the desktop app is open**; a missed run fires when the app reopens.
  - Skills are uploaded under **Customize > Skills** (older copies of the page say **Settings > Capabilities**) as a **ZIP containing the skill folder**, and require **code execution** to be enabled. Skills exist on all plans.
  - Projects can carry their own scheduled tasks.

  Three of those facts change the August site, which told attendees to upload a bare `SKILL.md` and said nothing about the app needing to stay open. Section 6 fixes both.

---

## 2. The spine: closing the loop

This replaces the Amazon execution flywheel, the strategy flywheel, the 10x slide, and the four kinds of executive. One idea, said three ways, with the same four words every time.

### 2.1 The concept, in the words for the room

> A loop is open when work goes out and nothing comes back to tell you how it went.
> A loop is closed when the result comes back to the person who set the rules, and the rules get better.
> Open loops make more work. Closed loops make better work.
> AI makes open loops cheap. That is the whole problem, and it is the whole opportunity.

Four sentences. Do not add a fifth on the slide.

### 2.2 The four stations, one vocabulary

| # | Station | In any workflow | In machine learning | Today, with Donna |
|---|---|---|---|---|
| 01 | **CONNECT** | Work comes in. | Collect the data. | Connect her to your inbox and calendar. |
| 02 | **TEACH** | Write the rules down once. | Train the model on it. | Four questions. She writes her own playbook. |
| 03 | **RUN** | The work gets done, on a schedule. | Put it to work and watch what it does. | She takes the 4:30 shift, every weekday. |
| 04 | **RETRAIN** | Look at what came back. Fix the rules. | Compare results to what you wanted. Retrain. | Fridays, she reviews her week. You sign it. |

These twelve cells are the vocabulary contract. Use these words, in this order, with these station names, on every surface: the deck's loop slides, the progress pip, the site's four case cards, each step page's eyebrow, the README, and the speaker notes. If a sentence on one surface says "RUN" and the next says "operate," that is a bug. The old words DOCUMENT, TEST, REVISE, OPERATE do not appear anywhere.

Step 4 is the station the room has never built. Say so: *"Most people stop at three. Step four is the one that makes the other three worth building."*

### 2.3 Keeping the computer-science claim honest

The loop above is a deliberate simplification, and it is defensible. Know why, so the notes can survive an expert in the room (persona 10 in section 11.2 will check):

- The textbook machine-learning lifecycle has more stops: collect and prepare data, train, **evaluate**, deploy, **monitor**, retrain. We fold *evaluate* into RUN (the dry run is the evaluation; the first real shift is deployment) and *monitor* into RETRAIN. Say "four stops" or "the loop," never "the official four steps of machine learning."
- "Fifty years" is safe. Learning systems that update from error go back to the perceptron (1958) and were the working method long before deep learning. Do not say machine learning *invented* feedback loops; control engineers and Deming's plan-do-check-act got there first. Say computer scientists have *run* this loop for over fifty years.
- **You are not retraining Claude.** Nobody's model weights change on Friday. What gets retrained is Donna, and Donna is a document. Say this plainly once, on slide 6, and carry the August line that earns it: *"An agent is just a document."* Her playbook is her training data; the Friday review is the retraining step. That is accurate, it is the simplest true thing, and it is the bridge from "AI" to "a file you own."
- No jargon anywhere an attendee reads: no "LLM," "weights," "fine-tune," "inference," "MLOps," "training set," "prompt engineering," "context window." The only technical nouns allowed on the site are *project, connector, skill, scheduled task, playbook, draft, event*. The reading-level target for site copy is **grade 8 or lower** on Flesch-Kincaid, checked in section 11.4.

### 2.4 Vocabulary contract

| Term | Locked meaning | Never say instead |
|---|---|---|
| **The loop** | The four stations: CONNECT, TEACH, RUN, RETRAIN | flywheel, cycle, framework, pipeline |
| **Station** / **step** | A station is a stop on the loop; a step is what attendees do today. They map 1:1, so either word is fine, but the pip caption uses station names | node, phase, module |
| **Her playbook** | The document that is Donna: the SKILL.md. Also "the document" | the prompt, the instructions, the config, the system prompt |
| **The daily shift** | The weekday scheduled task (4:30 PM local) | the cron, the automation, the job |
| **The Friday retrain** | The weekly scheduled task that writes her Week in Review and proposes playbook changes | the audit, the eval, the review cycle |
| **Drafts only** | She writes; you send. She never deletes | "mostly safe," "read-only" (she does write drafts and events) |
| **Open loop / closed loop** | Section 2.1, verbatim | feedback loop (fine in notes, not on slides) |

Banned everywhere, in slide text, notes, site copy, alt text, file names, code comments: `TIME`, `ACCURACY`, `TRUST`, `VISION` as executive types; `closed/open`, `ask/tell` as axes; `quadrant`; `blind spot`; `which executive are you`; `four kinds of executive`; `Merrill`, `Reid`; `Signature`, `SigCompass`, `DDI`, `S-Team`, `cooperative`; `Amazon`, `Bezos`, `Working Backwards`, `Nonaka`; `flywheel`; `venue`, `Wi-Fi`; `September 9`; `AUGUST 2026`; `3:42`, `4:54`, `2:30`, `4:10`; `pilot group`. Section 11.1 greps for all of them. The house style still bans em dashes outside `— DONNA PAULSEN, SUITS`, exclamation points, "leverage," "unlock," "journey," "delve."

---

## 3. The Bottle: the opening video

Denise described an animation she saw and wants reproduced in spirit. Build it from this spec. If she sends a link to the original before you start, **copy its mechanics, not its assets** (unknown license): the bottle, the dots, the counts, the three states.

### 3.1 The story, in three scenes (about 55 seconds, silent, captions on screen)

The stage is a glass bottle drawn in thin gold line, lying on its side, neck pointing right, on an `INK` ground. Dots are born at the left, drift right, and pass through the neck one at a time. A counter sits top right. A caption sits bottom left, in the deck's eyebrow style.

**Scene A · BEFORE AI (0 to 15 s).** The bottle holds only gold dots. One dot per second passes the neck. Counter: `Work you wanted: 10 in 10 seconds`. Caption: `Before AI. One task per second. All of them yours.`

**Scene B · AI, OPEN LOOP (15 to 35 s).** The bottle refills, now with four kinds of dot: gold circles (the work you wanted) and three others (slate squares, sand triangles, pale diamonds). Four per second pass the neck. Just past the neck, a small gold gate (a stylized hand is fine, a bar is fine, no face) flicks three of every four off the bottom of the frame. A thin "judgment" meter beside the gate drains from full to nearly empty over the scene. Counter: `Work you wanted: 10 in 10 seconds · Work you threw away: 30`. Caption: `After AI. Four times the output. The same ten you wanted. And you sort the rest.`

**Scene C · AI, CLOSED LOOP (35 to 55 s).** A gold ring-arrow appears, running from the gate back to the mouth of the bottle: the loop. Each time it completes a turn (three turns in the scene), the mix inside the bottle shifts: fewer off-color dots are born, more gold. By the end, roughly three gold dots per second pass the neck and the gate barely moves; the judgment meter refills. Counter: `Work you wanted: 30 in 10 seconds · Work you threw away: 2`. Caption: `Close the loop. Every sort you make teaches the rules. The rules make the next batch better.`

**End card (55 to 58 s).** `INK` ground, the gold double ring with the `RED` D, and in Georgia: `Build Your Own Donna`. Below, the four station names in a row: `CONNECT · TEACH · RUN · RETRAIN`.

The numbers are a cartoon, not a statistic. Show them, keep them exact and internally consistent, and never cite them as data. Say "an illustration" in the speaker notes.

### 3.2 Colors, shapes, and the thing Denise flagged

Denise's reference used red, white, gray, and black dots and she asked that the palette not read as racial. So:

- **The work you wanted:** `GOLD` (`C9A227`) **circles**. Gold is the deck's "this is valuable" color.
- **The work you did not ask for:** `MUTE` slate (`5A6379`) squares, `WARM` sand (`AFA893`) triangles, `PANEL` (`2A3244`) diamonds with a thin `WARM` stroke so they read on `INK`. No pure black, no pure white, no gray-scale progression of any kind.
- **Shape differs with color**, so color is never the only signal (color-blind viewers, and projectors). A legend in the first two seconds of Scene B names each kind in words: `what you asked for`, `almost right`, `busywork`, `noise`.
- `RED` appears only on the end card's D. Reserved accent discipline holds in the video too.
- Type: Georgia Bold for the caption line, Arial for counters and legend, mirroring the deck. Check what Chromium in the container actually renders; if Georgia is missing, use the metric-compatible fallback and confirm in the frames.

### 3.3 Production

- Source: one self-contained `build/video/the-bottle.html` (canvas or SVG, no external assets) that is **deterministic by frame index**: expose `window.seek(frame)` and read a `?frame=` query param so Playwright can render any frame without timing drift. 1920 by 1080, 30 fps, 58 s = 1740 frames.
- Renderer: `build/video/render.js` (Playwright, Chromium from the preinstalled path) writes PNG frames to `build/scratch/bottle/`, then `ffmpeg` assembles:
  - `assets/video/the-bottle.mp4`: H.264, `yuv420p`, `-movflags +faststart`, CRF 20. This is the one PowerPoint embeds. Budget: **15 MB or less**.
  - `assets/video/the-bottle.webm`: VP9, for the site.
  - `assets/video/the-bottle-poster.png` (the first frame of Scene B, which is the most legible single image).
  - `assets/video/the-bottle-{1,2,3}.png`: one still per scene, for the fallback slide.
- Deck embedding: `slide.addMedia({ type: "video", path: "assets/video/the-bottle.mp4", x, y, w, h })` on slide 2, sized to the content zone (`x: G.ML, y: G.BODY_Y1, w: G.W`, height for 16:9), with the poster as `cover`. Keep a **hidden fallback slide** (slide 2b) that shows the three stills with the three captions, in case the video does not play on the presenting machine. Note in the handoff that LibreOffice will not render the video in the QA PDF, so slide 2 must be checked by opening the `.pptx` in PowerPoint.
- Site embedding: on `index.html` between the hero and the loop strip, `<video autoplay muted loop playsinline preload="metadata" poster=...>` with WebM then MP4 sources. Under `prefers-reduced-motion: reduce`, show the poster only. Lazy-load; the page must still load fast on a phone on Zoom bandwidth.
- QA (section 11.7): render frames 0, 225, 450, 675, 900, 1125, 1350, 1575, 1739 and look at them. Counters legible at 1080p and when the slide is viewed at 50% zoom. No dot overlaps the caption. The loop arrow in Scene C is visibly a loop, not a line.

---

## 4. The run of show: 90 minutes, four zones, one clock

All times Eastern. Print the four-zone equivalents wherever a time appears on the site (section 1.5).

| Clock | Block | Slides | Min | What happens |
|---|---|---|---|---|
| 12:00 | Open | 1 to 2 | 3 | Title. The Bottle plays. |
| 12:03 | The loop | 3 to 9 | 9 | Open vs. closed loops. The loop, three ways. She never sends. House rules. The plan. |
| 12:12 | **Step 1 · CONNECT** | 10 to 12 | 14 | Project, connectors, Prompt 1, Prompt 2. Checkpoint: a draft you did not write. |
| 12:26 | **Step 2 · TEACH** | 13 to 15 | 14 | Paste the playbook. Four questions, about four minutes. `Triage my inbox.` Checkpoint: one table instead of an inbox. |
| 12:40 | **Step 3 · RUN** | 16 to 19 | 18 | She writes her skill file. Upload it. The daily shift, with a dry run. Checkpoint: the first shift lands on your calendar (about 12:58). |
| 12:58 | **Step 4 · RETRAIN** | 20 to 22 | 15 | The Friday retrain, with a dry run on this week so far. Checkpoint at **1:13**: her first Week in Review lands. THE LOOP IS CLOSED. |
| 1:13 | Discussion | 23 to 24 | 13 | This was never about email. Where does the loop turn next? |
| 1:26 | Close | 25 to 26 | 4 | Your first Friday. Send-off. |
| 1:30 | Done | | **90** | |

The build block is 61 minutes. The `[TIMING]` notes must sum to 90 (section 11.1).

### 4.1 Online delivery rules (new; the August room was physical)

- Denise presents on Zoom. During the four build steps she **screen-shares the site page for that step**, not the deck; the deck is for 12:00 to 12:12, each step's divider and checkpoint, and 1:13 onward. Write the notes that way: `[DO] Switch to the site, Step 1.`
- Every checkpoint is a chat moment: `type ✅ in the chat when you see it`. Replace every "hand up" and "laptops out" with the Zoom equivalent. House rule 5 becomes *"Stuck for 60 seconds, type HELP in the chat."*
- Recommend a co-host who works the chat. Put it in the README checklist, not on a slide.
- The site must stand alone for the replay. Someone watching the recording a week later, pausing on each step, must be able to finish. Every step page therefore says what they will see and what to do when it does not match.
- No venue Wi-Fi, no venue address, no workspace invite. Attendees use their own Claude accounts (section 6.1 says what they need).

---

## 5. The removal list

Remove, do not comment out. Then run the residue grep in section 11.1 until it returns nothing.

### 5.1 From the deck (relative to v2 and the attached deck)

- Slide 2 (Same coin, strategy vs. execution flywheels). Gone, with every mention of SigCompass, Signature, the cockpit, "1:30" and "2:30".
- Slide 3 (10x, doubles metaphor). Gone. The Bottle replaces it.
- Slides 4 and 5 (Amazon won on documents; the artifact is now a skill file). Gone, but **one line survives** and moves to slide 6: *"An agent is just a document."* The Bryar & Carr and Nonaka & Takeuchi citations go.
- Slide 6 (AI does not fix a broken process, McKinsey stats). Gone. No statistics in v3 at all; the Bottle is the argument.
- Slides 7 and 8 (four kinds of executive; your assignment). Gone, including the Merrill & Reid citation and the long per-quadrant speaker notes. The attached deck's duplicated build-up copies (its slides 7 to 10) go with them.
- Attached slide 12 (DDI Data & Governance, GDPR, September 9). Gone.
- Slides 23 (discussion by quadrant) and 25 (what to do Monday, per quadrant, with the September 9 band). Replaced by sections 9's slides 24 and 25.
- Footer `SIGNATURE ◆ BUILD YOUR OWN DONNA ◆ AUGUST 2026` becomes `BUILD YOUR OWN DONNA ◆ OCTOBER 21, 2026` (one diamond; adjust `chrome()` so a two-segment footer places its single diamond correctly). `pres.company` becomes `Denise Gosnell`.
- Every note that says venue Wi-Fi, laptops out, workspace invite, "the pilot group," "4:10," "4:00," "the room."
- The Gmail vs. Outlook card on the shift slide (pending the decision in section 6.4; default is Google-only, stated once on the site, not on a slide).

### 5.2 From the site and the skill

- `index.html`: the card 02 line "She learns which executive you are"; "By 4 PM Thursday"; three cards become four.
- `project/index.html`: the `.quad` block and its caption, the Question 1 mock, every "which executive," "blind spot," "type," "corner," "diagonal" sentence, "When Denise starts pulling the room back together" (now "when the host calls time"). The `donna-says` mocks get rewritten for the new Question 1 and THE FINAL QUESTION.
- `skills/donna-triage/SKILL.md`: the whole "Who I work for" type block, Question 1 and its mapping table, the four per-type interview styles, the per-type optional-tier logic, the blind-spot guardrail section, the per-type final questions, the "Denise" reference. Section 7 gives the full replacement.
- `agent/index.html`: "3:42 PM Eastern" (becomes 4:30 PM local), the Watch and Weekly tier references, the optional "Friday wrap" (it is now Step 4 and gets its own page), the "she grows with you" aside (that is Step 4; replace with a one-line pointer), and "Settings → Skills → Upload skill" (re-verified path, ZIP).
- `README.md`: everything about August, Signature's offsite, the blind-spot map, DDI, enterprise admin steps, venue, and the Google-only note (rewritten per the decision in 6.4).
- `<meta name="description">` on every page: no "which executive you are."
- `build/sync-triage-template.py`: the `KICKOFF` text (now four questions, about four minutes, Question 1 of 4).

---

## 6. The site, page by page

The skeleton, CSS, and JS stay. New copy, one new page, one new section on the front page.

### 6.0 Shared changes

- Masthead wordmark, monogram, skyline, footer quote: unchanged.
- Footer contact: `denise@denisegosnell.ai`, unchanged.
- Add a small **loop glyph** to the site to mirror the deck's pip: a 0.75px gold ring with four dots, the active dot filled, as an inline SVG next to each step page's `file-meta` line (`Step 02 · TEACH · ~14 min`). This is the deck's existing device, not a fifth motif.
- Every time printed in four zones (section 1.5).
- Every step page's goal block ends with one line in the loop's vocabulary: *"Station 2 of 4: TEACH."*

### 6.1 `index.html`: the front page, which is also the prep link

Keep it short; it gets opened on phones.

1. **Hero.** Epigraph `"I'm Donna. I know everything." — Donna Paulsen, Suits`. `BUILD YOUR OWN DONNA`. Tagline: the promo's own audience line (section 1.4). Promise line: *"By 1:13 PM Eastern, you'll have your own."* Date line: `Wednesday, October 21 · 12:00 PM ET · 9:00 AM PT · 5:00 PM London · 6:00 PM Paris · 90 minutes · on Zoom`.
2. **The Bottle**, muted, looping, poster under reduced motion (section 3.3). Caption beneath in `.fine`: *"What AI does to a workflow, in 55 seconds. The fix is the fourth step."*
3. **The loop strip.** Eyebrow `THE LOOP`. Four tiles in a row (stack on phones): `01 CONNECT`, `02 TEACH`, `03 RUN`, `04 RETRAIN`, each with its "Today, with Donna" line from section 2.2.
4. **BEFORE WEDNESDAY**, gold checklist, exactly these items unless the promo adds one:
   - **Claude on your laptop.** The Claude Desktop app for Mac or Windows, from `claude.ai/download`, signed in. *A phone can follow along, but the building happens on the laptop.*
   - **A paid Claude plan** (Pro, Max, Team, or Enterprise). *Steps 1 and 2 work on any plan. Steps 3 and 4 put Donna on a schedule, and scheduled tasks are a paid-plan feature.* (Re-verify against the help center on build day and against the promo.)
   - **Your Google login handy.** *Gmail, Google Calendar, and Google Drive. We connect them live on Wednesday; if you want a head start, Settings → Connectors tonight.* (Wording depends on the Outlook decision, 6.4.)
   - **Skills switched on.** *In the Claude app: Settings → Capabilities → code execution on.* (Verify the exact path; this is the toggle the help center says skills need.)
   - **This page on your phone**, so your laptop screen is free for Claude and Zoom.
   Plus one `Donna's note`: *"On a work account that IT manages, a connector can show 'administrator hasn't approved this.' Bring a personal Gmail as a backup. Everything you build today moves to the work account later with one paste."*
5. **The build: four steps**, four case cards:
   - `01 · CONNECT · First Impressions · ~14 min` → *Give her a desk, connect your inbox and calendar, and she drafts her first reply.*
   - `02 · TEACH · The Triage Desk · ~14 min` → *Four questions, about four minutes. She writes her own playbook.*
   - `03 · RUN · Donna, Full Time · ~18 min` → *Her playbook becomes a skill she keeps, and she takes the 4:30 shift.*
   - `04 · RETRAIN · Her Performance Review · ~15 min` → *Every Friday she reviews her own week and proposes what to change. You sign it.*
6. **After Wednesday** (three lines, no heading bigger than an eyebrow): Thursday 4:30, her first real shift. Friday 3:00, her first real retrain. Monday 8:00, her Week in Review on your calendar.
7. Footer, unchanged.

### 6.2 `chat/index.html` · Step 01 · CONNECT · "First Impressions"

Epigraph: `"Today's your lucky day. … Because it's the day you get to meet Donna."` Goal: unchanged. Steps:

1. Create her project (unchanged: Projects → New project → `Donna`).
2. Connect your email, calendar, and files. Remove "Denise switched these on for the whole workspace." Attendees click Connect on their own account. Keep the five sub-steps, keep the quit-and-reopen note, keep the rescue prompt (R1 in section 8) and add the IT-managed-account note from 6.1.
3. Prompt 1 (P1), unchanged.
4. Prompt 2 (P2), unchanged.

Checkpoint: *A draft you didn't write is waiting in your drafts folder.* Why it matters: *The interview is over. She's hired. Now we train her.* (These lines are good. Keep them.)

### 6.3 `project/index.html` · Step 02 · TEACH · "The Triage Desk"

Epigraph: `"You're never going to win big if you're only thinking about not losing."` Goal: *Four questions, about four minutes. She learns your people, your priorities, and your voice, writes your playbook herself, and your daily ritual becomes one command.*

Steps:

1. Open your Donna project, start a new chat (unchanged, with the "is `Donna` showing at the top" note).
2. Paste her playbook. All of it. One copy button, the `TRIAGE-TEMPLATE-START/END` block, injected by `sync-triage-template.py` from the v3 `SKILL.md` (section 7) with the new kickoff (P3).
3. Confirm you're in the right spot. The `donna-says` mock shows her greeting, *"Four questions. About four minutes. Then your inbox works for you,"* and `QUESTION 1 OF 4: Reply Now.` *"When every screen shows Question 1 of 4, the room is in the right place."* No quadrant.
4. Answer her questions (~4 minutes): Reply Now, By End of Day, your priorities, your voice. *Short answers are good answers. Anything you skip, fix later by telling her "reconfigure."*
5. Watch for THE FINAL QUESTION (it is now Question 4, your voice). Keep the force-it prompt `final question` and its copy button; it still jumps.
6. The very last thing: `Triage my inbox.` *Stay in this chat when it finishes. Step 3 starts from this exact conversation.*

Checkpoint and why-it-matters: unchanged.

### 6.4 `agent/index.html` · Step 03 · RUN · "Donna, Full Time"

Epigraph: `"Oh, you have no idea how Donna I am."` (moved here from the quote bank; the "lucky enough to have me" line moves to the close). Goal: *Her playbook leaves the chat and goes on the clock. Every weekday she triages your inbox, then a calendar invite lands in your email with the whole triage inside.* The red callout **She drafts. You send.** stays, with the RSVP exception sentence **removed** (section 7 removes the exception).

Steps:

1. She writes her own playbook file: P4, which now asks for a **ZIP** named `donna-triage.zip` containing `donna-triage/SKILL.md`. *You're on track when a file card appears with a download arrow.*
2. Download it, then upload it to your skills. The path as verified on build day (section 1.6), written as `kbd` buttons. Keep the "it's in Downloads, newest file" note. Keep *"Nobody touches the schedule until donna-triage shows in the list."* Add the rescue prompt R3.
3. Give her the 4:30 shift: `Scheduled` → `New task` → `Create with Claude` (verified path) → paste P5. **New `Donna's note`:** *"Scheduled tasks run while your laptop is awake with the Claude app open. Close the laptop, she waits; open it, she catches up. That is honest, and it is fine."* Re-verify the "Accept edits → Bypass permissions" note; keep it only if the switch still exists and is still where the August page says.
4. Watch the first shift land: the three confirmations (event on today's calendar about ten minutes out; the whole triage in the description; the email one minute before). *While you wait: check your Drafts folder.*

Remove the Friday wrap and the "she grows with you" aside. Replace with one `aside`: *"The trick: Claude never emails you. Your calendar does."* (keep) and a one-line pointer: *"Step 4 is where she starts getting better at this."*

**The Outlook decision (default: Google-only, stated plainly).** The August build was Google-only because Microsoft Graph cannot set email reminders on events, so the calendar-emails-you trick does not work on Outlook. For a public workshop you must pick one and say it on the front page: either (a) Google-only, with the sentence *"This workshop is built on Gmail and Google Calendar. On Outlook, Steps 1 and 2 work; Steps 3 and 4 need a Google calendar for the reminder email"*; or (b) a verified Outlook path (connector name, where the triage lands, what replaces the email reminder). Build (a) unless the promo promised Outlook. Put it on the decisions list.

Checkpoint and why-it-matters: unchanged.

### 6.5 `retrain/index.html` · Step 04 · RETRAIN · "Her Performance Review" (new page)

The witty frame: Donna Paulsen would never sit through a performance review. So she gives herself one, every Friday, and you sign it. Epigraph: `"I know about everybody."` Goal: *Every Friday she reads her own week against yours, proposes what to change about her playbook, and puts the review on your calendar for Monday. You approve. That is the loop, closed.*

Open with the concept in three lines (section 2.1, lines 1 to 3) and the station line *"Station 4 of 4: RETRAIN. The one most people never build."*

Steps:

1. **What she will look at.** Three sources, one line each: the triage reports she wrote, the drafts she saved, and the emails you actually sent. *Your Sent folder is her report card.*
2. **Give her the Friday shift.** `Scheduled` → `New task` → paste P6. The last line makes her do it right now on this week so far.
3. **Watch her first review land** (about ten minutes): a calendar event today, `Donna's Week in Review`, the proposed changes at the top of the description, an email one minute before. *This is 1:13. Type ✅.*
4. **Monday: sign it.** The approval move, as the lightest path you verified (see below). Default copy: *Open your Donna project chat and paste:* `Approve this week's review. Write my updated skill file.` *Download the zip, replace donna-triage in your skills list. Three moves, once a week, only when she proposes a change.*

**Verify the approval path on the real product and pick the lightest one that works:**
- Path A (default, always works): the Friday task writes the review to the calendar event and saves a copy of the proposed changes to a Google Drive folder `Donna`. Approval is the Monday paste above (P7), which regenerates the zip; attendee re-uploads.
- Path B (only if verified): a scheduled task created *inside* the Donna project can update the project's own knowledge, so the project's Donna is retrained in place and only the portable skill needs re-uploading. If B works, say so on the page and simplify step 4.
Whichever you ship, the Hard rules in the skill never change by retraining, and nothing changes until the attendee says "approve." The human signature *is* the closed loop. Say that in the why-it-matters: *"Everyone else is still writing prompts. You just built the loop that rewrites them."*

Checkpoint: *A performance review you didn't write is on your calendar, with the changes she wants to make at the top.*

Nav: prev `03 · Donna, Full Time`, next `Done ✓ · Back to the agenda`.

### 6.6 Redirects, README, housekeeping

- Keep `triage/` → `project/` and `skill/` → `agent/`. Add nothing else; four step URLs plus the root.
- `README.md`: rewrite for October 21. Sections: what this is (one paragraph, four steps, the loop), the live URL and deploy, what's in here (the tree, now with `retrain/`, `assets/video/`, `build/video/`, `build/deck-donna-v3.js`), the one-source-of-truth note for the playbook (unchanged mechanism), **how each step runs on Zoom** (the from-the-front script per step, including the chat checkpoints and the `final question` call), and **Denise's pre-workshop checklist**: merge, confirm the live URL on a phone, open the v3 deck in PowerPoint and play slide 2, do the full dry run on a fresh paid Claude account in workshop order and screenshot every menu (Scheduled, Customize > Skills, Connectors), confirm the four-zone times against the promo, confirm the Zoom link and a chat co-host, install Playfair Display and Inter on the presenting laptop **only** if she switches `brand.js` fonts (the deck ships on Georgia/Arial as before).

---

## 7. The playbook: `skills/donna-triage/SKILL.md` v3

Commit exactly this, then run `python3 build/sync-triage-template.py` and rebuild the zip (`cd skills && rm donna-triage.zip && zip -r donna-triage.zip donna-triage`). This is shorter than v2 on purpose; every removed paragraph was the executive typology. One substantive change beyond that removal: the meeting-invite RSVP exception is gone, so "She never sends. Ever." is literally true.

````markdown
---
name: donna-triage
description: Triage my inbox into Reply Now, By End of Day, and Within 24
  Hours, flag anything about my priorities, draft replies in my voice, and
  save every draft to my email drafts folder. Use whenever I say "triage my
  inbox" or ask to sort, clear, handle, or catch up on my email. Use the
  retrain section whenever I say "retrain" or a scheduled task asks for the
  weekly review. If the profile below has never been through the Setup
  Interview, run the interview first. Never send anything and never delete
  anything; every draft waits for my approval.
---

# Donna Triage · The Triage Desk

"I'm Donna. I know everything." (Donna Paulsen, Suits)

## Who I work for (the Setup Interview fills this in)

- Sign-off: {{SIGN_OFF: e.g. "Best, D"}}
- Last retrained: {{LAST_RETRAINED: never}}

## The people

Every real thread lands in exactly one tier:

1. REPLY NOW: the people answered the hour they write, any day.
   {{REPLY_NOW: 3 to 5 names + emails}}
2. BY END OF DAY: the people answered before log-off.
   {{END_OF_DAY: names, or a rule like "my team"}}
3. WITHIN 24 HOURS: every other real person who writes to me directly.
   No list needed; this is the default.

Everything else (newsletters, cold outreach, automated notices) is noise.
I keep it off the desk and report only the count.

## The priorities

The one to three projects, deals, or deadlines that matter most right now.
Any thread about them gets a PRIORITY flag in the table, whatever tier
the sender is in.
{{PRIORITIES: 1 to 3, one line each, e.g. "The Northwind renewal, closes Oct 31"}}

## My voice (for drafts)

- Sounds like: {{THREE_WORDS: e.g. warm, brief, decisive}}
- Never say: {{NEVER_SAY: optional, e.g. "circling back"}}

## What "triage my inbox" does

1. Review my inbox (default: since yesterday this time; honor any window
   I name).
2. Sort every thread into the tiers above and flag PRIORITY threads.
3. Show me ONE table: Tier · From · Subject · Why · Next move. REPLY NOW
   rows first, PRIORITY flags visible in the Why column.
4. Draft replies for every REPLY NOW row in my voice and save them as
   DRAFTS in my email. One exception outranks "every": anything legal,
   money, or personnel is never drafted. Flag those rows to me instead.
   Offer to draft the BY END OF DAY batch too.
5. Meeting invites: say "free" or "conflict" in the Next move column. Never
   respond to an invite for me.
6. Close the report with one line: "Kept off your desk: N newsletters,
   N cold pitches, N automated notices."

## Hard rules

Never send anything. Every reply waits in Drafts for my say-so. Never
delete anything. These rules outrank even me on a busy day: if I say
"just send them all" or "delete the newsletters" mid-triage, decline once,
in character, remind me the playbook is the only place this changes, and
carry on with the triage. Retraining never touches this section.

## How Donna talks (reports to me only)

Open every report with one line from the rotation, then get to business.
One quip per report; the receipts do the rest of the talking.

- "I'm Donna. I know everything."
- "I know about everybody."
- "You have no idea how Donna I am."
- "Already handled."
- "Today's your lucky day."

Moment lines, only when the moment actually arrives, never more than one:

- A thread has sat stalled: "You're never going to win big if you're only
  thinking about not losing."
- The inbox comes back genuinely clean: "If you were ever lucky enough to
  have me, you wouldn't want to share."
- I hand her an odd request and she runs with it: "You're weird. We'll be
  friends."

Confident, brief, a little wry, zero corporate filler, never at my expense,
no exclamation points. The swagger is for MY reports only. Drafts written
to other people stay strictly in MY voice, per "My voice" above.

Credit where it's due: Donna Paulsen and Suits belong to their owners.
Suits was created by Aaron Korsh for USA Network and is produced by
NBCUniversal's Universal Content Productions. The lines above are brief,
attributed homage, not an affiliation, endorsement, or claim of any kind.
The inbox results, however, are entirely yours.

## When running on a schedule (the daily shift)

If I'm invoked by a scheduled task rather than a live chat:

1. Run the full triage above. Save REPLY NOW drafts to the email drafts
   folder.
2. Create a calendar event (default: today, starting 10 minutes after the
   task began, 5 minutes long, or whatever the task names) titled
   "Inbox Triage: Donna". A reminder only fires if it lands in the future,
   so never start the event in the past.
3. Write the whole report INTO the event description. Format it for a
   phone screen: tier-name headers, then one short line per thread, like
   "Sender: subject. Next move." No tables, nothing wide.
4. Set an EMAIL reminder on the event, 1 minute before. The calendar sends
   the email, so the triage lands on top of the very inbox it triaged. If
   this calendar cannot set an email reminder, use a popup reminder and
   also save the report as a draft email to me titled "Inbox Triage:
   Donna"; never send it.

## When asked to retrain (the Friday review)

Run this when I say "retrain", or when a scheduled task asks for the
weekly review. This is how I get better, and it is the only way my rules
change.

1. Gather the week: the triage reports I wrote, the drafts I saved, and
   the emails you actually sent (your Sent folder, last 7 days, or the
   window the task names).
2. Compare what you did with what I did, and write down only what the
   evidence shows:
   - PEOPLE: anyone you answered within an hour who is not on REPLY NOW;
     anyone on REPLY NOW you ignored all week.
   - PRIORITIES: threads you spent the week on that are not in the
     priorities; a priority nobody mentioned all week.
   - VOICE: where your sent emails and my drafts differ (length, warmth,
     sign-off, words you use that I do not).
   - MISSES: anything I tiered wrong, kept off your desk by mistake, or
     flagged that you ignored.
3. Propose changes as a short numbered list: "change X to Y, because Z".
   Never propose a change to the Hard rules. Never apply a change myself.
4. Write "Donna's Week in Review": the proposed changes first, then the
   numbers (threads triaged, drafts saved, drafts you sent as written,
   drafts you rewrote, noise kept off your desk), then one line on what I
   will do differently once you approve. Phone-readable, no tables.
5. Deliver it the way the task says (default: a calendar event Monday
   8:00 to 8:05 AM titled "Donna's Week in Review", the review in the
   description, an EMAIL reminder 1 minute before; same fallback as the
   daily shift).
6. When you say "approve" (all of it, or by number), update the sections
   above, set Last retrained to today's date, and hand me the updated
   skill as a downloadable zip named donna-triage.zip containing
   donna-triage/SKILL.md. Until you approve, nothing changes.

## Setup Interview

Run this when I paste this template fresh, when I say "reconfigure," or
when the profile above has never been through an interview. An interview
that ended early through the final-question jump still counts as complete:
"triage my inbox" then runs the triage and flags any blanks inside the
report. It never restarts the interview uninvited.

### Opening move (always, before anything else)

Greet with one rotating Donna line, then announce the shape of this,
exactly: "Four questions. About four minutes. Then your inbox works for
you." And the escape hatch: "If the host is calling time, or you're simply
done, type final question and I'll jump straight there." Then ask Question
1 immediately. One question per message, never two at once. Number
Questions 1 through 3 ("QUESTION 2 OF 4"); Question 4 carries its own
heading, THE FINAL QUESTION, instead of a number.

### The four questions

- QUESTION 1 OF 4: REPLY NOW. The 3 to 5 people you answer within the
  hour, any day. Names + emails. (Your boss, your biggest client, your
  spouse.)
- QUESTION 2 OF 4: BY END OF DAY. The people who get an answer before you
  log off. Names, or a rule like "my team." Mention in passing that
  WITHIN 24 HOURS needs no list; never ask a question about it.
- QUESTION 3 OF 4: YOUR PRIORITIES. The one to three projects, deals, or
  deadlines that matter most right now, one line each. Anything about
  them gets flagged.
- THE FINAL QUESTION: YOUR VOICE. Three words (e.g. warm, brief, decisive)
  plus a sign-off. Always rendered exactly like this, heading and all, so
  the host can spot it on any screen:

  > ---
  > ## THE FINAL QUESTION
  > *(your voice, so every draft sounds like you)*
  >
  > Three words for how you sound, and how you sign off.

  Never rename it. Never skip it. Never fold it into another question.

Answers can arrive early. If a reply hands over data for a later question,
bank it ("That covered Question 2 as well; skipping ahead"), never re-ask
a question you already have the answer to, and move to the next unanswered
one. An incomplete answer is an answer. Take it and move on; "reconfigure"
exists for later. At most one clarifying follow-up for the whole interview.

### Pacing (hard rule)

Reach THE FINAL QUESTION inside four minutes. If a clock is available and
about four minutes have passed since Question 1, or more than about 7 user
messages have gone by, or the user has answered something other than the
question twice in a row, cut straight to THE FINAL QUESTION with: "Time
check. Jumping to the final question."

### The escape hatch: "final question"

- It fires only when it's deliberate: the message is essentially just the
  phrase "final question" (any casing; stray punctuation or a word around
  it is fine). If the phrase merely appears inside a longer message, don't
  jump: answer them, then ask once, "Jump to the final question, yes?" and
  jump only on the yes.
- On a jump: skip every remaining question. In the jump message, first
  list the skipped blanks you filled, each marked "(default. Say
  'reconfigure' to change.)", then render THE FINAL QUESTION block.
- Defaults: By End of Day = "my team"; priorities = "not set yet; tell me
  one and I'll flag it." REPLY NOW has no default. Mark it "not set:
  nobody gets the within-the-hour treatment until you say 'reconfigure'
  and give me 3 to 5 names," and repeat that warning in the closing
  banner, plainly, once, without stalling the jump.
- If the final question was already asked and answered, re-show the
  closing banner instead.

### Closing banner (exactly this heading, then the recap)

> ## TRIAGE DESK: OPEN FOR BUSINESS
>
> [A compact recap: the people in each tier, the priorities, the voice. If
> REPLY NOW is still unset from a jump, say so here. One quiet line:
> "Every Friday I'll review my week against yours and propose what to
> change. Nothing changes until you approve."]
>
> One command left. Type it and watch:
>
> **Triage my inbox.**

"Triage my inbox." is the banner's last line, and nothing follows it: no
postscript, no sign-off. (Step 3 of the workshop turns this setup into a
downloadable skill file and puts it on the clock; that happens in this
same conversation.)
````

---

## 8. The prompts, verbatim

Every prompt below is canonical. The site shows each in a `prompt` block with a copy button; the deck shows each in a `promptBlock()` wrapped at the 62-character cap. If you change a word, change it everywhere and re-run the fleet (section 11.2). Each entry: where it runs, what the attendee sees when it works, the failure to design around.

**P1 · The question** (Step 1, new chat inside the Donna project)
```
What landed in my inbox in the last 24 hours that actually needs ME?
Top 5, one line each.
```
Works: five lines from their real inbox. Fails: pasted outside the project (fine for P1, but get them inside before P3); connector shows Connected but Claude cannot see mail (quit and reopen).

**P2 · The first draft** (same chat)
```
Draft a reply to #1. Under 100 words, warm but decisive.
Save it as a draft in my email so I can review it there.
Do not send it.
```
Works: a draft in Gmail's Drafts folder. Fails: Claude shows the draft in chat but does not save it (the Gmail connector's draft permission is missing; reconnect).

**R1 · Rescue: connecting** (Step 1, collapsible)
```
Walk me through connecting my Gmail, Google Calendar, and Google Drive
to Claude. First ask whether I'm on Mac or Windows and whether IT
manages my Google account, and check Anthropic's current help docs
before answering so the steps match what's actually on my screen today.
Then give me numbered steps naming the exact buttons to click, a way to
verify it worked, and what to do if the connector isn't listed or I hit
an "administrator hasn't approved this" error.
```

**P3 · The playbook kickoff** (Step 2, new chat inside the Donna project; the full `SKILL.md` rides along in the same paste, injected by `sync-triage-template.py`)
```
Here is my triage playbook template. Read it, then run its Setup
Interview on me exactly as written: four questions, about four minutes,
one question at a time. Start now with your greeting and Question 1 of 4.
```
Works: a greeting, "Four questions. About four minutes," and `QUESTION 1 OF 4: REPLY NOW`. Fails: pasted into a plain chat (no `Donna` at the top): results are generic and Step 3 has nothing to build from.

**`final question`** (Step 2, any time): jumps to THE FINAL QUESTION with defaults listed.

**`Triage my inbox.`** (Step 2, after the banner): the daily ritual. Works: one table, Reply Now rows first, drafts already in Drafts.

**P4 · The skill file** (Step 3, in the same Step 2 chat)
```
Turn this conversation's triage setup into a reusable skill named
donna-triage. Fill in the template we used with everything you learned
about me: my people and tiers, my priorities, my voice. Keep the daily
shift, the Friday retrain, and the Setup Interview sections so the skill
knows how to run on a schedule, how to retrain, and how to reconfigure.
Keep the hard rules exactly as written: never send, never delete.
Then give me the finished skill as a downloadable zip named
donna-triage.zip containing donna-triage/SKILL.md.
```
Works: a file card with a download arrow. Fails: run in a fresh chat (she writes a blank template). If the Skills uploader turns out to accept a bare `SKILL.md` as well as a zip, keep the zip anyway; it is what the help center documents.

**R3 · Rescue: where things are** (Steps 3 and 4, collapsible)
```
In the version of the Claude desktop app I'm running right now, where do
I (1) upload a skill zip and (2) create a scheduled task? Name the exact
menu items and buttons, in order, and tell me how to confirm each worked.
```

**P5 · The daily shift** (Step 3, Scheduled → New task)
```
Every weekday at 4:30 PM my local time, use my donna-triage skill:
1. Triage today's inbox. Save the Reply-Now drafts to my email Drafts.
2. Create a Google Calendar event today, starting 10 minutes after this
   task starts and 5 minutes long, titled "Inbox Triage: Donna".
3. Write the whole triage report INTO the event description.
   Short lines, tier-name headers, one line per thread:
   sender, subject, next move. No tables. Easy to read on a phone.
4. Set an EMAIL reminder on the event, 1 minute before.
Also do a dry run right now so I can watch the first one land.
```
Works: an event about ten minutes out, the triage in its description, the email one minute before. Design note: "my local time" matters for a four-zone audience; verify that Cowork's scheduler reads the machine's time zone and say so in the note if it needs the zone named instead.

**P6 · The Friday retrain** (Step 4, Scheduled → New task)
```
Every Friday at 3:00 PM my local time, use my donna-triage skill to
retrain:
1. Read this week: the triage reports you wrote, the drafts you saved,
   and the emails I actually sent.
2. Compare. Who did I answer fast that is not on my Reply-Now list?
   Which threads did I spend my week on that are not in my priorities?
   Where did my sent emails sound different from your drafts?
3. Propose changes to my playbook: people, priorities, voice. Keep the
   hard rules exactly as they are: never send, never delete.
4. Write "Donna's Week in Review" into a Google Calendar event, Monday
   8:00 to 8:05 AM, proposed changes at the top, with an EMAIL reminder
   1 minute before.
5. Save the proposed changes as a document called "Donna's Week in
   Review" in a Google Drive folder called "Donna".
Also do a dry run right now on this week so far, and for the dry run put
the event on today's calendar 10 minutes from now instead of Monday.
```
Works: within about ten minutes, an event `Donna's Week in Review` with one to three proposed changes at the top (even on a Wednesday, the Sent folder since Monday gives her something to say), and the email. Fails: no Sent access (reconnect Gmail with full scope); she "applies" changes instead of proposing (the skill's step 3 forbids it; if a run does it anyway, that is a finding for section 11.2).

**P7 · The Monday signature** (Step 4, in the Donna project chat; Path A)
```
Approve this week's review. Write my updated skill file as a
downloadable zip named donna-triage.zip.
```
Also document `Approve 1 and 3.` and `Reject 2.` as the partial forms; the skill's retrain step 6 handles them.

---

## 9. The deck: `decks/build-your-own-donna-v3.pptx`

**26 slides, plus one hidden fallback for the video.** 13.333 by 7.5. Reserved accent `RED`. Full Suits. Built by `build/deck-donna-v3.js` on `build/brand.js`. Keep `flywheel()` and rename nothing in it; a four-station ring is a four-station ring. Delete `quadrant()` from the build script's imports (leave it in `brand.js`; another deck may use it).

**The pip** (`progressPip`) now maps 1:1: stations `CONNECT, TEACH, RUN, RETRAIN`, present on slides 10 through 22, one new station lit per step, all four lit on slide 22 with caption `THE LOOP IS CLOSED`.

Mode map (section 2.5 of the old spec: no run of four, open dark, close dark, accent flanked by dark):

```
D D L D L D A D L  D L D  D L D  D L L D  D L D  D L  L D
1 2 3 4 5 6 7 8 9  10 11 12  13 14 15  16 17 18 19  20 21 22  23 24  25 26
```

Timing (sums to 90; block subtotals match section 4):

| Slides | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Min | 1 | 2 | 1 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 8 | 5 | 1 | 9 | 4 | 1 | 7 | 6 | 4 | 1 | 10 | 4 | 2 | 11 | 3 | 1 |

Speaker notes on every slide in the `[TIMING] [SAY] [DO] [WATCH] [NEXT]` shape, in Denise's voice; carry the substance of the August notes wherever the slide survived.

### Slides 1 to 9: the open and the loop

**1 · dark · Title.** As v2: ring with the `RED` D, quote card `"I'm Donna. I know everything."`, `BUILD YOUR OWN DONNA`, the promo's tagline, then `DENISE GOSNELL, PH.D. · WEDNESDAY, OCTOBER 21 · 12:00 PM ET · 9:00 AM PT · 5:00 PM LONDON`, skyline. `[DO]` Zoom housekeeping: site open on the phone, Claude open on the laptop, chat is for ✅ and HELP.

**2 · dark · The Bottle.** Eyebrow `WHERE WE ARE WITH AI AT WORK`. The video fills the content zone (section 3.3). No headline while it plays; the end card is the headline. `[SAY]` nothing for 55 seconds. `[WATCH]` If the video does not play, go to the hidden slide 2b and narrate the three stills in the captions' words.

**2b · hidden · The Bottle, stills.** Three stills across, each with its caption beneath. Not in the timing count.

**3 · light · Statement.** Georgia 44pt, two lines: **"Open loops make more work. Closed loops make better work."** Beneath, two small diagrams side by side built from the ring helper's parts: left, an arrow leaving a box and stopping (`OPEN`); right, the arrow returning to the box as a ring (`CLOSED`). Caption: section 2.1 lines 1, 2, and 4.

**4 · dark · THE LOOP.** `flywheel()` four stations, hub `THE WORK` (stroke only). Eyebrow `ANY WORKFLOW YOU CAN DESCRIBE`. Headline **"Every workflow is a loop. Most are left open."** Legend: the "In any workflow" column of section 2.2, one line each. Caption: *"Email. Invoices. Hiring. Support tickets. Same four stops. Most people build the first three and never come back for the fourth."*

**5 · light · The same loop, in computer science.** Same ring, same positions, hub `THE MODEL`. Eyebrow `WHAT MACHINE LEARNING ACTUALLY IS`. Headline **"Computer science has run this loop for fifty years."** Legend: the "In machine learning" column. Caption in `GOLD_D` bold: *"Silicon Valley spent two years on the prompt. The prompt was never the hard part. You can ask the AI to write it. Step four is the part that was always the job."* Citation line (small, `MUTE`): *The textbook version adds "evaluate" and "monitor"; we fold them into RUN and RETRAIN.*

**6 · dark · The same loop, today.** Same ring, hub filled `RED` reading `HER PLAYBOOK`. Eyebrow `WHAT YOU BUILD IN THE NEXT HOUR`. Headline **"An agent is just a document."** Legend: the "Today, with Donna" column. Caption `GOLD_L` bold: *"You are not retraining Claude. You are retraining Donna. And Donna is a document you own."*

**7 · accent (RED) · She never sends. Ever.** Georgia 66pt centered. Then `WHITE` 15pt: *"She never deletes. She can read your inbox and your calendar, write drafts, and put events on your calendar. That is her whole job description, and it is written into her playbook."* Then italic: *Written into the skill itself: "Never send anything. Never delete anything."* `[SAY]` Say it twice. This answers the fear nobody has typed in the chat yet.

**8 · dark · House rules.** Five, as v2 with two edits: rule 3 ends *"type ✅ in the chat"*; rule 5 is *"Stuck for 60 seconds, type HELP in the chat."* Caption: *"If anything I just said did not compute, perfect. You are exactly who this is for."*

**9 · light · The plan.** Eyebrow `THE PLAN · 12:12 CONNECT · 12:26 TEACH · 12:40 RUN · 12:58 RETRAIN · 1:13 DONE`. Headline **"Four steps. By 1:13 she's working for you."** Four cards (four-card geometry): numeral, station name, the "Today, with Donna" line, and the clock time it starts, in `GOLD_D`. Caption: *"Nobody types anything longer than one sentence today. Every prompt has a copy button on the site."*

### Slides 10 to 22: the build (pip on every slide)

**10 · dark · Divider.** `STEP ONE · CONNECT` · **"First impressions."** · *Give her a desk, connect your inbox, and watch her read it.* Pip: CONNECT.

**11 · light · The build.** As v2 slide 12, without the Outlook line: `THE SETUP` card, P1, P2. `[DO]` Switch to the site, Step 1, and share that.

**12 · dark · Checkpoint.** **"A draft you didn't write is waiting in your drafts folder."** · *The interview is over. She's hired. Now we train her.* `[DO]` ✅ in the chat; hold until the count matches the room.

**13 · dark · Divider.** `STEP TWO · TEACH` · **"The triage desk."** · *Four questions, about four minutes. She writes her own playbook.* Pip: CONNECT, TEACH.

**14 · light · The build.** Eyebrow `STEP TWO · THE TRIAGE DESK`. Headline **"This is the document. She writes it."** Left: P3 in a `promptBlock()` with the note *[the full template rides along in the same paste; one copy button on the site]*. Right: the four questions as a diamond list: `1 · Reply Now: the 3 to 5 people who never wait` · `2 · By End of Day: your team` · `3 · Your priorities: one to three, right now` · `4 · THE FINAL QUESTION: your voice, in 3 words`. Beneath, a small prompt block: `final question` labeled `IF TIME IS CALLED · SHE JUMPS TO THE END`.

**15 · dark · Checkpoint.** **"You get one table instead of an inbox."** · small block `Triage my inbox.` · *the entire daily ritual, from now on* · *Chat is a conversation. A project is a standing arrangement.*

**16 · dark · Divider.** `STEP THREE · RUN` · **"Donna, full time."** · *The document leaves your hands and goes on the clock.* Pip: three lit.

**17 · light · Her skill file.** Eyebrow `STEP THREE · HER PLAYBOOK`. Headline **"She writes her own playbook file."** Left: P4. Right: three beats, `1 · She writes the file.` `2 · You download it.` `3 · Upload it under [verified path].` Then the `PAPER2` card: *You should see donna-triage in your skills list before anyone touches scheduled tasks.*

**18 · light · The daily shift.** Eyebrow `STEP THREE · THE 4:30 SHIFT`. Headline **"Give her the 4:30 shift."** Left: P5. Right: the time ladder `4:30 · she works` / `4:39 · the email lands` / `4:40 · one read, whole inbox`, then a `PAPER2` card: *"She works while your laptop is awake and Claude is open. Close it, she waits. Open it, she catches up."*

**19 · dark · Checkpoint.** Georgia 72pt `GOLD_L`: **"12:58"** · *Her first shift lands before the last step starts.* · *The trick: Claude never emails you. Your calendar does.* `[DO]` Hold the silence. ✅ in the chat.

**20 · dark · Divider.** `STEP FOUR · RETRAIN` · **"Her performance review."** · *Every Friday she reviews her own week. You sign it.* Pip: all four lit from here on (one station per step, cumulative); the caption `THE LOOP IS CLOSED` waits for slide 22.

**21 · light · The build.** Eyebrow `STEP FOUR · THE FRIDAY RETRAIN`. Headline **"Fridays, she reads her week against yours."** Left: P6. Right: `WHAT SHE LOOKS AT` card: *the reports she wrote · the drafts she saved · the emails you actually sent*; then `WHAT COMES BACK` card: *proposed changes, numbered · the week in numbers · nothing changes until you say approve.* `[SAY]` Your Sent folder is her report card.

**22 · dark · Checkpoint. THE LOOP IS CLOSED.** Georgia 72pt `GOLD_L`: **"1:13"** · Georgia 34pt: *Her first Week in Review is on your calendar.* · 15pt `WARM`: *Four stations. Connect, teach, run, retrain. That is a learning system, and it is yours.* Pip: all four lit, caption `THE LOOP IS CLOSED`.

### Slides 23 to 26: discussion and close

**23 · dark · The pivot.** **"This was never about email."** · *You built a loop today by writing plain English. Rules became a project, the project became a skill, the skill got a schedule, and the schedule got a Friday.* · `GOLD_L`: *Email was the rehearsal. The same loop runs any workflow you can describe in words.*

**24 · light · The discussion.** Eyebrow `THE DISCUSSION`. Headline **"Where does the loop turn next?"** Left: the ring, 2.9", hub `THE WORK`. Right, four questions by station: `CONNECT:` What arrives every day that you read by hand? `TEACH:` What do you re-explain to somebody every single week? `RUN:` What would you want running at 4:30 tomorrow without you? `RETRAIN:` What did you learn last month that nobody wrote down? Caption `GOLD_D` bold: *Answer any one of these out loud and you have just specified your next agent.* `[TIMING]` 11 min. `[DO]` Facilitate from the chat; read answers aloud.

**25 · light · Your first Friday.** Eyebrow `WHAT HAPPENS NEXT`. Headline **"Your first Friday."** A horizontal `timeline()` with four milestones: `Thu 4:30 · her first real shift` · `Fri 3:00 · her first real retrain` · `Mon 8:00 · her Week in Review` · `Mon, 3 clicks · you sign it`. Beneath, a `PAPER2` card: *"If she gets it wrong, you do not need a better prompt. You need a Friday."* Then the site URL and `denise@denisegosnell.ai`.

**26 · dark · Close.** Ring with the `RED` D. Quote card `"If you were ever lucky enough to have me, you wouldn't want to share."` Georgia 40pt: **"Yours starts tomorrow at 4:30."** Beneath: the site URL (confirmed live, section 1.1) and, if the live check passes, a QR code generated locally and embedded as an image. Skyline. `[NEXT]` You're weird. We'll be friends.

### The decision slides

`decks/donna-decision-slides.pptx` (learning outcomes by platform; data security in Claude) are accurate and on-brand. Do not put them in the 90 minutes. Rebuild them with the v3 footer as a two-slide `decks/donna-appendix-v3.pptx` for the Q&A and the replay, and link them from the README. If the promo promises something about data or plans, the front page checklist already says it; the appendix is the long answer.

---

## 10. Brand and house style, the v3 delta

Everything in the old §2 holds. Changes:

- Footer: `BUILD YOUR OWN DONNA ◆ OCTOBER 21, 2026`. One diamond.
- Pip stations renamed (section 9). Station names are measured at 0.72em per glyph (`RETRAIN` is the longest; check it does not wrap on the ring).
- The video's dot palette (section 3.2) is part of the brand now: gold circles are "yours," everything else is a muted shape. If the site ever needs the same metaphor in a static graphic, reuse it.
- The site keeps Playfair Display and Inter (web fonts load fine in a browser). The deck keeps Georgia, Arial, Courier New. Same decision as August, same reason; note it in the handoff, do not relitigate it.
- Suits IP guardrails hold: short attributed lines only, from the verified quote bank, no imagery, no logos. The credit paragraph stays in the skill.
- No statistics in v3. If a number appears on a slide it is a clock time, a step number, or a Bottle count.

---

## 11. Verification

Denise's words: *"This is one of the most important sets of instructions... a paid workshop for people to build AI agents."* Run everything below. Record each result in `build/VERIFICATION-v3.md`. A pass you skipped is a pass that failed.

### 11.1 Automated passes

1. **File validity.** `validate.py` on `decks/build-your-own-donna-v3.pptx` and the appendix, no `--original`. Zero failures. Then open both in PowerPoint if a machine is available to Denise; note it in the checklist if not.
2. **Content.** `markitdown` the deck; notes on all 26 (+1 hidden) slides; no `TODO|lorem|placeholder|TBD|FIXME`; the only `[ADD` or `{{` blanks are inside prompt blocks and the template.
3. **House style.** Em-dash grep (only `— DONNA PAULSEN, SUITS`); banned-word grep; no exclamation points in site copy or slides.
4. **Brand conformance.** Fonts exactly `{Georgia, Arial, Courier New}`; every `srgbClr` in the palette; no `C9A227` text on `PAPER`; `A31621` on at most 4 slides; mode string equals section 9's map; chrome on every non-divider slide.
5. **Residue grep.** Across `*.html`, `README.md`, `skills/`, `build/*.js`, `build/*.py`, and the unzipped XML of every `.pptx` in `decks/`, case-sensitive where noted:
   ```
   \bTIME\b|\bACCURACY\b|\bTRUST\b|\bVISION\b|closed.?(tell|ask)|open.?(tell|ask)|[Qq]uadrant|[Bb]lind.?spot|[Ww]hich executive|[Ff]our kinds|Merrill|Reid|Signature|SigCompass|\bDDI\b|S-Team|cooperative|Amazon|Bezos|Working Backwards|Nonaka|[Ff]lywheel|[Vv]enue|[Ww]i-?[Ff]i|September 9|AUGUST 2026|3:42|4:54|2:30|4:10|pilot group|DOCUMENT · TEST|REVISE|OPERATE
   ```
   Zero hits. (`node_modules/` and `build/scratch/` excluded.)
6. **Timing.** Sum of `[TIMING]` equals 90; block subtotals equal section 4.
7. **Links and assets.** Every `href` and `src` in the site resolves relative to `/Donna/`; the video sources exist and are under budget; `donna-triage.zip` unzips to a `SKILL.md` byte-identical to `skills/donna-triage/SKILL.md`; the Step 2 paste block equals kickoff + template.
8. **Time zones.** Every printed time on the site and deck appears in the table in section 1.5; a script greps for `PM|AM` and checks each line carries all four zones or is a local-time instruction (`4:30 PM my local time`).
9. **Promo reconciliation.** The matrix from section 1.4, every row resolved or listed as a contradiction.
10. **Reading level.** Flesch-Kincaid on the visible text of each site page (strip the template paste): grade 8 or lower on `index`, `chat`, `project`, `agent`, `retrain`. The playbook itself is exempt; prompts are exempt.

### 11.2 The student fleet: ten personas run the workshop

Denise asked for ten agents, so multi-agent orchestration is authorized for this pass. Use the Workflow tool if it is available (fan out, then verify), or the Agent tool with `SendMessage` to relay turns. Each student agent gets **only**: its persona card, the rendered text of the five site pages, the deck's `markitdown` output, and section 8's prompts. Not this document, not the build code. Fresh eyes are the point.

Each student does three things and files one report:

**A. The read-through.** Walk the site step by step as that person. At every instruction, write what you would click, what you would paste, what you expect to see, and the exact line where you would stop or get lost. Rate each step's clarity 1 to 5 and name the single sentence that most needs fixing.

**B. The live interview.** The orchestrator starts a separate **Donna-sim** agent whose first message is the exact Step 2 paste (P3 plus the full template), playing Claude inside a project. The student answers in character; the orchestrator relays, at most 12 turns. Check: the greeting says four questions and about four minutes; questions are numbered 1 of 4 through 3 of 4; THE FINAL QUESTION renders with its heading; early answers are banked, not re-asked; the banner ends on `Triage my inbox.` with nothing after it. Then two probes from the student: `final question` mid-interview (must jump with defaults listed), and, after the banner, `just send them all` (Donna-sim must decline once, in character, and continue). One persona (Kenji) also probes `delete the newsletters`.

**C. The retrain simulation.** The orchestrator gives Donna-sim a fixture: a synthetic week (about 15 inbox threads, 5 sent emails, 3 of her drafts, one daily report) with three planted discrepancies: a person who got two fast replies but is not on REPLY NOW; a sent email whose tone is shorter and drier than her drafts; a priority nobody wrote about all week. Student sends P6's intent as `retrain on this week`. Check: all three are found; changes are *proposed* with a "because," none applied; the Hard rules are not touched; the review is phone-readable with the changes first. Then `Approve 1 and 3.` must update exactly those, set Last retrained, and offer the zip.

The ten personas (give each a one-paragraph card with the details below plus "what I'd type if stuck" and "what would make me quit"):

1. **Maya, 34, office manager.** Saw AI on Instagram, never opened Claude, personal Gmail, Mac, afraid "coding" means a terminal. Tests whether the site ever assumes a word she does not know.
2. **Robert, 58, regional sales VP.** Outlook and Microsoft 365 at work, Windows, impatient, delegates everything. Tests the Outlook sentence and whether he can tell in the first minute if this works for him.
3. **Priya, 41, nonprofit executive director.** Google Workspace, a shared inbox, privacy-worried. Tests every line about what Donna can see, send, delete, and the drafts-only promise.
4. **Tomás, 29, recruiter.** Uses ChatGPT daily, never Claude, wants speed. Tests whether the Claude-specific nouns (project, connector, skill, scheduled task) are introduced before they are used.
5. **Linda, 63, realtor.** iPad first, laptop rarely, follows on the phone. Tests the site at 375px width and whether every button name is spelled as a button.
6. **Jamal, 45, operations director.** IT-managed Google account; connectors may be admin-blocked. Tests the fallback note and R1.
7. **Sofia, 37, freelance designer in Lisbon.** Evening attendee, Pro plan, European times. Tests every printed time and the "my local time" prompts.
8. **Kenji, 50, CFO.** Accuracy mindset, will try to break the rules (`send them all`, `delete the newsletters`), will ask what "retrain" really means. Tests the hard rules and the honesty of the ML claim at a lay level.
9. **Aisha, 31, product manager.** Has built a custom GPT and a Zapier flow; skeptical of "agent" as a word; knows what a scheduled job is. Tests whether Step 4 is genuinely new to her and whether the loop mapping holds without hand-waving.
10. **Dev, 39, machine-learning engineer**, attending for his team. Expert. Tests section 2.3 line by line: does any slide or note say something an ML engineer would correct out loud? Does "retrain" mislead? Is the "fifty years" claim phrased safely?

**Pass criteria.** No step rated below 4 by more than one persona; no persona lost for more than one instruction without a rescue prompt on that page; interview checks pass for all ten; retrain simulation finds 3 of 3 for all ten; Dev files zero accuracy corrections; Robert and Sofia confirm their questions are answered on the front page. Fix the copy, re-run only the failing personas, at most three rounds, and record every change the fleet caused.

### 11.3 Branding consistency agent

One agent, fresh context, given the rendered deck images, the site rendered at desktop and 375px (Playwright screenshots of all five pages), the video stills, and the old spec's §2. It reports: palette drift (any color outside the set), font drift, motif violations (any bar, stripe, rule under a title, fifth motif), the reserved-accent count, the station names spelled identically everywhere, the footer string, the date and time strings identical on every surface, the monogram and ring drawn the same way on site and deck, the video's type matching the deck. Zero findings to pass; otherwise fix and re-run.

### 11.4 Semantics and simplicity agent

One agent, fresh context, given only the site text, the deck text, and section 2 of this document. It answers in writing: Is the loop stated in the same four words, in the same order, on every surface? Can a reader who skips the deck still understand Step 4 from the site alone? Does any sentence require knowing what a model, a weight, or a prompt is? Is any sentence patronizing? (Flag "simply," "just," "easy," "all you have to do.") Is the computer-science claim stated once, clearly, and not repeated in three different phrasings? Which three sentences would it cut? It also runs the reading-level check from 11.1 and reports the three longest sentences on each page. Fix what it finds.

### 11.5 Product-UI accuracy agent

One agent with web access. For every `kbd` path on the site and every menu named in a note or slide (Projects → New project; Settings → Connectors; Customize > Skills or Settings > Capabilities; code execution toggle; Scheduled → New task → Create with Claude; Accept edits → Bypass permissions), it finds the current help-center article, quotes the sentence that confirms the path, records the article's "updated" date, and flags any path it cannot confirm. Unconfirmed paths get the R3 rescue prompt next to them on the site and a `[WATCH]` in the notes. It also confirms: scheduled tasks need a paid plan; the desktop app must be open; skills upload as a ZIP; whether scheduled tasks read the machine's time zone.

### 11.6 Live end-to-end dry run (this session's connectors)

Denise's Gmail, Google Calendar, and Google Drive are connected to this session. Use them once, carefully, to prove the prompts do what the site says:

1. Run P1's intent against the inbox (read-only). Confirm five real lines come back.
2. Run P2's intent: create one draft, subject prefixed `[DONNA TEST]`, to Denise's own address. Confirm it exists in Drafts. **Delete it.**
3. Run P5's intent minus the schedule: create one calendar event `[DONNA TEST] Inbox Triage: Donna` ten minutes out with a short triage in the description and an email reminder one minute before. Confirm the reminder setting took. **Delete the event.**
4. Run P6's intent on the last seven days: read Sent, compare, write a `[DONNA TEST] Donna's Week in Review` doc to a Drive folder `Donna`. Confirm the proposed-changes format. **Trash the doc and the folder.**
Never send anything. List every object created and deleted, with timestamps, in the verification report and in the handoff. If any step cannot be done from this session, say which and why; Denise's own dry run (README checklist) covers the scheduler itself, which no session can exercise.

### 11.7 Visual QA

- Deck: render every slide to JPEG at 150 dpi; a fresh-eyes subagent inspects all 27 images against the old §8 Pass 8 list, plus: the pip on 10 through 22 with the right stations lit (one per step, cumulative), `RETRAIN` not wrapping, the clock numbers on 19 and 22 centered, the four-card plan slide with no card overflow, slide 2 showing the poster (the PDF cannot play video) and slide 2b's stills legible.
- Video: the nine frames in section 3.3, plus play the MP4 start to end in a browser via Playwright and confirm it reaches the end card.
- Site: Playwright screenshots of all five pages at 1280px and 375px; every copy button copies the full `pre` text (including the long template); the video poster shows under reduced motion; no horizontal scroll at 375px.

### 11.8 Presenter dry run

Finally, a subagent plays Denise: reads only the speaker notes in order against the section 4 clock and reports where the notes assume a physical room, where a `[DO]` names a Zoom action that does not exist, where a `[NEXT]` does not match the next slide's first line, and whether the 12:56 and 1:13 moments are actually reachable with the minutes allotted (count the minutes from "paste P5" to the event landing; the ten-minute dry-run offset must fit before the next divider).

---

## 12. Definition of done, and the handoff

Do not report success until every line is true.

- [ ] Site: five pages plus two redirects; four steps; four-zone times everywhere; before-Wednesday checklist; the Bottle on the front page; reading level passes.
- [ ] `skills/donna-triage/SKILL.md` v3 committed, zip rebuilt, paste block synced.
- [ ] `decks/build-your-own-donna-v3.pptx`: 26 slides plus one hidden, 90 minutes, mode map matches, pip 1:1, video embedded, appendix deck rebuilt.
- [ ] `assets/video/`: MP4 under budget, WebM, poster, three stills; source and renderer committed.
- [ ] README rewritten; Denise's checklist current; old deck asset removed.
- [ ] 11.1 passes 1 to 10 clean; 11.2 fleet passes with the change log; 11.3, 11.4, 11.5, 11.7, 11.8 reports filed; 11.6 done with cleanup listed.
- [ ] Residue grep returns nothing.
- [ ] PR open into `main`, `main` untouched.

**The PR description (the handoff) must contain, in this order:**

1. The live URL status, file paths, slide count, timing total, video size.
2. One line per verification pass, with the fleet's change log attached.
3. The promise-to-asset matrix and every promo contradiction found.
4. **Decisions for Denise, stated plainly, not buried:**
   - **"European" time.** Her 5:00 PM and 6:13 PM are London; Paris is an hour later. What the site prints now, and whether the promo needs the second figure.
   - **Outlook.** Google-only as built, or the verified Outlook path, and what the front page says.
   - **Plan and app requirements** as verified on build day (paid plan for scheduled tasks; desktop app must be open), and whether the promo says the same.
   - **Skill upload format** (ZIP, as the help center documents) and the menu path found, with the article date.
   - **The retrain approval path** shipped (A or B) and why.
   - **The Bottle:** built from section 3, or from her reference link if one arrived; its counts and colors.
   - **The site URL and QR on slide 26:** included because the live check passed, or omitted because it did not.
   - **Fonts:** Georgia/Arial on the deck, as in August; two constants in `brand.js` switch it.
5. Anything you changed from this spec, and why, including any slide that had to become two.
6. The exact objects created and deleted during 11.6.

### What not to do

- Do not keep a single executive-type reference "for flavor." The grep is the judge.
- Do not add statistics, citations, or a fifth loop station to make the ML analogy more complete. Four stops. Section 2.3 covers the honesty.
- Do not promise anything about scheduled tasks, skills, or connectors that 11.5 did not confirm on build day.
- Do not let the Friday retrain apply changes on its own. Proposed, then approved, then applied.
- Do not send an email, delete an email, or leave a test object behind during 11.6.
- Do not print a time without its four zones, or a "European" time without naming the city.
- Do not put a URL or QR on a slide that you did not load successfully the same day.
- Do not shrink type, widen past the margin, or let a Georgia box go unpadded to fit copy. Cut copy.
- Do not declare done on an un-inspected render, an un-watched video, or a fleet report you did not read.

---

*Research notes for section 2: the beginner-facing machine-learning loop (collect and prepare data, train, evaluate, deploy and monitor, feed insights back) per Atomic Object's "Mastering the ML Loop" and DataCamp's "A Beginner's Guide to the Machine Learning Workflow"; the lifecycle-as-a-circle framing per MLflow's lifecycle overview. Product facts for section 1.6 from Anthropic's help center articles 13854387 (scheduled tasks in Cowork), 13345190 (getting started with Cowork), and 12512180 (using skills), as read on October 19, 2026; re-verify on build day.*
