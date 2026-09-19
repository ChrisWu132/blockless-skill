// Render a design folder to PNGs you can open and look at.
//
//   node <installed-skill>/scripts/render.mjs <design-folder> [--views front,side,back] [--size 900]
//
// You, the coding agent, cannot judge a shape you have not seen, and most
// sessions have no way to drive a browser. Every desktop already has a
// Chromium-family browser, and it can screenshot a local page by itself — no
// npm install, no network, no browser automation library. The pictures land in
// the design folder as review-<view>.png; read them before saying anything
// about how the model looks.
import { spawnSync } from 'node:child_process';
import { access, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const CANDIDATES = {
  win32: [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
  ],
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  ],
  linux: [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/microsoft-edge',
    '/snap/bin/chromium',
  ],
};

async function findBrowser() {
  if (process.env.BLOCKLESS_BROWSER) return process.env.BLOCKLESS_BROWSER;
  for (const candidate of CANDIDATES[process.platform] ?? []) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Not installed here; keep looking. The loop's failure is reported below.
    }
  }
  throw new Error(
    'No Chrome, Edge, Chromium or Brave found for rendering.\n' +
      'Set BLOCKLESS_BROWSER to a Chromium-family executable, or open index.html ' +
      'yourself and tell your AI what looks wrong.',
  );
}

const flag = (name, fallback) => {
  const at = process.argv.indexOf(`--${name}`);
  return at === -1 ? fallback : process.argv[at + 1];
};

const folder = process.argv[2];
if (!folder || folder.startsWith('--')) throw new Error('Usage: node render.mjs <design-folder> [--views front,side,back] [--size 900]');
const page = path.resolve(folder, 'index.html');
await access(page);

const views = flag('views', 'front,side,back').split(',').map((v) => v.trim()).filter(Boolean);
const size = Number.parseInt(flag('size', '900'), 10);
if (!Number.isInteger(size) || size < 200 || size > 4000) throw new Error(`--size must be 200-4000, got ${flag('size', '900')}`);

const browser = await findBrowser();
const profile = await mkdtemp(path.join(tmpdir(), 'blockless-render-'));
const written = [];
try {
  for (const view of views) {
    const out = path.resolve(folder, `review-${view}.png`);
    const url = `${pathToFileURL(page).href}?view=${encodeURIComponent(view)}&bare=1`;
    const args = [
      '--headless',
      '--disable-gpu',
      `--user-data-dir=${profile}`,
      `--window-size=${size},${size}`,
      '--virtual-time-budget=8000',
      '--hide-scrollbars',
      `--screenshot=${out}`,
      url,
    ];
    if (process.platform === 'linux') args.unshift('--no-sandbox');
    const run = spawnSync(browser, args, { encoding: 'utf8' });
    if (run.error) throw run.error;
    await access(out);
    written.push(out);
  }
} finally {
  await rm(profile, { recursive: true, force: true });
}
console.log(`Rendered ${written.length} view(s). Open them and look before you judge the shape:`);
for (const file of written) console.log(`  ${file}`);
