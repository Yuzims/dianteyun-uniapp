import { getToken } from '@/services/auth'

const HOME_ROUTE = '/pages/home/index'
const LOGIN_ROUTE = '/pages/Logon/index'

function getCurrentRoute(){
  const pages = getCurrentPages()
  const current = pages[pages.length - 1]
  return current && current.route ? current.route : ''
}

export function ensureAuth(){
  const route = getCurrentRoute().replace(/^\//, '')
  const hasToken = !!getToken()

  // 在应用极早期生命周期可能拿不到路由，避免误判
  if(!route){
    return true
  }

  if(route === 'pages/Logon/index'){
    if(hasToken){
      uni.reLaunch({ url: HOME_ROUTE })
      return false
    }
    return true
  }

  if(!hasToken){
    uni.reLaunch({ url: LOGIN_ROUTE })
    return false
  }

  return true
}