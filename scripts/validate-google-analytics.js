import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../client/src/lib/googleAnalytics.ts", import.meta.url), "utf8");
const output = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

let analyticsScript;
const listeners = new Map();
const document = {
  cookie: "",
  title: "Sapiente.AI",
  createElement() {
    return {
      dataset: {},
      addEventListener(type, callback) { listeners.set(type, callback); },
      remove() {},
    };
  },
  getElementById() { return analyticsScript || null; },
  head: { appendChild(script) { analyticsScript = script; } },
};
const window = {
  location: {
    href: "https://www.sapienteai.com/pt/services",
    pathname: "/pt/services",
    search: "",
  },
};
const context = {
  document,
  window,
  localStorage: { getItem() { return null; } },
  module: { exports: {} },
  exports: {},
  console,
};
context.exports = context.module.exports;
vm.runInNewContext(output.outputText, context, { filename: "googleAnalytics.js" });

const analytics = context.module.exports;
analytics.initializeGoogleConsentMode();
analytics.applyGoogleConsent({ analytics: true, marketing: true });
assert.ok(analyticsScript, "The Google Analytics script was not created");
listeners.get("load")();
analytics.trackGooglePageView();

const commands = window.dataLayer.map((entry) => Array.from(entry));
assert.equal(commands.map((command) => command[0]).join(","), "consent,consent,js,config,event");
assert.equal(commands[0][0], "consent");
assert.equal(commands[0][1], "default");
assert.equal(commands[0][2].analytics_storage, "denied");
assert.equal(commands[0][2].ad_storage, "denied");
assert.equal(commands[0][2].ad_user_data, "denied");
assert.equal(commands[0][2].ad_personalization, "denied");
assert.equal(commands[1][0], "consent");
assert.equal(commands[1][1], "update");
assert.equal(commands[1][2].analytics_storage, "granted");
assert.equal(commands[1][2].ad_storage, "denied");
assert.equal(commands[1][2].ad_user_data, "denied");
assert.equal(commands[1][2].ad_personalization, "denied");
assert.equal(commands[2][0], "js");
assert.equal(commands[2].length, 2, 'The "js" command must contain exactly ["js", Date]');
assert.equal(typeof commands[2][1]?.getTime, "function", 'The "js" command must receive a Date instance');
assert.equal(commands[3][1], "G-QE1MDRYVJ6");
assert.equal(commands[3][2].send_page_view, false);
assert.equal(commands[3][2].allow_google_signals, false);
assert.equal(commands[3][2].allow_ad_personalization_signals, false);
assert.equal(commands[4][1], "page_view");
assert.equal(commands[4][2].send_to, "G-QE1MDRYVJ6");
assert.equal(commands[4][2].page_path, "/pt/services");

window.location.href = "https://www.sapienteai.com/pt/projects";
window.location.pathname = "/pt/projects";
analytics.trackGooglePageView();

const commandsAfterRouteChange = window.dataLayer.map((entry) => Array.from(entry));
assert.equal(
  commandsAfterRouteChange.filter((command) => command[0] === "consent").length,
  2,
  "Route changes must not enqueue duplicate consent updates",
);
assert.equal(commandsAfterRouteChange.at(-1)[0], "event");
assert.equal(commandsAfterRouteChange.at(-1)[1], "page_view");
assert.equal(commandsAfterRouteChange.at(-1)[2].send_to, "G-QE1MDRYVJ6");
assert.equal(commandsAfterRouteChange.at(-1)[2].page_path, "/pt/projects");

console.log("Google Analytics validation passed: consent, config and page_view are queued in the required order.");
