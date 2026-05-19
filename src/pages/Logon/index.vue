<script setup>
import { computed, reactive, ref, onBeforeUnmount } from 'vue'
import { dtyLogin, dtySendSms } from '@/services/api/exampleApi'
import { setRefreshToken, setToken, getToken } from '@/services/auth'

const loginMode = ref('buyer')
const loading = ref(false)
const smsSending = ref(false)
const countdown = ref(0)
const agreeTerms = ref(true)

const formData = reactive({
  mobile: '',
  smsCode: '',
  mandt: '',
  bname: '',
  password: ''
})

const isBuyerMode = computed(() => loginMode.value === 'buyer')
const submitText = computed(() => loading.value ? '登录中...' : '登录')
const sendCodeText = computed(() => {
  if(smsSending.value) return '发送中...'
  if(countdown.value > 0) return `${countdown.value}s`
  return '获取验证码'
})

let countdownTimer = null

function switchMode(mode){
  if(loginMode.value === mode) return
  loginMode.value = mode
}

function resetCountdown(){
  if(countdownTimer){
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  countdown.value = 0
}

function startCountdown(){
  resetCountdown()
  countdown.value = 60
  countdownTimer = setInterval(() => {
    countdown.value -= 1
    if(countdown.value <= 0){
      resetCountdown()
    }
  }, 1000)
}

onBeforeUnmount(() => {
  resetCountdown()
})

function toast(message){
  uni.showToast({ title: message, icon: 'none', duration: 2000 })
}

function validateBuyerForm(){
  if(!formData.mobile.trim()) return '请输入手机号'
  if(!formData.smsCode.trim()) return '请输入验证码'
  return ''
}

function validateMerchantForm(){
  if(!formData.mandt.trim()) return '请输入商家ID'
  if(!formData.bname.trim()) return '请输入登录账号'
  if(!formData.password.trim()) return '请输入登录密码'
  return ''
}

async function sendSms(){
  if(!isBuyerMode.value){
    toast('商家模式无需验证码')
    return
  }
  if(smsSending.value || countdown.value > 0) return
  if(!formData.mobile.trim()){
    toast('请先输入手机号')
    return
  }

  smsSending.value = true
  try{
    await dtySendSms({ guiver: 'XYT3', mobile: formData.mobile.trim() })
    toast('验证码已发送')
    startCountdown()
  }catch(err){
    toast(err?.message || '验证码发送失败')
  }finally{
    smsSending.value = false
  }
}

async function submitLogin(){
  if(!agreeTerms.value){
    toast('请先阅读并同意用户协议和隐私政策')
    return
  }

  const validationMessage = isBuyerMode.value ? validateBuyerForm() : validateMerchantForm()
  if(validationMessage){
    toast(validationMessage)
    return
  }

  loading.value = true
  try{
    const payload = isBuyerMode.value
      ? {
          spras: '1',
          ltype: '',
          mobile: formData.mobile.trim(),
          smscode: formData.smsCode.trim()
        }
      : {
          spras: '1',
          ltype: 'M',
          mandt: formData.mandt.trim(),
          bname: formData.bname.trim(),
          password: formData.password
        }

    const response = await dtyLogin(payload)
    const result = response?.data || {}
    const token =
      result.token ||
      result.access_token ||
      result.accessToken ||
      result?.result?.token ||
      result?.result?.access_token ||
      result?.result?.accessToken ||
      result?.data?.token ||
      result?.data?.access_token ||
      result?.data?.accessToken
    const refreshToken =
      result.refresh_token ||
      result.refreshToken ||
      result?.result?.refresh_token ||
      result?.result?.refreshToken ||
      result?.data?.refresh_token ||
      result?.data?.refreshToken

    if(token){
      setToken(token)
      if(refreshToken) setRefreshToken(refreshToken)
    }

    // 确认 token 已保存后再跳转，避免鉴权守卫把用户重定向回登录页
    const saved = !!getToken()
    toast(response?.message || result?.result?.message || (saved ? '登录成功' : '登录失败'))
    if(saved){
      setTimeout(() => {
        // 选购页是 tabBar 页面，需要使用 switchTab
        uni.switchTab({ url: '/pages/mais/index' })
      }, 250)
    }
  }catch(err){
    toast(err?.message || '登录失败')
  }finally{
    loading.value = false
  }
}
</script>

<template>
  <view class="wrap">
    <view class="panel">
      <view class="header-bg"></view>

      <view class="logo-box">
        <image class="logo-placeholder" src="@/static/image-outline.svg" mode="aspectFill"></image>
        <text class="app-name">点特云</text>
        <text class="version">V3.9.5</text>
      </view>

      <view class="switch-row" @tap="switchMode(isBuyerMode ? 'merchant' : 'buyer')">
        <image class="switch-icon" src="@/static/person-outline.svg" mode="aspectFill"></image>
        <text class="switch-text">{{ isBuyerMode ? '切换为商家' : '切换为买家' }}</text>
      </view>

      <view class="form">
        <template v-if="isBuyerMode">
          <view class="input-row underline-row">
            <image class="input-icon" src="@/static/image-outline.svg" mode="aspectFill"></image>
            <input v-model="formData.mobile" class="input" type="number" maxlength="11" placeholder="请输入手机号" />
          </view>

          <view class="input-row underline-row code-row">
            <image class="input-icon" src="@/static/image-outline.svg" mode="aspectFill"></image>
            <input v-model="formData.smsCode" class="input" type="number" maxlength="6" placeholder="请输入验证码" />
            <text class="get-code" :class="{disabled: countdown>0 || smsSending}" @tap="sendSms">{{ sendCodeText }}</text>
          </view>
        </template>

        <template v-else>
          <view class="input-row underline-row merchant-id-row">
            <image class="input-icon" src="@/static/image-outline.svg" mode="aspectFill"></image>
            <input v-model="formData.mandt" class="input" placeholder="请输入商家ID" />
            <image class="scan-icon" src="@/static/scan-icon.svg" mode="aspectFill"></image>
          </view>

          <view class="input-row underline-row">
            <image class="input-icon" src="@/static/image-outline.svg" mode="aspectFill"></image>
            <input v-model="formData.bname" class="input" placeholder="请输入登录账号" />
          </view>

          <view class="input-row underline-row">
            <image class="input-icon" src="@/static/image-outline.svg" mode="aspectFill"></image>
            <input v-model="formData.password" class="input" type="password" placeholder="请输入登录密码" />
          </view>
        </template>

        <button class="login-btn" :loading="loading" :disabled="loading" @tap="submitLogin">
          {{ submitText }}
        </button>

        <view class="tips">
          <text class="tips-title">重要提示</text>
          <ol class="tips-list">
            <li>1、手机号是你进货时留给供应商的手机号</li>
            <li>2、请确认商家是否为你建立客户时填写的手机号，填写了你的手机号的所有商家销售单据都会在这里查到</li>
          </ol>
        </view>

        <view class="footer-links">
          <text>登录/注册表示您同意</text>
          <text class="link">《用户协议》</text>
          <text>和</text>
          <text class="link">《隐私政策》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.wrap {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #e8f6ff 0%, #f7fbff 40%, #ffffff 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0rpx;
  box-sizing: border-box;
}

.panel {
  width: 100%;
  max-width: 720rpx;
  background: #fff;
  border-radius: 18rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 30rpx rgba(0,0,0,0.06);
  margin: 24rpx 20rpx;
  position: relative;
}
.panel {
  margin: 12rpx 12rpx 24rpx;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 40rpx;
}

.header-bg {
  height: 220rpx;
  background: linear-gradient(180deg,#e8f6ff 0%, #ffffff 100%);
}

.logo-box {
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:-60rpx;
  margin-bottom: 30rpx;
}
.logo-placeholder {
  width:72rpx;
  height:72rpx;
  background:#f4f6fb;
  border-radius:8rpx;
  border:1rpx solid #e6eef9;
}
.app-name { font-size:32rpx; font-weight:700; margin-top:12rpx; color:#222 }
.version { font-size:20rpx; color:#9aa6b3; margin-top:6rpx }

.switch-row { display:flex; align-items:center; margin-top:20rpx; padding-left:36rpx }
.switch-icon { width:26rpx; height:26rpx; margin-right:10rpx }
.switch-text { color:#333; font-size:24rpx; font-weight:600; }

.form { margin: 20rpx 36rpx 36rpx; display:flex; flex-direction:column; align-items:center }
.input-row { width:95%; display:flex; align-items:center; padding:12rpx 8rpx; margin-bottom:10rpx; }
.underline-row { border-bottom:1rpx solid #eef6fb }
.input-icon { width:30rpx; height:30rpx; background:#f4f6fb; border-radius:6rpx; margin-right:12rpx; flex-shrink:0 }
.input { flex: 1; border:none; outline:none; font-size:28rpx; color:#999; background:transparent }
.input-row { width:95%; display:flex; align-items:center; padding:16rpx 12rpx; margin-bottom:14rpx; }
.underline-row { border-bottom:1.5rpx solid #eef6fb }
.input-icon { width:36rpx; height:36rpx; margin-right:14rpx; }
.input { flex: 1; height:48rpx; font-size:30rpx; }
.input::placeholder { color:#cfcfcf }

.code-row { align-items:center }
.get-code { color:#1e90ff; font-size:26rpx; margin-left:12rpx }
.get-code.disabled { color:#aab8c6 }

.merchant-id-row { align-items:center }
.scan-icon { width:28rpx; height:28rpx; margin-left:12rpx }

.login-btn { width:78%; height:68rpx; border-radius:34rpx; background:#fbfdff; border:1rpx dashed #d7ecff; color:#1e90ff; font-size:28rpx; font-weight:600; display:block; text-align:center; line-height:68rpx }
.login-btn { height:76rpx; border-radius:38rpx; font-size:30rpx; margin:50rpx 0; line-height:76rpx; }
.login-btn[disabled] { opacity:0.7 }

.tips {  padding: 0 12rpx }
.tips-title { display:inline-block; color:#e53935; font-weight:700; font-size:26rpx;margin-bottom: 30rpx; }
.tips-list { margin:0; padding-left:18rpx; color:#666; font-size:26rpx }
.tips-list li { margin-bottom:6rpx }

.footer-links { margin-top:20rpx; color:#9aa6b3; font-size:22rpx; display:flex; align-items:center; justify-content:center; flex-wrap:wrap }
.footer-links .link { color:#1e90ff; margin:0 6rpx }

@media (max-width: 720px) {
  .panel { margin: 0; border-radius: 0; box-shadow: none }
  .form { margin: 18rpx }
  .app-name { font-size:30rpx }
}
</style>