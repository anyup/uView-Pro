/**
 * async-validator 类型声明文件
 * 适用于 uView Pro 内置 async-validator.js
 * 支持 Schema、规则、校验回调、辅助类型等
 */

declare type ValidateError = {
    message: string;
    field?: string;
    [key: string]: any;
};

declare type ValidateCallback = (errors?: ValidateError[] | null, fields?: Record<string, ValidateError[]> | null) => void;

declare interface ValidateRule {
    type?: string;
    required?: boolean;
    message?: string;
    validator?: (
        rule: ValidateRule,
        value: any,
        callback: ValidateCallback,
        source: Record<string, any>,
        options: ValidateOptions
    ) => void | boolean | string | Error | string[] | Promise<any>;
    asyncValidator?: (rule: ValidateRule, value: any, callback: ValidateCallback, source: Record<string, any>, options: ValidateOptions) => Promise<any>;
    enum?: any[];
    len?: number;
    min?: number;
    max?: number;
    pattern?: RegExp | string;
    whitespace?: boolean;
    fields?: Record<string, ValidateRule | ValidateRule[]>;
    defaultField?: ValidateRule | ValidateRule[];
    transform?: (value: any) => any;
    [key: string]: any;
}

declare interface ValidateOptions {
    messages?: Record<string, any>;
    suppressWarning?: boolean;
    first?: boolean;
    firstFields?: boolean | string[];
    keys?: string[];
    error?: (rule: ValidateRule, msg: string) => ValidateError;
    [key: string]: any;
}

declare class Schema {
    constructor(descriptor: Record<string, ValidateRule | ValidateRule[]>);
    messages(messages?: Record<string, any>): Record<string, any>;
    define(rules: Record<string, ValidateRule | ValidateRule[]>): void;
    validate(source: Record<string, any>, options?: ValidateOptions | ValidateCallback, callback?: ValidateCallback): Promise<void>;
    getType(rule: ValidateRule): string;
    getValidationMethod(rule: ValidateRule): Function | false;
    static register(type: string, validator: Function): void;
    static warning: (...args: any[]) => void;
    static messages: Record<string, any>;
}

export = Schema;
export as namespace Schema;
