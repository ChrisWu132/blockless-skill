# Blockless skill

Design a physical product through pictures - take an idea for a device, gadget, enclosure, lamp, tool or appliance from a concept image through the choices that matter to a rotatable 3D model the user keeps. Use whenever someone wants to design, sketch, model, prototype or get built a physical object, whether or not they name Blockless, and when they want to send an existing design or CAD to Blockless for a build estimate or Creator Program review.

Install it into a project with any agent:

```bash
npx -y skills@1.6.0 add https://block-less.com --skill blockless -y
```

That installs the same files you see here, from the copy served by
[block-less.com](https://block-less.com/skill). You can also install straight
from this repo with `npx skills add ChrisWu132/blockless-skill`.

## What it does

It guides a physical product from an idea through a concept image, practical
trade-offs and an editable 3D model you keep. The viewer runs locally and needs
no account. Sending the result to Blockless for a build estimate is a separate,
optional step that asks for your approval in a browser.

## Reading it before you run it

Skills run with your agent's permissions, so read [SKILL.md](SKILL.md) and
[references/](references/) first. Nothing here executes on install;
`scripts/create-preview.mjs` only copies the viewer into a folder you name.

---

This repository is generated. The source lives in the `blockless-app`
repository under `public/skills/blockless/`, and this copy is published by
`npm run publish-skill`. Open issues and changes against the source, not here.
