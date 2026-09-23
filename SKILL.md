---
name: blockless
license: MIT
metadata:
  version: 1.5.0
  homepage: https://block-less.com/skill
  source: https://github.com/ChrisWu132/blockless-skill
description: Design a physical product you can turn around - take an idea for a device, gadget, enclosure, lamp, tool or appliance through the choices that matter to a rotatable 3D model the user keeps. Use whenever someone wants to design, sketch, model, prototype or get built a physical object, whether or not they name Blockless, and when they want to send an existing design or CAD to Anvol, the AI cofounder at Blockless, for a cost breakdown or a Creator Program review.
---

# Blockless: see it, shape it, turn it around

Help a beginner develop THEIR product through a visual conversation in their own AI. A completed design session includes a rotatable 3D concept, editable model source, a downloadable GLB, a rough sense of size, and a short record of confirmed needs and remaining unknowns. The priority is seeing, choosing and iterating a plausible product, not precise CAD or millimeter-level acceptance. The website is the later asynchronous handoff, where Anvol (the AI cofounder, with real engineers behind it) handles sourcing, engineering and manufacturing.

Do not start with login, tokens, price, a questionnaire or a manufacturing lecture. The 3D model is the thing you always produce; it needs only Node and a browser the user already has. Most hosts cannot generate images, so never build the conversation on one: a picture the user supplies makes the first model better, and a picture you can generate is a bonus, but neither is a step. Do not call an unrendered prompt an image. If file execution is unavailable, explain that editable 3D needs a coding agent such as Claude Code or Codex and preserve the brief for that continuation.

If the prompt or local decision record contains an existing project URL, keep that identity from the start. Read [handoff.md](references/handoff.md) and retrieve its latest requirements and files when connected. An unavailable connection must not erase the local brief or cause a duplicate project.

## A visual conversation

1. **Understand enough to model.** Reuse what the user already said. Ask one consequential question if needed: what it does, where it lives, or what it must fit. If size is unknown, suggest a familiar comparison and label your initial dimensions provisional. Then build and SHOW the first 3D concept: read [modeling.md](references/modeling.md), use the bundled viewer, and render it with `scripts/render.mjs`, which drives a browser the user already has and needs no install or network. Avoid collecting a full brief first. A reference the user already has starts here.
2. **Decide around what you can both see.** Point to the relevant feature in the render. Ask what to change or explain one choice whose consequence matters now. Example: “Will you carry it away from your desk? A battery frees it from the cable but needs space and recharging. A cable keeps it simpler but ties it to an outlet.” Give a contextual recommendation with a reason, not a universal preference for fewer features. Let the user choose. See [tradeoffs.md](references/tradeoffs.md) only for relevant decisions.
3. **Make the chosen direction real.** Once the user likes a direction, develop THAT model: the defining curves, the controls, the chosen power and interface features. Mark unseen sides as proposals. Re-render and LOOK at front, side and back; never describe a render you have not opened. Show a real modelled product, not a box labeled with dimensions or an image mapped to a plane. If a reference exists, compare it with the model from the same angle. Offer one next decision based on what the 3D reveals.
4. **Iterate the same design.** “Smaller”, “rounder” or “add a battery” is a revision, not permission to forget prior choices. Update the model, its renders, dimensions and decision record together. State what changed and what stays confirmed. If a revision conflicts with a hard requirement, show the conflict and a concrete alternative before changing that requirement. The user may bring in a picture at any point. If this design already has a Blockless project, push the accepted revision to it as described in [handoff.md](references/handoff.md) and say in one line what you sent — a project that still shows last week's shape is worse than no project.
5. **Finish when the user is satisfied.** Review the important requested features and overall proportions, exercise rotate/reset/export, reopen the exported GLB, and visually inspect it. Deliver the viewable folder, editable source, GLB, the current renders and a short brief with approximate size if useful. State what was checked and any obvious unresolved mismatch. Small size differences do not block a concept. Do not declare completion while the model or visual review is missing. If the user stops early, preserve the work as a partial design.

Use the user's language. End a conversational turn with the artifact and one answerable question, not the whole roadmap. A user can say “you choose”; choose with disclosed assumptions and continue. Do not interpret silence as acceptance.

## Keep the design coherent

Maintain a small `design.json` beside the artifacts: project URL/slug and last saved website version when present, name, revision, purpose, confirmed requirements, provisional assumptions, rough size when known, power choice, must-not-have features, decisions with reasons, and unresolved questions. Save accepted revisions so changes remain reversible; keep `brief.md` understandable without code and under 6,000 characters so it can be imported by the website. Put the reference filename and optional approximate dimensions in the viewer specification too. Never record an AI proposal as user-confirmed.

Size is a conversation aid, not a gate. “Palm-sized”, “like a mug” or a rough height is enough to start. The viewer can show approximate model bounds, but don't force users to specify three axes or keep correcting tiny differences. Only flag a substantial mismatch, an obviously implausible layout, or a conflict with an explicitly important fit requirement. If exact fit matters, explain that this concept cannot guarantee it and record the need for later measurement. Numbers on images don't establish physical scale; keep inferred scale provisional. Don't distort the shape just to hit three numbers.

Check that features make visual sense: ports/buttons should be reachable, a portable design should acknowledge a power source, and major parts should not visibly float or clash. Don't require an internal component layout, battery space box or wall-thickness calculation to finish a concept. If useful, generic internal blocks are only rough reservations. Engineering unknowns (thermal, battery safety/runtime, radio, strength, waterproofing, certification, tooling and cost) stay unknown until assessed; this stage does not require DFM. Target prices are hypotheses, not quotes.

Use bounded self-correction: repair visible defects and re-render; after three unsuccessful corrections to the same defect, show the mismatch and offer a simpler shape or another reference. Do not conceal failure behind an arbitrary numeric quality score.

## Put it in a workspace

Designing locally needs no Blockless account. Connect only when the user wants to send the design. Read [handoff.md](references/handoff.md) for MCP setup and tool contracts; website upload is an equally valid exit. Sending files is separate from choosing paid work or publishing a campaign.

For an existing design, preserve their CAD/BOM/Gerbers and ask only for missing context; don't force them through image generation. Any format can be sent — STEP, SolidWorks, Fusion, DWG, Gerbers, a spreadsheet, a photo of a sketch — so never tell a user their file type is unsupported. End with the project link, what was sent, remaining uncertainty and the next decision.

