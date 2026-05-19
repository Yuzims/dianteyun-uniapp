<template>
  <view class="page">
    <!-- header -->
    <view class="card header">
      <view class="shop">
        <image src="/static/shop-icon.svg" mode="aspectFill" class="shop-logo" />
        <view class="shop-info">
          <text class="shop-name">西子服装</text>
          <text class="shop-loc">深圳市南山区时代广场1楼13A</text>
        </view>
        <view class="shop-action">商家主页</view>
      </view>
    </view>

    <!-- customer card -->
    <view class="card customer">
      <view class="row">
        <view class="label">客户名称</view>
        <view class="value">张三</view>
        <view class="label">开单电话</view>
        <view class="value">18526589985</view>
      </view>
      <view class="row">
        <view class="label">交易状态</view>
        <view class="badge success">交易完毕</view>
        <view class="spacer" />
        <button class="btn-outline">交货情况</button>
      </view>
    </view>

    <!-- summary -->
    <view class="card summary">
      <view class="totals">
        <text class="qty">数量: <text class="highlight">2081</text></text>
        <text class="price">金额: <text class="highlight red">¥ 116578.00</text></text>
      </view>
    </view>

    <!-- product list -->
    <view class="product-list">
      <view class="product-card" v-for="n in 2" :key="n">
        <view class="prod-top">
          <image src="/static/image-outline.svg" class="prod-thumb" mode="aspectFill" />
          <view class="prod-info">
            <text class="prod-name">2659# 马甲</text>
            <text class="prod-count">1040 X ¥56.00 = ¥58240.00</text>
            <view class="sizes">
              <view class="size-row">
                <text class="size-title">颜色</text>
                <text class="size-item">蓝色</text>
                <text class="size-item">灰色</text>
              </view>
              <view class="size-row small">
                <text>尺寸 S M L XXL</text>
                <text>价格 ¥56.00</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="product-card single">
        <view class="prod-top">
          <image src="/static/image-outline.svg" class="prod-thumb" mode="aspectFill" />
          <view class="prod-info">
            <text class="prod-name">8567 金龙鱼花生油</text>
            <text class="prod-count">1 X ¥98.00 = ¥98.00</text>
          </view>
        </view>
      </view>
    </view>

    <!-- bottom info -->
    <view class="card info">
      <view class="row-block">
        <text>销售员：王小明</text>
        <text>开单日期：2025-5-24</text>
        <text>销售单号：202122225101</text>
      </view>
      <view class="row-block addr">
        <text>档口地址：深圳市南山区沙河万佳一楼88A</text>
        <text>档口电话：1356584122656</text>
      </view>
    </view>

    <!-- qrcodes -->
    <view class="card qrcodes">
      <view class="qitem">
        <image src="/static/code-icon.svg" class="qr" />
        <text class="qr-label">微信加好友</text>
      </view>
      <view class="qitem">
        <image src="/static/code-icon.svg" class="qr" />
        <text class="qr-label">微信支付</text>
      </view>
      <view class="qitem">
        <image src="/static/code-icon.svg" class="qr" />
        <text class="qr-label">支付宝支付</text>
      </view>
    </view>

    <!-- follow banner -->
    <view class="follow">
      <text>关注“点餐云”公众号，第一时间接收开单、配货、欠款、送货等通知</text>
      <button class="follow-btn">立即关注</button>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f4f7;
  padding: 24rpx;
  box-sizing: border-box;
}
.card {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 18rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.03);
}
.header .shop {
  display:flex;
  align-items:center;
}
.shop-logo{ width: 88rpx; height:88rpx; border-radius:12rpx; margin-right:18rpx; background:#eee }
.shop-info{ flex:1 }
.shop-name{ display:block; font-size:32rpx; font-weight:700 }
.shop-loc{ display:block; font-size:24rpx; color:#999; margin-top:8rpx }
.shop-action{ background:#ffdca8; padding:8rpx 18rpx; border-radius:20rpx; color:#b35a00 }

.customer .row{ display:flex; align-items:center; margin-bottom:12rpx }
.customer .label{ width:120rpx; color:#666 }
.customer .value{ flex:1; font-weight:600 }
.badge.success{ background:#e6f7ea; color:#2e8b3a; padding:8rpx 12rpx; border-radius:8rpx }
.btn-outline{ border:1rpx solid #d9d9d9; padding:6rpx 12rpx; border-radius:6rpx }
.spacer{ flex:1 }

.summary .totals{ display:flex; justify-content:space-between; align-items:center }
.summary .qty{ font-size:26rpx; color:#666 }
.summary .price{ font-size:28rpx }
.highlight{ font-weight:700 }
.red{ color:#d9534f }

.product-list .product-card{ background:#fff; border-radius:10rpx; margin-bottom:14rpx; padding:12rpx }
.prod-top{ display:flex }
.prod-thumb{ width:140rpx; height:140rpx; border-radius:8rpx; background:#f3f3f3 }
.prod-info{ flex:1; padding-left:16rpx }
.prod-name{ display:block; font-size:28rpx; font-weight:700; margin-bottom:8rpx }
.prod-count{ color:#d9534f; margin-bottom:12rpx }
.sizes .size-row{ display:flex; align-items:center; margin-bottom:6rpx }
.size-title{ width:80rpx; color:#888 }
.size-item{ margin-right:12rpx }
.size-row.small{ color:#999; font-size:22rpx }

.info .row-block{ margin-bottom:10rpx; color:#666 }
.info .addr{ font-size:24rpx }

.qrcodes{ display:flex; justify-content:space-between; align-items:center }
.qitem{ display:flex; flex-direction:column; align-items:center }
.qr{ width:160rpx; height:160rpx; background:#eee; border-radius:8rpx }
.qr-label{ margin-top:12rpx; color:#666 }

.follow{ position:fixed; left:24rpx; right:24rpx; bottom:24rpx; background:linear-gradient(90deg,#0d6efd,#6610f2); color:#fff; padding:16rpx; border-radius:40rpx; display:flex; align-items:center; justify-content:space-between }
.follow-btn{ background:#fff; color:#333; padding:8rpx 18rpx; border-radius:20rpx }
</style>