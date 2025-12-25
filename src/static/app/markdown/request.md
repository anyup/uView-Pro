<demo-model url="/pages/library/http/index"></demo-model>

# uni-app 轻量级 Http 请求库 <BadgeVersion text="0.0.19" />

支持 TypeScript、Vue3、组合式 API，插件化、全局配置、请求/响应拦截器、toast/loading 灵活控制，开箱即用，适合中小型项目。目前不适用于其他的请求形式，比如上传，下载等。

## 平台兼容性

|  App  |  H5   | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 |
| :---: | :---: | :--------: | :----------: | :--------: | :--------: | :------: |
|   √   |   √   |     √      |      √       |     √      |     √      |    √     |

put/delete 在某些小程序平台的限制：
- 1.delete请求，不支持支付宝和头条小程序(HX2.6.15)
- 2.put请求，不支持支付宝小程序(HX2.6.15)
---

## 特性亮点

- 支持 get/post/put/delete 四种常用请求
- 插件化注册，支持全局配置和拦截器
- toast、loading 可全局/单次请求灵活配置
- 拦截器支持 token 注入、统一错误处理、登录失效跳转等
- TypeScript 类型友好，支持组合式 API
- 可通过 `$u.http.get/post` 方式调用（需 import { $u } from 'uview-pro'）
- 适配 H5、App、各主流小程序平台

---

## 快速开始

### 1. 注册插件（main.ts）

