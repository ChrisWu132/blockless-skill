# From the chosen image to an inspectable model

This skill includes a browser viewer and an editable Three.js starter. It does not include an AI model or an automatic image-to-mesh service. You, the coding agent, reconstruct the chosen design from the image with ordinary Three.js geometry, then visually correct it. Use an already-available specialized image-to-3D tool when it improves the result, but don't make a hidden dependency on another personal skill or an unconfigured paid API.

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

1. View the selected image. Identify its silhouette, 3–5 defining features, control/port placement and materials. Distinguish observed surfaces from unseen-side assumptions. Use the user's dimensions as the scale source.
2. Build connected volumes matching the silhouette, then add defining features. Use bevels, lathe profiles, extruded shapes and curves when the form calls for them. A pile of primitives is only a blockout; round products should have continuous surfaces. Do not auto-distort a generated mesh to hit dimensions.
3. Open the viewer, select front/side/back and reset the camera. Look at actual renders. Compare the same angle with the concept image, especially the outline, proportions and location of features. The reference image helps compare appearance, not prove hidden geometry.
4. Check important features and overall proportion. Use the optional size panel only when size helps the decision. If a must-have is not visible (e.g. no app, desired runtime), preserve it in the brief and label implementation unknown. Bounds cannot prove a battery fits or a connector works; do not require internal packing or precise dimensions to proceed.
5. Iterate the defective aspect and re-render. If you have no way to see the render yourself, say so and ask the user what is wrong rather than guessing. User-driven changes are not capped; unsuccessful automatic corrections to one defect are bounded by the main Skill.
6. “Download GLB” reads the exported data back into the viewer before saving, showing “Exported GLB preview”. Inspect its materials and shape. To independently check a saved file, use “Check exported GLB”. Reset returns to the source model. Export is geometry for visual review, not manufacturing CAD. Deliver the full editable folder as well as GLB; a lone HTML file needs its adjacent scripts and image.

The viewer measures external bounds including protrusions. It doesn't validate wall thickness, collisions, electronics, strength, fit, manufacturability or safety. Model internal component reservations only when they help the current decision; label them approximate and keep them separate from the final exterior review.
