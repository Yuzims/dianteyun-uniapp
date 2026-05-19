import API_CONFIG from '@/config/api'

let inMemoryToken = ''
let inMemoryRefresh = ''

export function getToken(){
  if(inMemoryToken) return inMemoryToken
  const t = uni.getStorageSync(API_CONFIG.TOKEN_KEY) || ''
  inMemoryToken = t
  return t
}

export function setToken(token){
  inMemoryToken = token
  try{ uni.setStorageSync(API_CONFIG.TOKEN_KEY, token) }catch(e){}
}

export function getRefreshToken(){
  if(inMemoryRefresh) return inMemoryRefresh
  const t = uni.getStorageSync(API_CONFIG.REFRESH_TOKEN_KEY) || ''
  inMemoryRefresh = t
  return t
}

export function setRefreshToken(token){
  inMemoryRefresh = token
  try{ uni.setStorageSync(API_CONFIG.REFRESH_TOKEN_KEY, token) }catch(e){}
}

export function removeToken(){
  inMemoryToken = ''
  inMemoryRefresh = ''
  try{ uni.removeStorageSync(API_CONFIG.TOKEN_KEY); uni.removeStorageSync(API_CONFIG.REFRESH_TOKEN_KEY) }catch(e){}
}

export function initAuth(){
  const t = uni.getStorageSync(API_CONFIG.TOKEN_KEY)
  if(t) inMemoryToken = t
  const r = uni.getStorageSync(API_CONFIG.REFRESH_TOKEN_KEY)
  if(r) inMemoryRefresh = r
}

let isRefreshing = false
let refreshQueue = []

export function requestRefreshToken(){
  return new Promise((resolve, reject) => {
    if(isRefreshing){
      refreshQueue.push({ resolve, reject })
      return
    }
    isRefreshing = true
    const refreshToken = getRefreshToken()
    uni.request({
      url: API_CONFIG.BASE_URL + API_CONFIG.REFRESH_API,
      method: 'POST',
      data: { refresh_token: refreshToken },
      success(res){
        if(res && res.statusCode >=200 && res.statusCode < 300 && res.data){
          const data = res.data
          const newAccess = data.access_token || data.accessToken || data.token
          const newRefresh = data.refresh_token || data.refreshToken
          if(newAccess){
            setToken(newAccess)
            if(newRefresh) setRefreshToken(newRefresh)
            refreshQueue.forEach(q=>q.resolve(data))
            refreshQueue = []
            isRefreshing = false
            resolve(data)
            return
          }
        }
        const err = new Error('refresh failed')
        refreshQueue.forEach(q=>q.reject(err))
        refreshQueue = []
        isRefreshing = false
        reject(err)
      },
      fail(err){
        refreshQueue.forEach(q=>q.reject(err))
        refreshQueue = []
        isRefreshing = false
        reject(err)
      }
    })
  })
}
