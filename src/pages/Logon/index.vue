<template>
  <view class="wrap">
    <!-- 左侧示例面板（切换为买家） -->
    <view class="side-panel">
      <view class="side-inner">
        <text class="side-title">切换为买家</text>
        <view class="side-row">
          <view class="avatar"></view>
          <text class="side-text">深圳西子服饰有限公司</text>
        </view>
        <view class="side-row">
          <view class="icon"></view>
          <text class="side-text">输入登录账号</text>
        </view>
        <view class="side-row">
          <view class="icon"></view>
          <text class="side-text">输入密码</text>
        </view>
        <button class="side-btn">登录</button>
      </view>
    </view>

    <!-- 右侧主面板（移动视图登录） -->
    <view class="panel">
      <view class="header-bg"></view>
      <view class="panel-inner">
        <view class="logo-box">
          <view class="logo-placeholder"></view>
          <text class="app-name">点特云</text>
          <text class="version">V3.9.5</text>
        </view>

        <view class="switch-row">
          <view class="switch-icon"></view>
          <text class="switch-text">切换为商家</text>
        </view>

        <view class="form">
          <view class="input-row">
            <view class="input-icon"></view>
            <input class="input" placeholder="请输入手机号" disabled />
          </view>

          <view class="input-row code-row">
            <view class="input-icon"></view>
            <input class="input" placeholder="请输入验证码" disabled />
            <button class="get-code">获取验证码</button>
          </view>

          <button class="login-btn">登录</button>
        </view>

        <view class="tips">
          <text class="tips-title">重要提示</text>
          <ol class="tips-list">
            <li>手机号是你进货时留给供应商的手机号</li>
            <li>请确认商家是否为你建立客户当时填写手机号，填写了你的手机号的所有商家的销售单据你都能在这里查看</li>
          </ol>
        </view>

        <view class="footer-links">
          <text>登录/注册表示您同意</text>
          <text class="link">《用户协议》</text>
          <text>和</text>
          <text class="link">《隐私政策》</text>
        </view>
      </view>

      <view class="home-indicator"></view>
    </view>
  </view>
</template>

<style scoped>
.wrap {
  min-height: 100vh;
  background: #bfe9ff; /* 页面背景蓝 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

.side-panel {
  width: 460rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
  padding: 28rpx;
  margin-right: 40rpx;
}
.side-inner {
  display: flex;
  flex-direction: column;
}
.side-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 18rpx;
}
.side-row {
  display: flex;
  align-items: center;
  background: #f7fbff;
  padding: 18rpx;
  border-radius: 12rpx;
  margin-bottom: 12rpx;
}
.avatar, .icon { width: 56rpx; height: 56rpx; background: #e7eef8; border-radius: 6rpx; margin-right: 12rpx; }
.side-text { color:#2b2b2b; font-size:26rpx }
.side-btn { margin-top: 12rpx; background: linear-gradient(180deg,#eaf6ff,#d7efff); color:#3b93ff; border-radius: 20rpx; padding: 18rpx; border:none }

.panel {
  width: 520rpx;
  border-radius: 20rpx;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 12rpx 40rpx rgba(0,0,0,0.08);
  position: relative;
}
.header-bg {
  height: 220rpx;
  background: linear-gradient(180deg,#e8f6ff,#fff);
}
.panel-inner { padding: 28rpx 32rpx 40rpx; }
.logo-box { display:flex; flex-direction:column; align-items:center; margin-top:-70rpx }
.logo-placeholder { width:120rpx; height:120rpx; background:#f4f6fb; border-radius:12rpx; border:1rpx solid #e6eef9 }
.app-name { font-size:36rpx; font-weight:700; margin-top:16rpx }
.version { font-size:20rpx; color:#9aa6b3; margin-top:6rpx }

.switch-row { display:flex; align-items:center; margin-top:18rpx }
.switch-icon { width:28rpx; height:28rpx; background:#f0f5fb; border-radius:50%; margin-right:12rpx }
.switch-text { color:#444 }

.form { margin-top:20rpx }
.input-row { display:flex; align-items:center; background:#fbfdff; border-radius:12rpx; padding:18rpx; margin-bottom:14rpx }
.input-icon { width:34rpx; height:34rpx; background:#e9f3ff; border-radius:6rpx; margin-right:12rpx }
.input { flex:1; height:40rpx; border:none; outline:none; font-size:26rpx; color:#999; background:transparent }
.code-row { position:relative }
.get-code { position:absolute; right:18rpx; top:12rpx; background:transparent; color:#1e90ff; border:none; font-size:24rpx }

.login-btn { width:100%; height:84rpx; border-radius:42rpx; background:linear-gradient(180deg,#f4fbff,#eaf6ff); border:2rpx dashed #d7ecff; color:#3b93ff; font-size:28rpx; margin-top:8rpx }

.tips { margin-top:18rpx }
.tips-title { color:#e53935; font-weight:700; margin-bottom:8rpx }
.tips-list { margin:0; padding-left:20rpx; color:#666; font-size:24rpx }
.tips-list li { margin-bottom:8rpx }

.footer-links { margin-top:12rpx; color:#9aa6b3; font-size:22rpx; display:flex; align-items:center; flex-wrap:wrap }
.footer-links .link { color:#1e90ff; margin:0 6rpx }

.home-indicator { height:8rpx; background:#000; opacity:0.08; border-radius:8rpx; margin:16rpx auto 0; width:120rpx }

@media (max-width: 720px) {
  .wrap { padding:20rpx }
  .side-panel { display:none }
  .panel { width: 88vw }
}
</style>