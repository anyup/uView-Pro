import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..', 'src', 'uni_modules', 'uview-pro', 'components');

const pattern = /#([0-9a-fA-F]{3,6})/g;
const counts = {};

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
        } else if (entry.isFile()) {
            let text;
            try {
                text = fs.readFileSync(fullPath, 'utf8');
            } catch (e) {
                text = fs.readFileSync(fullPath, { encoding: 'utf8', flag: 'r' });
            }
            let match;
            while ((match = pattern.exec(text)) !== null) {
                const hex = match[0].toLowerCase();
                counts[hex] = (counts[hex] || 0) + 1;
            }
        }
    }
}

walk(root);

Object.keys(counts)
    .sort()
    .forEach(hex => {
        console.log(`${hex} ${counts[hex]}`);
    });
