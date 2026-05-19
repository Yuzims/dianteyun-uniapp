<template>
  <view class="page">
    <!-- 顶部搜索与图标 -->
    <view class="topbar">
      <img src="@/static/home-outline.svg" alt="" class="top-icon">
      <view class="search">
        <input type="text" class="search-input">
      </view>
        <img src="@/static/share-outline.svg" alt="" class="top-icon">
    </view>
    <!-- 大图 banner -->
    <view class="banner" />


    <!-- 筛选/图标行 -->
    <view class="filter-row">
      <view class="tab" v-for="(t, i) in tabs" :key="t" :class="{active: i===activeTab}">{{t}}</view>
      <img src="@/static/grid-outline.svg" alt="" class="filter-icon">
      <img src="@/static/funnel-outline.svg" alt="" class="filter-icon">
    </view>

    <!-- 商品网格 -->
    <scroll-view scroll-y class="product-list">
      <view class="grid">
        <view class="card" v-for="(p, idx) in products" :key="idx">
          <view class="thumb">
            <image :src="p.img" mode="aspectFill" class="thumb-img" />
            <view class="badge">单件装</view>
          </view>
          <view class="card-body">
            <text class="title">{{p.title}}</text>
            <view class="meta">
              <text class="price">¥ {{p.price}}</text>
              <text class="cart">🛒</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['全部','新品','爆款','买过'],
      activeTab: 0,
      products: Array.from({length:8}).map((_,i)=>({
        title: '2506# 夏季新款圆领纯棉短袖t恤',
        price: (16.8).toFixed(1),
        img: 'https://via.placeholder.com/400x400.png?text=T-shirt'
      }))
    }
  }
}
</script>

<style scoped>
.page{background:#fff;min-height:100vh}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:24rpx;position:absolute;top:0;left:0;z-index:10}
.search{flex:1;display:flex;align-items:center;border-radius:40rpx;padding:12rpx 20rpx;box-shadow:0 2rpx 6rpx rgba(172, 166, 166, 0.03)}
.search-input{flex:1;border:none;outline:none;font-size:28rpx;background-color: rgba(247, 242, 242, 0.7);border-radius: 20rpx;}
.search-placeholder{color:#999}
.top-icon{width: 40rpx;height:40rpx;filter: invert(1) brightness(2);font-size:28rpx;background: rgba(0,0,0,0.7);border-radius:100%;margin: 0 20rpx; }
.banner{height:300rpx;background-image:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60');background-size:cover;background-position:center;margin:10rpx 24rpx;border-radius:12rpx}
.tabs{display:flex;padding:16rpx 24rpx;background:transparent}
.tab{padding:10rpx 22rpx;margin-right:12rpx;border-bottom:3rpx solid transparent;color:#666}
.tab.active{font-weight:900;color:black;background-color:  rgba(184, 177, 177, 0.2);font-weight:600}
.filter-row{display:flex;justify-content:space-between;align-items:center;padding:8rpx 24rpx;color:#666}
.filter-icon{width:32rpx;height:32rpx;}
.product-list{padding:12rpx 12rpx 120rpx}
.grid{display:flex;flex-wrap:wrap;gap:12rpx}
.card{width:calc((100% - 36rpx)/2);background:#fff;border-radius:8rpx;overflow:hidden;box-shadow:0 2rpx 6rpx rgba(0,0,0,0.03)}
.thumb{position:relative;height:320rpx;background:#f3f3f3}
.thumb-img{width:100%;height:100%}
.badge{position:absolute;right:8rpx;top:8rpx;background:#ffcc00;color:#fff;padding:6rpx 10rpx;border-radius:8rpx;font-size:22rpx}
.card-body{padding:18rpx}
.title{display:block;height:56rpx;overflow:hidden;color:#333;font-size:26rpx;line-height:28rpx}
.meta{display:flex;justify-content:space-between;align-items:center;margin-top:12rpx}
.price{color:#ff3b30;font-weight:700}
.cart{font-size:28rpx}
</style>