import API_CONFIG from '@/config/api'
import * as auth from '@/services/auth'

function uniAdapter(opts){
  return new Promise((resolve, reject)=>{
    const headers = Object.assign({}, opts.headers || {})
    // 如果调用方显示要求跳过鉴权或调用的是登录接口，则不自动添加 Authorization
    const skipAuth = opts.skipAuth || (opts.url && String(opts.url).toLowerCase().includes('/dtylogin'))
    const token = auth.getToken()
    if(!skipAuth && token){ headers[API_CONFIG.TOKEN_HEADER] = `Bearer ${token}` }

    uni.request({
      url: (opts.baseURL || API_CONFIG.BASE_URL) + (opts.url || ''),
      method: (opts.method || 'GET').toUpperCase(),
      data: opts.data || {},
      header: headers,
      timeout: API_CONFIG.TIMEOUT,
      success(res){ resolve(res) },
      fail(err){ reject(err) }
    })
  })
}

function normalizeResponse(res){
  const status = res.statusCode || (res[0] && res[0].status) || 0
  const body = res.data !== undefined ? res.data : res[1]
  if(status >= 200 && status < 300){
    if(body && typeof body === 'object' && body.result && typeof body.result === 'object' && 'result' in body.result){
      const resultFlag = String(body.result.result || '').toLowerCase()
      const message = body.result.message || body.message || ''
      const code = body.code === undefined ? status : body.code
      if(resultFlag === 'error'){
        const err = new Error(message || '请求失败')
        err.code = code
        err.raw = res
        throw err
      }
      return { success: true, code, message, data: body }
    }
    // Common backend structure support
    if(body && typeof body === 'object' && ('code' in body || 'data' in body)){
      const code = body.code === undefined ? status : body.code
      const message = body.message || ''
      const data = body.data !== undefined ? body.data : body
      return { success: code === 0 || code === 200 || (code >= 200 && code < 300), code, message, data }
    }
    return { success: true, code: status, message: '', data: body }
  }
  const err = new Error(body && body.message ? body.message : `HTTP ${status}`)
  err.code = status
  err.raw = res
  throw err
}

async function request(opts = {}){
  const retryCount = opts._retryCount || 0
  try{
    const res = await uniAdapter(opts)
    // handle 401
    const status = res.statusCode
    if(status === 401 || (res.data && (res.data.code === 401 || res.data.code === '401'))){
      // try refresh
      await auth.requestRefreshToken()
      // retry original once
      if(retryCount < (opts.retry || API_CONFIG.RETRY_COUNT)){
        opts._retryCount = retryCount + 1
        return request(opts)
      }
    }
    return normalizeResponse(res)
  }catch(err){
    // network errors or other errors
    if(err && err.code === 401 && retryCount < (opts.retry || API_CONFIG.RETRY_COUNT)){
      try{ await auth.requestRefreshToken(); opts._retryCount = retryCount + 1; return request(opts) }catch(e){}
    }
    throw err
  }
}

function get(url, params, opts = {}){ return request(Object.assign({}, opts, { url, method: 'GET', data: params })) }
function post(url, data, opts = {}){ return request(Object.assign({}, opts, { url, method: 'POST', data })) }

export default { request, get, post }
