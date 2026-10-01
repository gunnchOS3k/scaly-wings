#!/usr/bin/env node
/**
 * Production-export regression for the Expo web app.
 * Serve the exported dist first, then:
 *   WEB_EXPORT_BASE=http://127.0.0.1:PORT node scripts/web-export-journey.mjs
 * The server must map extensionless routes to the matching .html file.
 */
import { chromium } from "playwright";

const base = process.env.WEB_EXPORT_BASE;
if (!base) {
  console.error("Set WEB_EXPORT_BASE to the served export, for example http://127.0.0.1:4173");
  process.exit(1);
}

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("pageerror", (error) => errors.push(String(error.message || error)));

const routes = ["/", "/arcade", "/games/pinball", "/settings"];
for (const route of routes) {
  const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 20000 });
  const text = await page.locator("#root").innerText();
  if (!response || response.status() !== 200) {
    throw new Error(`${route} status ${response && response.status()}`);
  }
  if (text.trim().length === 0) throw new Error(`ROOT_EMPTY ${route}`);
  if (/Minified React error/.test(text)) throw new Error(`REACT_ERROR_VISIBLE ${route}`);
}

const home = await page.locator("body").innerText();
if (!home.includes("Scaly Wings")) throw new Error("HOME_TITLE_MISSING");
if (!home.includes("Play Arcade")) throw new Error("HOME_CONTROLS_MISSING");

await page.getByText("Español", { exact: true }).click({ timeout: 8000 });
await page.waitForTimeout(400);
const switched = await page.locator("body").innerText();
if (!switched.includes("Jugar Arcade")) throw new Error("LANGUAGE_SWITCH_FAILED");

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (error) => errors.push(String(error.message || error)));
await mobile.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 20000 });
const layout = await mobile.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  text: document.body.innerText,
}));
if (!layout.text.includes("Scaly Wings")) throw new Error("MOBILE_BLANK");
if (layout.scrollWidth > layout.clientWidth + 1) throw new Error("MOBILE_HORIZONTAL_OVERFLOW");

const fatal = errors.filter((line) => /Minified React error|pageerror/i.test(line) || line.length > 0);
if (fatal.length) throw new Error(`NO_FATAL_REACT_ERROR failed: ${fatal.join(" | ")}`);

console.log("WEB_EXPORT_JOURNEY_PASS");
await browser.close();
