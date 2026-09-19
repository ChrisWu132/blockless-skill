# Explain the consequence at the point of choice

Use only the decision relevant to this product. Start with what the user wants to do; teach the technical term after the consequence. These are conceptual checks, not qualified engineering advice or component specifications.

| Decision | Explain in the user's context | What to update |
|---|---|---|
| Cable or rechargeable | A desk device can stay plugged in. Taking it to another room suggests a battery and charging access. Battery operation does not automatically mean wireless charging. | Power choice and proposed port. No internal layout is required at concept stage; runtime remains unknown. |
| How large | “About a mug” or “fits in my hand” is enough to start. Ask for measurements only if the user specifically cares about fitting an existing space. | Rough scale, with numerical dimensions optional. Exact fit is for later verification. |
| Small versus feature-rich | Extra controls, displays and batteries occupy room. Show the clash in the model instead of declaring a size impossible without evidence. | A comparison preserving must-haves, and the user's chosen compromise. |
| Button, dial or app | A button is direct; a dial supports gradual adjustment; an app may add setup and dependence on a phone. Ask what the user actually needs to change. | Reachable controls in the model, intended interaction, unverified electronics/software scope. |
| Brightness or runtime | More light generally requires more electrical power and creates more heat. A bigger battery can add size and weight. | Desired use duration/brightness as targets; don't invent battery capacity or an exact runtime. |
| Material/finish | A metal look in a render is an appearance direction. Actual material choice affects touch, weight, radio access and cost. | “Proposed brushed metal appearance” until material and finish are assessed. |
| Water/outdoor use | A nice-looking seal isn't evidence of water resistance. Openings and charging ports affect the design. | Intended exposure, visible openings, unresolved sealing and testing. Never assign an IP rating. |

Example interaction (adapt, don't recite):

User: “I want a soft light for this narrow desk.”

AI: “I'll try a compact, warm desk light with a simple dial. The first image uses a provisional 90 mm footprint; we can change that.” Show the image.

User: “Rounder. And I want to carry it to bed.”

AI: “I'll round the shade. To work away from the desk it needs stored power; a rechargeable battery means a larger base and a charging port. Would you accept a slightly taller base?”

User: “Yes, but it must stay under 100 mm wide.”

AI: Preserve that maximum, update the image, then model the same shade, taller base, dial and proposed rear charging port. Show the rotatable model and its measured width. “The model is 94 mm wide including the dial. The battery space is provisional; runtime and real component fit still need checking. Is the taller base comfortable visually?”

If the user later says “make it 60 mm wide with all the same internals”, do not shrink everything uniformly or pretend the earlier battery space still works. Show the conflict and ask which constraint can move. Never imply this example is a measured or tested product.
