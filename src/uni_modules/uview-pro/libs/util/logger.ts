// utils/logger.ts

// 定义原始控制台方法的类型
interface ConsoleMethods {
    log: typeof console.log;
    info: typeof console.info;
    warn: typeof console.warn;
    error: typeof console.error;
    debug?: typeof console.debug;
    trace?: typeof console.trace;
    table?: typeof console.table;
    time?: typeof console.time;
    timeEnd?: typeof console.timeEnd;
    group?: typeof console.group;
    groupEnd?: typeof console.groupEnd;
    groupCollapsed?: typeof console.groupCollapsed;
    assert?: typeof console.assert;
    clear?: typeof console.clear;
    count?: typeof console.count;
    countReset?: typeof console.countReset;
}

// 安全地获取控制台方法
const originalConsole: ConsoleMethods = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    trace: console.trace,
    table: console.table,
    time: console.time,
    timeEnd: console.timeEnd,
    group: console.group,
    groupEnd: console.groupEnd,
    groupCollapsed: console.groupCollapsed,
    assert: console.assert,
    clear: console.clear,
    count: console.count,
    countReset: console.countReset
};

// 检查并确保所有方法都存在，不存在的方法用空函数替代
Object.keys(originalConsole).forEach(key => {
    const methodKey = key as keyof ConsoleMethods;
    if (!originalConsole[methodKey]) {
        (originalConsole[methodKey] as any) = () => {};
    }
});

class Logger {
    private debugMode: boolean = false;
    private prefix: string = '[uViewPro]';
    private showCallerInfo: boolean = true;

    /**
     * 设置调试模式
     * @param enabled 是否启用调试模式
     */
    setDebugMode(enabled: boolean) {
        this.debugMode = !!enabled;

        if (this.debugMode) {
            console.log('[uViewPro] Debug mode enabled');
        } else {
            console.log('[uViewPro] Debug mode disabled');
        }
        return this;
    }

    /**
     * 设置是否显示调用者信息（文件名和行号）
     * @param show 是否显示调用者信息
     */
    setShowCallerInfo(show: boolean) {
        this.showCallerInfo = !!show;
        return this;
    }

    /**
     * 设置日志前缀
     * @param prefix 日志前缀
     */
    setPrefix(prefix: string) {
        if (prefix) this.prefix = prefix;
        return this;
    }

    /**
     * 获取当前调试模式状态
     * @returns 当前调试模式状态
     */
    getDebugMode(): boolean {
        return this.debugMode;
    }

    /**
     * 从文件路径中提取纯净的文件名（去除查询参数和路径）
     * @param filePath 文件路径
     * @returns 纯净的文件名
     */
    private extractFileName(filePath: string): string {
        if (!filePath) return '';

        // 去除查询参数（?后面的内容）
        const withoutQuery = filePath.split('?')[0];

        // 使用正斜杠和反斜杠分割路径，取最后一部分
        const parts = withoutQuery.split(/[/\\]/);
        const fileNameWithExt = parts.pop() || '';

        return fileNameWithExt;
    }

    /**
     * 获取调用者信息（文件名和行号）
     * @returns 调用者信息字符串
     */
    private getCallerInfo(): string {
        if (!this.showCallerInfo) return '';

        try {
            // 创建一个 Error 对象来获取堆栈跟踪
            const error = new Error();
            const stack = error.stack;

            if (!stack) return '';

            // 解析堆栈跟踪，找到调用 logger 的文件和行号
            const stackLines = stack.split('\n');

            // 找到第一个不是 logger.ts 的堆栈行
            for (let i = 3; i < stackLines.length; i++) {
                const line = stackLines[i].trim();
                if (line && !line.includes('logger.ts') && !line.includes('Logger.') && !line.includes('at Object.')) {
                    // 提取文件名和行号
                    const match = line.match(/\(?(.*):(\d+):(\d+)\)?/);
                    if (match) {
                        const filePath = match[1];
                        const lineNumber = match[2];
                        const fileName = this.extractFileName(filePath);
                        return `[${fileName}:${lineNumber}]`;
                    }
                    break;
                }
            }
        } catch (e) {
            // 如果获取调用者信息失败，静默处理
        }

        return '';
    }

