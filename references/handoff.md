# Sending a design to Blockless

Ask before the first send. Uploading a design is the user's decision, not a step you take because the design looks finished. Once they agree, keep the project current without asking again.

## Connecting

Blockless is a Streamable HTTP MCP server at https://block-less.com/mcp. Add it yourself rather than asking the user for a token:

- Claude Code: `claude mcp add --transport http --scope user blockless https://block-less.com/mcp`, then tell the user to run `/mcp` and approve in the browser that opens.
- Codex: `codex mcp add blockless --url https://block-less.com/mcp`, then `codex mcp login blockless`.

The server answers an unauthenticated call with an OAuth pointer, so a token-capable client discovers the rest on its own, registers itself and opens a browser. The user signs in with Google and approves once; nothing is copied by hand, and the approval can be withdrawn at https://block-less.com/me. A client that cannot do OAuth can still use a personal token from that page. If neither works, use the website's upload control and say so plainly. Never ask the user to paste a token into the conversation, and never block local design on any of this.

## Tools

With the user's agreement, call `create_project(name, brief)`. Projects are private by default. Save the returned slug for subsequent tools.

- `set_specs(slug, specs)` accepts brief, size, materials, parts, power, light, target_price, target_qty. Send the complete current specification, since this replaces the previous one.
- `attach_file(slug, type, name, mime, base64)` files under `brief`, `validation`, `3d`, `gerber`, `bom`, `materials`, `photo` or `video`. **No format is refused** — STEP, SolidWorks, Fusion, DWG, Gerbers, a spreadsheet, a photo of a sketch. The category is only filing; when unsure use `materials` for mechanical design and `brief` for anything else. Use exact bytes, never invented base64. The limit through MCP is 10 MB because the bytes travel as base64; larger files go through the workspace upload control, which takes up to 90 MB. Say which one you used.
- `push_version(slug, render_file_id, note)` appends an uploaded PNG/JPEG/WebP as the next concept version. It does not make the file public.
- `get_project(slug)` reads current status, versions, evidence, estimates and decisions.

Read the project back to verify the actual filenames and version. Do not announce an upload before it succeeds.

## Keeping a connected project current

Once a project exists, a revision is not finished until the project shows it. After the user accepts a change to the design, send the updated render with `push_version`, re-send the full specification with `set_specs`, and attach the new model. Say in one line what you pushed. Do not push drafts the user has not accepted, and do not silently push the first time — that is the send they agreed to above.

If the server refuses because the round is locked, stop and explain it. Design changes invalidate unpaid estimates. Paid or publicly funded designs need the team's scope review first. Never create a duplicate project or work around a lock to make the error disappear.

## Two exits

**"Quote it"**: call `request_quote(slug)`. It requests a Private Build review without charging. Link the workspace and show the returned estimated review time as an estimate. Only operator-published estimates contain payable prices. A 30% deposit applies to the explicitly scoped round; do not promise a fixed final price or delivery date. Payment and legally binding approvals happen in the user's browser.

**"Apply"**: if the host has the `blockless-hardware-opportunity` skill, use it for opportunity evidence, then attach that report as `validation`. If unavailable, explain what evidence is missing and help the user collect it; never claim a validation run happened. Call `apply_creator(slug)`. If the user has target pricing, quantities or a shipping hypothesis, send them with `set_preorder(slug, proposal)` as an unapproved proposal. An application remains private and does not guarantee funding. The team configures a scoped campaign and agreement; the creator explicitly approves publication on the website.

The existing rules at https://block-less.com/creator-program govern the program overview. Background IP stays with its owner; funded foreground IP, Open/Embargo/Private track, sponsored scope and profit allocation are set in the signed project agreement. Do not infer ownership or a profit percentage from comments or support counts.

End each handoff with the project link, what was sent, what remains uncertain and the next decision. Never invent a quote, factory selection, completed sample, paid order or shipping event.
