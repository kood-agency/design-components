const assert = require("node:assert/strict");
const { resolve } = require("node:path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const distEntry = resolve(__dirname, "../dist/index.cjs");
const { Calendar } = require(distEntry);
const html = renderToStaticMarkup(
  React.createElement(Calendar, { defaultMonth: new Date(2026, 8, 1) }),
);
const cacheEntries = Object.keys(require.cache);
const localeBarrels = cacheEntries.filter((entry) =>
  /date-fns[\\/]locale(?:\.cjs|[\\/]index\.c?js)$/.test(entry),
);
assert.equal(
  localeBarrels.length,
  0,
  `CJS artifact loaded locale barrel: ${localeBarrels.join(", ")}`,
);
assert.match(html, /2026년 9월/, "Calendar must retain its Korean default caption");
assert.match(
  html,
  /aria-label="이전 달"/,
  "Calendar must retain its Korean default navigation label",
);

console.log(JSON.stringify({ localeBarrels, koreanDefault: true }));
