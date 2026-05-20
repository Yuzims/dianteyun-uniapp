import request from '@/utils/request'

// 获取订单列表
// POST /api/dtygetsdolist
// 参数举例参考：telno, token, mandt, spras, wxflg, datef, datet, keyword, lfstka, lfstkb, lfstkc, lfstkx, page, pagesize
// 返回的数据字段保持后端原始字段：mandt, vbeln, lfstk, wxflg, erdat, ertim, menge, netwr, mtext
// 子项目字段：modnm, url
export function dtyGetsdolist(payload){
  return request.post('/api/dtygetsdolist', payload)
}

// 根据账套、单号取回销售订单
// 支持两种调用方式：
// 1) 传入对象参数（POST body）：{ mandt, spras, vbeln }
// 2) 直接传入口令字符串（将口令拼接到接口地址后）
// 返回数据字段保持原样，调用方请直接使用后端返回的字段名（如 vbeln, mandt, ...）
export function dtyGetsdo(params){
  if(typeof params === 'string'){
    // 口令方式：直接将口令拼接到路径
    return request.post(`/api/dtygetsdo/${params}`, {})
  }
  return request.post('/api/dtygetsdo', params)
}

export default {
  dtyGetsdolist,
  dtyGetsdo
}

