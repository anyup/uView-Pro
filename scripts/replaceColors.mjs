import fs from 'fs';
import path from 'path';

const rootDir = path.join('src', 'uni_modules', 'uview-pro', 'components');

const replacements = new Map(
    Object.entries({
        '#ffffff': 'var(--u-white-color)',
        '#fefefe': 'var(--u-white-color)',
        '#000000': 'var(--u-black-color)',
        '#303133': 'var(--u-main-color)',
        '#323233': 'var(--u-main-color)',
        '#333333': 'var(--u-main-color)',
        '#585858': 'var(--u-content-color)',
        '#606266': 'var(--u-content-color)',
        '#909399': 'var(--u-tips-color)',
        '#969799': 'var(--u-tips-color)',
        '#888992': 'var(--u-tips-color)',
        '#888888': 'var(--u-tips-color)',
        '#8799a3': 'var(--u-tips-color)',
        '#8f8d8e': 'var(--u-tips-color)',
        '#b2b2b2': 'var(--u-light-color)',
        '#b7b7b7': 'var(--u-light-color)',
        '#c0c4cc': 'var(--u-light-color)',
        '#c7c7c7': 'var(--u-light-color)',
        '#c8c9cc': 'var(--u-info-disabled)',
        '#cccccc': 'var(--u-light-color)',
        '#d4d4d4': 'var(--u-divider-color)',
        '#dcdfe6': 'var(--u-form-item-border-color)',
        '#dddddd': 'var(--u-divider-color)',
        '#e1e1e1': 'var(--u-divider-color)',
        '#e4e4e4': 'var(--u-divider-color)',
        '#e4e7ed': 'var(--u-border-color)',
        '#e5e5e5': 'var(--u-divider-color)',
        '#e7e6eb': 'var(--u-divider-color)',
        '#eaeef1': 'var(--u-bg-surface-color)',
        '#ebedf0': 'var(--u-bg-surface-color)',
        '#ebeef5': 'var(--u-bg-surface-color)',
        '#ececec': 'var(--u-divider-color)',
        '#eeeeef': 'var(--u-divider-color)',
        '#f2f2f2': 'var(--u-bg-surface-color)',
        '#f2f3f5': 'var(--u-bg-surface-color)',
        '#f3f4f6': 'var(--u-bg-color)',
        '#f7f7f7': 'var(--u-bg-surface-color)',
        '#f7f8fa': 'var(--u-bg-surface-color)',
        '#f56c6c': 'var(--u-type-error)',
        '#fa3534': 'var(--u-type-error)',
        '#fde2e2': 'var(--u-type-error-light)',
        '#faecd8': 'var(--u-type-warning-light)',
        '#ff9900': 'var(--u-type-warning)',
        '#19be6b': 'var(--u-type-success)',
        '#00c777': 'var(--u-type-success)',
        '#04b00f': 'var(--u-type-success-dark)',
        '#bef5c8': 'var(--u-type-success-light)',
        '#2979ff': 'var(--u-type-primary)',
        '#fff': 'var(--u-white-color)',
        '#000': 'var(--u-black-color)',
        '#333': 'var(--u-main-color)',
        '#bbb': 'var(--u-light-color)',
        '#eee': 'var(--u-divider-color)',
        '#ddd': 'var(--u-divider-color)'
    })
);

const filesUpdated = [];

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let replaced = false;
    replacements.forEach((value, key) => {
        const pattern = new RegExp(key.replace('#', '\\#'), 'gi');
        if (pattern.test(content)) {
            content = content.replace(pattern, value);
            replaced = true;
        }
    });
    if (replaced) {
        fs.writeFileSync(filePath, content, 'utf8');
        filesUpdated.push(filePath);
    }
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
        } else if (entry.isFile()) {
            replaceInFile(fullPath);
        }
    }
}

walk(rootDir);

console.log(`Updated ${filesUpdated.length} files.`);
