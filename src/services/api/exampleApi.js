import request from '@/utils/request'

// 通用登录接口：点特云小程序商家/买家登录
// 参数参考：spras, ltype, mobile, smscode, mandt, bname, password
export function dtyLogin(payload){
  return request.post('/api/dtylogin', payload)
}

// 发送短信验证码
// 参数参考：guiver, mobile
export function dtySendSms(payload){
  return request.post('/api/dtysendsms', payload)
}

export function getProfile(){
  return request.get('/user/profile')
}

export function uploadFile(filePath, extraData = {}){
  return new Promise((resolve, reject)=>{
    uni.uploadFile({
      url: (process.env.VUE_APP_API_BASE || 'https://wxapp.dteoc.cn') + '/upload',
      filePath,
      name: 'file',
      formData: extraData,
      success(res){
        try{ const body = JSON.parse(res.data); resolve(body) }catch(e){ resolve(res) }
      },
      fail(err){ reject(err) }
    })
  })
}
