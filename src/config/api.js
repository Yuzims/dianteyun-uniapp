const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE || 'https://wxapp.dteoc.cn',
  TIMEOUT: 10000,
  RETRY_COUNT: 1,
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  REFRESH_API: '/auth/refresh',
  TOKEN_HEADER: 'Authorization'
}

export default API_CONFIG
