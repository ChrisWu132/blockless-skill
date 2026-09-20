import { access, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const destination = process.argv[2];
if (!destination || process.argv.length !== 3) {
  throw new Error('Usage: node create-preview.mjs <new-design-folder>');
}
const source = fileURLToPath(new URL('../assets/', import.meta.url));
const files = ['index.html', 'viewer.js', 'model.js', 'THREE-LICENSE.txt'];
// Validate the installed bundle before creating anything. Never overwrite a revision.
await Promise.all(files.map((file) => access(path.join(source, file))));
await mkdir(path.resolve(destination), { recursive: false });
for (const file of files) await copyFile(path.join(source, file), path.join(destination, file));
console.log(`Ready: ${path.resolve(destination, 'index.html')}\nYour AI now edits model.js into your design.`);
