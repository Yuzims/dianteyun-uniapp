import { createSSRApp } from 'vue'
import App from './App.vue'
import request from '@/utils/request'
import { initAuth } from '@/services/auth'

export function createApp() {
  const app = createSSRApp(App)
  // 初始化鉴权（从本地存储同步到内存）
  try{ initAuth() }catch(e){}
  // 挂载统一请求实例到全局
  if(app && app.config && !app.config.globalProperties.$request){
    app.config.globalProperties.$request = request
  }
  return {
    app,
  }
}
