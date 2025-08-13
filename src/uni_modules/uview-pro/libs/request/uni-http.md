# uni-http 使用说明（useHttp hooks 版）

> 本文档适用于 uView Pro 3.x 及以上版本，推荐使用 hooks 方式引入 Http 请求库。

## 目录
- [简介](#简介)
- [快速开始](#快速开始)
- [类型定义](#类型定义)
- [拦截器用法](#拦截器用法)
- [常见用例](#常见用例)
- [常见问题](#常见问题)
- [类型提示与 TS 支持](#类型提示与 TS 支持)
- [FAQ](#faq)

---

## 简介

`uni-http` 是基于 Promise 封装的 uni-app HTTP 请求库，支持全局配置、请求/响应拦截、类型安全、hooks 化调用，适配多端。推荐通过 `useHttp` hooks 工厂函数创建实例，支持全局单例和按需实例化。

## 快速开始

### 1. 引入 useHttp
```ts
import useHttp from '@/uni_modules/uview-pro/libs/request/uni-http';
```

### 2. 创建 http 实例
```ts
const http = useHttp({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  header: { 'Content-Type': 'application/json' }
});
```

### 3. 发起请求
```ts
// GET
http.get('/user/info', { params: { id: 1 } })
  .then(res => { /* ... */ })
  .catch(err => { /* ... */ });

// POST
http.post('/user/update', { name: '张三' })
  .then(res => { /* ... */ });
```

## 类型定义

```ts
interface HttpRequestConfig {
  baseURL?: string;
  timeout?: number;
  header?: Record<string, any>;
  [key: string]: any;
}

interface HttpResponse<T = any> {
  code: number;
  data: T;
  msg: string;
  [key: string]: any;
}

interface Http {
  get<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  delete<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  // ... 其他方法
  setRequestInterceptor(fn: (config: HttpRequestConfig) => HttpRequestConfig | Promise<HttpRequestConfig>): void;
  setResponseInterceptor(fn: (response: HttpResponse) => HttpResponse | Promise<HttpResponse>): void;
}
```

## 拦截器用法

### 请求拦截器
```ts
http.setRequestInterceptor(config => {
  // 可统一添加 token、日志等
  config.header = config.header || {};
  config.header.Authorization = 'Bearer ' + uni.getStorageSync('token');
  return config;
});
```

### 响应拦截器
```ts
http.setResponseInterceptor(response => {
  if (response.code !== 0) {
    uni.showToast({ title: response.msg || '请求失败', icon: 'none' });
  }
  return response;
});
```

## 常见用例

### 1. 全局单例
```ts
// src/common/http.ts
import useHttp from '@/uni_modules/uview-pro/libs/request/uni-http';
const http = useHttp({ baseURL: 'https://api.example.com' });
export default http;
```

### 2. 组件内按需实例化
```ts
import useHttp from '@/uni_modules/uview-pro/libs/request/uni-http';
const http = useHttp();
```

### 3. 类型推断
```ts
interface UserInfo { id: number; name: string; }
const res = await http.get<UserInfo>('/user/info');
console.log(res.data.id);
```

### 4. 错误处理
```ts
http.get('/error/api').catch(err => {
  uni.showToast({ title: err.message, icon: 'none' });
});
```

## 常见问题

- **Q: 如何全局配置 baseURL、header？**
  A: 在 useHttp({ baseURL, header }) 传入即可。
- **Q: 如何自定义拦截器？**
  A: 通过 setRequestInterceptor/setResponseInterceptor。
- **Q: 支持多实例吗？**
  A: 支持，useHttp 可多次调用。
- **Q: 支持类型推断吗？**
  A: 支持，泛型参数自动推断返回数据类型。

## 类型提示与 TS 支持

- 完全 TypeScript 支持，类型自动推断。
- 推荐在 `tsconfig.json` 中包含 `uni-http.ts` 路径。

## FAQ

- **Q: 还能用 new Http() 吗？**
  A: 不推荐，已废弃。请统一使用 useHttp。
- **Q: 如何清理拦截器？**
  A: 暂不支持移除，建议重新实例化。
- **Q: 支持 uni.uploadFile、downloadFile 吗？**
  A: 暂未内置，可自行扩展。

---

如有更多问题，欢迎提 Issue 或 PR。