    /**
     * 通用日志输出方法
     * @param level 日志级别
     * @param args 日志参数
     */
    private output(level: keyof ConsoleMethods, ...args: any[]): void {
        if (!this.debugMode || !originalConsole[level]) return;

        const method = originalConsole[level] as Function;
        const callerInfo = this.getCallerInfo();

        if (this.prefix) {
            if (callerInfo) {
                method(`${this.prefix}${callerInfo}`, ...args);
            } else {
                method(this.prefix, ...args);
            }
        } else {
            if (callerInfo) {
                method(callerInfo, ...args);
            } else {
                method(...args);
            }
        }
    }

    /**
     * 普通日志
     * @param args 日志参数
     */
    log(...args: any[]): void {
        this.output('log', ...args);
    }

    /**
     * 信息日志
     * @param args 日志参数
     */
    info(...args: any[]): void {
        this.output('info', ...args);
    }

    /**
     * 警告日志
     * @param args 日志参数
     */
    warn(...args: any[]): void {
        this.output('warn', ...args);
    }

    /**
     * 错误日志
     * @param args 日志参数
     */
    error(...args: any[]): void {
        this.output('error', ...args);
    }

    /**
     * 调试日志
     * @param args 日志参数
     */
    debug(...args: any[]): void {
        if (!originalConsole.debug) return;
        this.output('debug', ...args);
    }

    /**
     * 堆栈跟踪
     * @param args 日志参数
     */
    trace(...args: any[]): void {
        if (!originalConsole.trace) return;
        this.output('trace', ...args);
    }

    /**
     * 表格输出
     * @param data 表格数据
     * @param columns 列名（可选）
     */
    table(data: any, columns?: string[]): void {
        if (!this.debugMode || !originalConsole.table) return;

        if (this.prefix) {
            originalConsole.log!(this.prefix);
        }
        originalConsole.table!(data, columns);
    }

    /**
     * 开始计时
     * @param label 计时器标签
     */
    time(label: string): void {
        if (!this.debugMode || !originalConsole.time) return;

        const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
        originalConsole.time!(fullLabel);
    }

    /**
     * 结束计时
     * @param label 计时器标签
     */
    timeEnd(label: string): void {
        if (!this.debugMode || !originalConsole.timeEnd) return;

        const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
        originalConsole.timeEnd!(fullLabel);
    }

    /**
     * 分组日志
     * @param label 分组标签
     */
    group(label: string): void {
        if (!this.debugMode || !originalConsole.group) return;

        const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
        originalConsole.group!(fullLabel);
    }

    /**
     * 结束分组
     */
    groupEnd(): void {
        if (!this.debugMode || !originalConsole.groupEnd) return;
        originalConsole.groupEnd!();
    }

    /**
     * 分组日志（默认折叠）
     * @param label 分组标签
     */
    groupCollapsed(label: string): void {
        if (!this.debugMode || !originalConsole.groupCollapsed) return;

        const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
        originalConsole.groupCollapsed!(fullLabel);
    }

    /**
     * 断言
     * @param condition 条件
     * @param message 错误消息
     */
    assert(condition: boolean, ...message: any[]): void {
        if (!this.debugMode || !originalConsole.assert) return;

        if (this.prefix) {
            originalConsole.assert!(condition, this.prefix, ...message);
        } else {
            originalConsole.assert!(condition, ...message);
        }
    }

    /**
     * 清空控制台
     */
    clear(): void {
        if (!this.debugMode || !originalConsole.clear) return;
        originalConsole.clear!();
    }

    /**
     * 计数器
     * @param label 计数器标签
     */
    count(label?: string): void {
        if (!this.debugMode || !originalConsole.count) return;

        const fullLabel = this.prefix && label ? `${this.prefix} ${label}` : label || this.prefix;
        originalConsole.count!(fullLabel);
    }

    /**
     * 重置计数器
     * @param label 计数器标签
     */
    countReset(label?: string): void {
        if (!this.debugMode || !originalConsole.countReset) return;

        const fullLabel = this.prefix && label ? `${this.prefix} ${label}` : label || this.prefix;
        originalConsole.countReset!(fullLabel);
    }

    /**
     * 带样式的日志
     * @param style CSS样式
     * @param message 消息内容
     */
    styled(style: string, message: string): void {
        if (!this.debugMode) return;

        const callerInfo = this.getCallerInfo();
        const fullMessage = callerInfo ? `${message} ${callerInfo}` : message;

        if (this.prefix) {
            console.log(`%c${this.prefix} ${fullMessage}`, style);
        } else {
            console.log(`%c${fullMessage}`, style);
        }
    }
}

// 创建全局单例
const logger = new Logger();

// 导出单例和类
export { logger, Logger };
