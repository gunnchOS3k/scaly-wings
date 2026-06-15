#!/usr/bin/env node
/**
 * Compare locale JSON files against English source keys.
 * Run: npm run i18n:check
 */
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/i18n/locales');
const sourceCode = 'en';
const targets = ['ar', 'fr', 'es', 'fi'];

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k === '_meta') continue;
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectKeys(v, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

function getValue(obj, keyPath) {
  return keyPath.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), obj);
}

let exitCode = 0;

let source;
try {
  source = loadJson(path.join(localesDir, `${sourceCode}.json`));
} catch (err) {
  console.error('✗ Invalid or missing source locale en.json:', err.message);
  process.exit(1);
}

const sourceKeys = collectKeys(source);
console.log(`Source (${sourceCode}): ${sourceKeys.length} keys\n`);

for (const code of targets) {
  const file = path.join(localesDir, `${code}.json`);
  if (!fs.existsSync(file)) {
    console.error(`✗ Missing locale file: ${code}.json`);
    exitCode = 1;
    continue;
  }

  let data;
  try {
    data = loadJson(file);
  } catch (err) {
    console.error(`✗ Invalid JSON in ${code}.json:`, err.message);
    exitCode = 1;
    continue;
  }

  const targetKeys = new Set(collectKeys(data));
  const missing = sourceKeys.filter((k) => !targetKeys.has(k));
  const extra = [...targetKeys].filter((k) => !sourceKeys.includes(k));
  const empty = sourceKeys.filter((k) => {
    const v = getValue(data, k);
    return v === '';
  });

  console.log(`── ${code.toUpperCase()} (${data._meta?.reviewer ?? 'no reviewer'}) ──`);
  if (missing.length) console.log(`  Missing keys (${missing.length}): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}`);
  else console.log('  Missing keys: none');
  if (extra.length) console.log(`  Extra keys (${extra.length}): ${extra.slice(0, 5).join(', ')}${extra.length > 5 ? '…' : ''}`);
  if (empty.length) console.log(`  Empty values (${empty.length})`);
  console.log('');
}

if (exitCode === 0) {
  console.log('✓ All locale files present and valid JSON.');
  console.log('  Draft locales may still need human review — see docs/TRANSLATION_REVIEW_WORKFLOW.md');
} else {
  console.log('✗ Localization check found blocking issues.');
}

process.exit(exitCode);
