/**
 * 支持通过 name 路径批量/单项赋值 Pinia store 的工具方法
 * @param store Pinia store 实例
 * @param params { name: string, value: any }
 * name 支持 a.b.c 形式嵌套赋值
 */
/**
 * 用法示例：
 * setStoreValue(userStore, { name: 'profile.avatar', value: 'xxx.png' })
 * setStoreValueTyped(userStore, 'token', 'xxxx')
 * setStoreValues(userStore, [{ name: 'token', value: 'xxx' }, { name: 'profile.avatar', value: 'img.png' }])
 * getStoreValue(userStore, 'profile.avatar')
 * resetStore(userStore, { token: '', profile: { avatar: '' } })
 */
export function setStoreValue<T extends object>(store: T, params: { name: string; value: any }): void {
    const nameArr = params.name.split('.');
    let obj: any = store;
    if (nameArr.length >= 2) {
        for (let i = 0; i < nameArr.length - 1; i++) {
            if (!(nameArr[i] in obj)) {
                obj[nameArr[i]] = {};
            }
            obj = obj[nameArr[i]];
        }
        obj[nameArr[nameArr.length - 1]] = params.value;
    } else {
        (store as any)[params.name] = params.value;
    }
}

/**
 * 类型安全的嵌套属性赋值工具
 * @param store Pinia store 实例
 * @param path 属性路径（如 profile.avatar）
 * @param value 赋值内容
 */
export function setStoreValueTyped<T, K extends keyof T>(store: T, path: K, value: T[K]): void;
export function setStoreValueTyped<T>(store: T, path: string, value: any): void {
    const nameArr = path.split('.');
    let obj: any = store;
    if (nameArr.length >= 2) {
        for (let i = 0; i < nameArr.length - 1; i++) {
            if (!(nameArr[i] in obj)) {
                obj[nameArr[i]] = {};
            }
            obj = obj[nameArr[i]];
        }
        obj[nameArr[nameArr.length - 1]] = value;
    } else {
        (store as any)[path] = value;
    }
}

/**
 * 批量赋值 Pinia store 工具方法
 * @param store Pinia store 实例
 * @param values { name: string, value: any }[]
 */
export function setStoreValues<T extends object>(store: T, values: Array<{ name: string; value: any }>): void {
    values.forEach(item => setStoreValue(store, item));
}

/**
 * 获取嵌套属性值
 * @param store Pinia store 实例
 * @param path 属性路径（如 profile.avatar）
 * @returns 属性值
 */
export function getStoreValue<T>(store: T, path: string): any {
    const nameArr = path.split('.');
    let obj: any = store;
    for (let i = 0; i < nameArr.length; i++) {
        if (obj == null) return undefined;
        obj = obj[nameArr[i]];
    }
    return obj;
}

/**
 * 重置 Pinia store 为初始值
 * @param store Pinia store 实例
 * @param initial 初始值对象
 */
export function resetStore<T extends object>(store: T, initial: Partial<T>): void {
    Object.keys(initial).forEach(key => {
        (store as any)[key] = (initial as any)[key];
    });
}
