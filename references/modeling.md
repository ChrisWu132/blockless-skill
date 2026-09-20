# From the brief to an inspectable model

This skill includes a browser viewer and an editable Three.js starter. It does not include an AI model or an automatic image-to-mesh service. You, the coding agent, build the design with ordinary Three.js geometry from what the user told you - and from a reference image if one exists - then visually correct it against your own renders. A reference sharpens the first attempt; its absence is not a reason to stall or to describe a shape instead of building one. Use an already-available specialized image-to-3D tool when it improves the result, but don't make a hidden dependency on another personal skill or an unconfigured paid API.

## Start and continue

Run with Node.js 22 or later (no npm dependencies needed in the user's design folder):

```
node <installed-skill>/scripts/create-preview.mjs <new-design-folder>
```

This copies `index.html`, `viewer.js`, `model.js` and the Three.js license into a NEW folder. Open `index.html` in a browser; no server or internet is required. It initially says “Your model is not ready”. Implement `model.js` using the supplied factory contract; never show the placeholder as a product. If the host browser requires HTTP, use its normal preview server scoped to this folder. No account, token or network service is necessary to view/export the concept.

For a revision, copy the previous design into a new revision folder and edit that copy. Do not rerun the initializer on existing work; it refuses overwrites.

## Factory contract

`model.js` uses `window.Blockless.THREE` and `window.Blockless.RoundedBoxGeometry`. Define `buildModel(THREE)` returning a `THREE.Group`. Author geometry in **meters**, with Y up and the product front toward +Z. The viewer measures the real geometry and displays mm; the exported GLB also uses meters. Name component meshes, e.g. `shade`, `power-dial`, `usb-c-recess`. Include every part of the product in this group. Lights, ground, rulers and comparison props belong to the viewer, never the export group. Avoid remote textures, fonts or meshes that would break an offline artifact.

Call `window.Blockless.mount(buildModel, spec)` after defining the factory. `spec` contains:

```
{
  name: 'Evening light', revision: '02',
  reference: 'concept.png',
  dimensionsMm: [90, 150, 90], // OPTIONAL approximate width, height, depth
  dimensionStatus: 'provisional',
  maxDimensionsMm: [100, null, 100], // OPTIONAL space the user cares about
  requirements: ['Warm dimmable light', 'No app', 'Rechargeable'],
  assumptions: ['Rear face is proposed', 'Size is approximate'],
  unknowns: ['Runtime', 'Thermal design', 'Component fit']
}
```

Use a relative image filename copied into this output folder. Omit `reference` only when no image exists and disclose the missing comparison. Titles and rough targets derive from `spec`; approximate bounds derive from the geometry. Size information is collapsed by default and never blocks viewing or export. The viewer flags large target differences (over 20% or 10 mm, whichever is larger) and possible conflicts with a stated space. These are discussion prompts, not tolerance checks or evidence of real-world fit. Don't chase millimeter differences or distort the design to clear a notice.

## Reconstruct and review

1. Fix the silhouette, 3–5 defining features, control/port placement and materials before writing geometry. View the reference image first if there is one, and distinguish observed surfaces from assumed ones; with no image, state the silhouette you are about to build so the user can correct it in one sentence. Use the user's dimensions as the scale source.
2. Build connected volumes matching the silhouette, then add defining features. Use bevels, lathe profiles, extruded shapes and curves when the form calls for them. A pile of primitives is only a blockout; round products should have continuous surfaces. Do not auto-distort a generated mesh to hit dimensions.
3. Look at actual renders. If you can drive a browser, open the viewer and select front/side/back. If you cannot — most sessions cannot — run the renderer, which drives an already-installed Chrome, Edge, Chromium or Brave and needs no npm install or network:

   ```
   node <installed-skill>/scripts/render.mjs <design-folder>
   ```

   It writes `review-front.png`, `review-side.png` and `review-back.png` into the folder. Open them; never describe a render you have not seen. Framing centres the bounding box, so a protruding control shifts the product sideways in a profile view — that is the frame, not an asymmetric model, and must not be "corrected". A control placed at a fixed depth on a curved body gets swallowed by it, so check that every protruding feature still reads from the front AND from the side. If a reference exists, compare the same angle, especially outline, proportions and feature placement; it helps compare appearance, not prove hidden geometry.
4. Check important features and overall proportion. Use the optional size panel only when size helps the decision. If a must-have is not visible (e.g. no app, desired runtime), preserve it in the brief and label implementation unknown. Bounds cannot prove a battery fits or a connector works; do not require internal packing or precise dimensions to proceed.
5. Iterate the defective aspect and re-run the renderer, then look again. If no browser can be found at all, say so and ask the user what looks wrong rather than guessing. User-driven changes are not capped; unsuccessful automatic corrections to one defect are bounded by the main Skill.
6. “Download GLB” reads the exported data back into the viewer before saving, showing “Exported GLB preview”. Inspect its materials and shape. To independently check a saved file, use “Check exported GLB”. Reset returns to the source model. Export is geometry for visual review, not manufacturing CAD. Deliver the full editable folder as well as GLB; a lone HTML file needs its adjacent scripts and image.

The viewer measures external bounds including protrusions. It doesn't validate wall thickness, collisions, electronics, strength, fit, manufacturability or safety. Model internal component reservations only when they help the current decision; label them approximate and keep them separate from the final exterior review.