如何定义全局请求配置和请求/响应拦截器，看下面：[#拦截器最佳实践](#拦截器最佳实践)

```ts
import { createSSRApp } from 'vue'
import uViewPro, { httpPlugin } from 'uview-pro'
import { httpInterceptor, httpRequestConfig } from 'http.interceptor'

export function createApp() {
  const app = createSSRApp(App)

  // 注册uView-pro
  app.use(uViewPro)

  // 注册http插件
  app.use(httpPlugin, {
    interceptor: httpInterceptor,
    requestConfig: httpRequestConfig,
  })

  return { app }
}
```

---

## 全局与动态配置

### 全局配置

```ts
import { http } from 'uview-pro'

http.setConfig({
  baseUrl: 'https://api.example.com',
  meta: {
    toast: true, // 全局开启错误toast，默认为false关闭
    loading: true, // 全局开启loading，默认为false关闭
    originalData: true, // 是否在拦截器中返回服务端的原始数据，默认为true返回的是原始数据
  },
})
```

### 单次请求动态配置

```ts
http.post('/api/login', { username: 'xx' }, {
  meta: { toast: true, loading: true }
})
```

---

## 基本用法

### 组合式 API

```ts
import { http } from 'uview-pro'

// GET
http.get('/api/user', { id: 1 }).then(res => { /* ... */ })

// POST
http.post('/api/login', { username: 'xx', password: 'xx' }).then(res => { /* ... */ })

// PUT/DELETE
http.put('/api/user/1', { name: 'new' })
http.delete('/api/user/1')
```

### await/async

```ts
const res = await http.post('/api/login', { username: 'xx' })
```

### 自定义 header

```ts
http.get('/api/user', {}, {
  header: { Authorization: 'Bearer token' }
})
```

---

## 拦截器最佳实践

### http.interceptor.ts 示例

```ts
import type { RequestConfig, RequestInterceptor, RequestMeta } from 'uview-pro'
import { useUserStore } from '@/store'

// 全局请求配置
export const httpRequestConfig: RequestConfig = {
    baseUrl,
    header: {
        'content-type': 'application/json'
    },
    meta: {
        originalData: true,
        toast: true,
        loading: true
    }
};

// 全局请求/响应拦截器
export const httpInterceptor: RequestInterceptor = {
  request: (config) => {
    const meta: RequestMeta = config.meta || {}
    if (meta.loading) {
      // 显示loading
    }
    const userStore = useUserStore()
    if (userStore.token) {
      config.header.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  response: (response) => {
    const meta: RequestMeta = response.config?.meta || {}
    if (meta.loading) {
      // 隐藏loading
    }

    // 根据业务处理错误、例如登录失效等处理接口返回错误码
    if (response.data.code !== 200) {
      if (meta.toast) {
        // 可以弹出错误toast
      }
      throw new Error('接口返回错误码，根据业务处理，可以弹出toast')
    }
    return response.data
  },
}
```

---

## $u 工具库用法

> 需 import { $u } from 'uview-pro'
> 
> $u.http.get/post/put/delete 参数与 http 保持一致

```ts
import { $u } from 'uview-pro'

$u.http.get('/api/user', { id: 1 }, { meta: { toast: true } })
$u.http.post('/api/login', { username: 'xx' }, { meta: { loading: true } })

// 或
uni.$u.http.get('/api/user', { id: 1 }, { meta: { toast: true } })
```

---

## API 管理推荐

建议将所有接口统一封装到 `api/index.ts`，便于维护和类型推断：

```ts
// api/index.ts
import { http } from 'uview-pro'

export const login = (data) => http.post('/api/login', data)
export const getUser = (id) => http.get('/api/user', { id })
```

页面中直接调用：

```ts
import { login, getUser } from '@/api'

const user = await getUser(1)
```

---

## 进阶用法

### 多实例/多拦截器

```ts
import { Request } from 'uview-pro'

const customHttp = new Request()
customHttp.setConfig({ baseUrl: 'https://other.api.com' })
customHttp.interceptor.request = (config) => {
  // ...自定义逻辑
  return config
}
```

### 扩展 meta 字段

你可以在 meta 中扩展自定义参数，在拦截器中读取：

```ts
http.get('/api/user', {}, { meta: { toast: true, customFlag: true } })
// 在拦截器中：config.meta?.customFlag
```

### 结合 hooks 封装

```ts
// hooks/useApi.ts
import { http } from 'uview-pro'
export function useApi() {
  return {
    login: (data) => http.post('/api/login', data),
    getUser: (id) => http.get('/api/user', { id }),
  }
}
```

---

## 类型提示与 TS 支持

- 所有请求方法均有完整类型推断
- 支持泛型：`http.get<MyResType>(url)`
- 支持自定义 Request/Response 类型
- 推荐在 api 层定义类型，页面调用自动推断

---

## 常见问题 FAQ

### 1. 如何全局配置 baseUrl、header、meta？

> 使用 `http.setConfig({ ... })`，建议在 main.ts 或拦截器注册前调用。

### 2. 如何单次请求自定义 toast/loading？

> 通过 meta 字段：`http.post(url, data, { meta: { toast: true, loading: true } })`

### 3. 如何自定义拦截器？

> 参考 http.interceptor.ts，request/response 可灵活扩展。

### 4. 如何在组合式 API 中优雅使用？

> 直接 `import { http }`，无需 getCurrentInstance。

### 5. 如何处理多环境/多 baseUrl？

> 可通过 setConfig 动态切换，或 new Request() 多实例。

### 6. 如何捕获和处理错误？

> 建议统一在 response 拦截器处理，页面可用 try/catch 或 .catch。

### 7. $u.http.get/post 与 http 有什么区别？

> $u.http.get/post 适配 uview-pro 导出的 http，参数与 http 完全一致，底层同一实现。
> 即以下方式是同等的：

```js
import { $u, http } from 'uview-pro'

// 方式一
http.get('/api/user', { id: 1 }, { meta: { toast: true } })

// 方式二
$u.http.get('/api/user', { id: 1 }, { meta: { toast: true } })

// 方式三
uni.$u.http.get('/api/user', { id: 1 }, { meta: { toast: true } })

```

### 8. put/delete 在小程序平台有限制吗？

> put/delete 在支付宝、头条等部分平台有限制，详见最上方提示。

---

