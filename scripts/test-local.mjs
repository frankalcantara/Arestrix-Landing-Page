/**
 * Local smoke test for the Arestrix landing page.
 *
 *   npm run test:local        build, serve with `astro preview`, check every route
 *   npm run test:cf           build, serve with `wrangler dev`, check every route
 *
 * The checks are deliberately about this rebrand: no leftover sample business, no
 * email/phone contact details, and GitHub + X are the only contact channels.
 */
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const isWindows = process.platform === "win32";
const useCloudflare = process.argv.includes("--cf");
const port = useCloudflare ? 8788 : 4322;
const origin = `http://127.0.0.1:${port}`;

const run = (command, args, options = {}) =>
  spawnSync(command, args, { stdio: "inherit", shell: isWindows, ...options });

console.log("\n[1/3] Building the static site…");
const build = run("npm", ["run", "build"]);
if (build.status !== 0) process.exit(build.status ?? 1);

console.log(`\n[2/3] Starting ${useCloudflare ? "wrangler dev" : "astro preview"} on ${origin}…`);
const command = useCloudflare ? "npx" : "npm";
const args = useCloudflare
  ? ["wrangler", "dev", "--port", String(port), "--ip", "127.0.0.1"]
  : ["run", "preview", "--", "--port", String(port), "--host", "127.0.0.1", "--force"];

const server = spawn(command, args, {
  stdio: "inherit",
  shell: isWindows,
  env: { ...process.env, WRANGLER_SEND_METRICS: "false", CLOUDFLARE_ANALYTICS: "false" },
});

const stop = () => {
  if (!server.pid || server.exitCode !== null) return;
  if (isWindows) {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    server.kill("SIGTERM");
  }
};

let ready = false;
for (let attempt = 0; attempt < 80; attempt++) {
  try {
    const response = await fetch(origin, { signal: AbortSignal.timeout(2000) });
    if (response.ok) {
      ready = true;
      break;
    }
  } catch {
    // Not listening yet.
  }
  await sleep(500);
}

if (!ready) {
  stop();
  console.error(`\nServer did not start at ${origin}.`);
  process.exit(1);
}

const routes = [
  [
    "/",
    [
      "Arestrix",
      "Agent pipelines",
      "compiled to C++20",
      "Get the beta",
      "around the graph",
      "Agent-to-agent calls",
      "artifact travels",
      "Run with telemetry",
      "What it costs",
      "Beta 2.1",
      "Questions",
    ],
  ],
  ["/services/", ["Six", "building blocks", "Native C++20 compiler", "AI Gateway"]],
  ["/about/", ["Agent pipelines deserve", "software discipline", "What Arestrix is not"]],
  ["/contact/", ["Build it", "GitHub", ">X<", "@frankalcantara"]],
  ["/404/", ["Error 404", "off the graph", "Community"]],
  ["/robots.txt", []],
  ["/sitemap-index.xml", []],
];
const forbidden = [
  "Quillmoor",
  "Port Alder",
  "555-01",
  "hello@example.com",
  "contact@arestrix.com",
  "Formgong",
  "linkedin.com",
  "2026 Quillmoor",
];

let failures = 0;
console.log("\n[3/3] Checking routes and copy…");
for (const [route, required] of routes) {
  const response = await fetch(origin + route);
  const text = await response.text();
  const problems = [];

  if (!response.ok) problems.push(`HTTP ${response.status}`);
  if (route.endsWith(".xml") || route.endsWith(".txt")) {
    if (!text.includes("arestrix")) problems.push("missing site URL");
  } else {
    for (const phrase of required) if (!text.includes(phrase)) problems.push(`missing "${phrase}"`);
    for (const phrase of forbidden) if (text.toLowerCase().includes(phrase.toLowerCase())) problems.push(`leftover "${phrase}"`);
  }

  if (problems.length) {
    failures += problems.length;
    console.error(`  FAIL ${route}: ${problems.join(", ")}`);
  } else {
    console.log(`  ok   ${route}`);
  }
}

stop();
console.log(`\n${failures ? `${failures} problem(s) found.` : "All local checks passed."}\n`);
process.exit(failures ? 1 : 0);
