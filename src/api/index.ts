import { http } from 'uview-pro';

export function getJson(id: string) {
    return loadJSON(`/${id}.json`);
}

export function getMarkdown(id: string) {
    return loadJSON(`/markdown/${id}.md`);
}

function loadJSON(path: string) {
    // 动态读取本地 json 文件，path 需以 /app/ 开头
    // #ifdef APP-HARMONY
    return new Promise((resolve, reject) => {
        const fs = uni.getFileSystemManager();
        const filePath = path.startsWith('/') ? `/static/app${path}` : `/static/app/${path}`;
        fs.readFile({
            filePath,
            encoding: 'utf-8',
            success: res => {
                try {
                    // res.data 可能为 string 或 ArrayBuffer
                    const data = typeof res.data === 'string' ? res.data : '';
                    resolve(data);
                } catch (e) {
                    console.error(e);
                    reject(e);
                }
            },
            fail: err => {
                reject(err);
            }
        });
    });
    // #endif
    // #ifndef APP-HARMONY
    return http.get(path, { t: Date.now() }, { meta: { loading: false } });
    // #endif
}
