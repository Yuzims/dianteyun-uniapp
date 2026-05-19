# API 使用与约定

简要说明：项目使用统一请求封装 `src/utils/request.js`（基于 `uni.request`），鉴权由 `src/services/auth.js` 管理，token 持久化到 `uni` 存储，运行时缓存于内存。

- 请求：使用 `import request from '@/utils/request'`，并调用 `request.get(url, params)` / `request.post(url, data)`。
- 响应：统一返回结构 `{ success, code, message, data }`；异常会以 `Error` 抛出，`err.raw` 包含原始返回。
- 鉴权：token 存储 key 为 `auth_token`，刷新 token key 为 `refresh_token`。当后端返回 401 时，封装会触发 `refresh_token` 接口并重试原请求（单点刷新 + 并发排队）。
- 配置：请在 `src/config/api.js` 中配置 `BASE_URL` 与 `REFRESH_API` 等参数。

示例：

```js
import request from '@/utils/request'

async function load(){
  try{
    const res = await request.get('/user/profile')
    if(res.success){ console.log(res.data) }
  }catch(err){
    // 处理错误
    console.error(err)
  }
}
```

注意事项：
- 若需要将 token 同步到状态管理（Pinia/Vuex），在 `src/main.js` 的初始化阶段从 `uni.getStorageSync` 同步一次。
- 后端返回格式若与默认约定不一致，请在 `src/utils/request.js` 的 `normalizeResponse` 中调整解析规则。
