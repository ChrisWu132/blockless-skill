// Your coding agent replaces this factory with YOUR chosen design.
// Geometry units: meters. X = width, Y = height, Z = depth; front = +Z.
// This intentionally has no generic product masquerading as your design.
function buildModel(THREE) {
  const product = new THREE.Group();
  product.name = 'Your product';
  return product;
}

window.Blockless.mount(buildModel, {
  name: 'Your model is not ready',
  revision: '01',
  requirements: [],
  assumptions: ['Your AI needs to model your brief; a reference image is optional.'],
  unknowns: ['Component fit', 'Engineering and manufacturing'],
});
