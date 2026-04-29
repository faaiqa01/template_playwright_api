#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const rulesDir = resolve(root, 'standards', 'rules');
const files = ['AGENTS.md', 'SOUL.md', 'CONTRIBUTING.md'];
const mode = process.argv[2];

if (!mode || !['to-root', 'from-root'].includes(mode)) {
    console.error('Usage: node scripts/sync-rules.mjs <to-root|from-root>');
    process.exit(1);
}

mkdirSync(rulesDir, { recursive: true });

for (const file of files) {
    const rootFile = resolve(root, file);
    const rulesFile = resolve(rulesDir, file);

    if (mode === 'to-root') {
        if (!existsSync(rulesFile)) {
            console.error(`Missing source file: ${rulesFile}`);
            process.exit(1);
        }
        copyFileSync(rulesFile, rootFile);
        console.log(`Synced to root: ${file}`);
    } else {
        if (!existsSync(rootFile)) {
            console.error(`Missing source file: ${rootFile}`);
            process.exit(1);
        }
        copyFileSync(rootFile, rulesFile);
        console.log(`Synced from root: ${file}`);
    }
}