#!/usr/bin/env node
/**
 * Claude Code hook for Edit/Write/MultiEdit.
 *
 *   node guard-edits.js pre   -> PreToolUse: blocks edits to generated/managed files
 *   node guard-edits.js post  -> PostToolUse: optional reminders and prettier formatting
 *
 * Hook input arrives as JSON on stdin ({ tool_input: { file_path }, cwd }).
 * Exit code 2 blocks the tool call and feeds stderr back to Claude.
 * Any unexpected error exits 0 so a broken hook never wedges a session.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CONFIG = {
  "blocked": [
    {
      "pattern": "(package-lock\\.json|pnpm-lock\\.yaml|yarn\\.lock|\\.lock)$",
      "reason": "Do not edit lock files. Run npm install instead."
    },
    {
      "pattern": "[\\\\/]node_modules[\\\\/]",
      "reason": "Do not edit node_modules."
    }
  ],
  "reminders": [],
  "prettier": false
};

const FORMATTABLE = /\.(ts|tsx|js|jsx|mjs|cjs|json|css|scss|md|mdx|html|yml|yaml)$/i;

function readInput() {
  return JSON.parse(fs.readFileSync(0, 'utf8'));
}

// Runs the project's own prettier on one file; silent on success, never blocks.
function formatWithPrettier(filePath, projectDir) {
  if (!FORMATTABLE.test(filePath) || /[\\/]node_modules[\\/]/.test(filePath)) return;
  let bin;
  try {
    bin = require.resolve('prettier/bin/prettier.cjs', { paths: [projectDir] });
  } catch {
    return; // prettier not installed in this project
  }
  const result = spawnSync(process.execPath, [bin, '--write', '--log-level', 'warn', filePath], {
    cwd: projectDir,
    encoding: 'utf8',
    timeout: 20000,
  });
  if (result.status !== 0 && result.stderr) {
    process.stderr.write(`prettier: ${result.stderr.trim().split('\n')[0]}\n`);
  }
}

function main() {
  const mode = process.argv[2];
  const input = readInput();
  const filePath = (input.tool_input && input.tool_input.file_path) || '';
  if (!filePath) return;
  const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();

  if (mode === 'pre') {
    const hit = CONFIG.blocked.find((rule) => new RegExp(rule.pattern, 'i').test(filePath));
    if (hit) {
      process.stderr.write(`BLOCKED: ${hit.reason} (${filePath})\n`);
      process.exit(2);
    }
    return;
  }

  if (mode === 'post') {
    if (CONFIG.prettier) formatWithPrettier(filePath, projectDir);
    const reminder = CONFIG.reminders.find((r) => new RegExp(r.pattern, 'i').test(filePath));
    if (reminder) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: reminder.message },
      }));
    }
  }
}

try {
  main();
} catch (err) {
  process.stderr.write(`guard-edits hook error (ignored): ${err.message}\n`);
  process.exit(0);
}
