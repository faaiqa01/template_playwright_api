import { promises as fs } from 'fs';
import path from 'path';

const projectRoot = process.cwd();

const TARGET_DIRS = [
    path.join('tests', 'api'),
    path.join('src', 'fixtures'),
];

const FILE_PATTERNS = [
    /(example|sample|template)\.spec\.(ts|js)$/i,
    /(example|sample|template)\.fixture\.(ts|js)$/i,
    /(example|sample|template)\.(ts|js)$/i,
];

const removedFiles: string[] = [];

const exists = async (targetPath: string): Promise<boolean> => {
    try {
        await fs.access(targetPath);
        return true;
    } catch {
        return false;
    }
};

const shouldRemove = (fileName: string): boolean => {
    return FILE_PATTERNS.some((pattern) => pattern.test(fileName));
};

const walkAndRemove = async (dirPath: string): Promise<void> => {
    if (!(await exists(dirPath))) {
        return;
    }

    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            await walkAndRemove(fullPath);
            continue;
        }

        if (shouldRemove(entry.name)) {
            await fs.unlink(fullPath);
            removedFiles.push(path.relative(projectRoot, fullPath));
        }
    }
};

const main = async (): Promise<void> => {
    for (const relativeDir of TARGET_DIRS) {
        await walkAndRemove(path.join(projectRoot, relativeDir));
    }

    if (removedFiles.length === 0) {
        console.log('Template cleanup completed. No sample/example/template files found.');
        return;
    }

    console.log('Template cleanup completed. Removed files:');
    for (const file of removedFiles) {
        console.log(`- ${file}`);
    }
};

main().catch((error: unknown) => {
    console.error('Template cleanup failed:', error);
    process.exit(1);
});
