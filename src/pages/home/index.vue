<template>
  <view class="page">
    <!-- 顶部 banner 和商家信息 -->
    <view class="banner">
      <swiper class="banner-swiper" indicator-dots autoplay interval="3000" duration="400">
        <swiper-item v-for="(b, i) in bannerImgs" :key="i">
          <img :src="b" class="banner-img" />
        </swiper-item>
      </swiper>

      <view class="merchant">
        <view class="avatar" />
        <view class="merchant-info">
          <text class="name">西子服装</text>
          <text class="addr"><img src="@/static/location-outline.svg" alt="" class="location-icon">深圳市南山区时代广场1楼13A</text>
        </view>
        <view class="actions">
          <img src="@/static/logo-wechat.svg" alt="" class="icon">
          <view class="line"></view>
          <img src="@/static/call-outline.svg" alt="" class="icon">
        </view>
      </view>
    </view>

    <!-- 类目网格 -->
    <view class="card categories">
      <view class="grid">
        <view class="grid-item" v-for="(c, idx) in categories" :key="idx">
          <view class="thumb">
            <img :src="c.img" class="thumb-img" />
          </view>
          <text class="cat-text">{{ c.title }}</text>
        </view>
      </view>
    </view>

    <!-- 新品推荐 -->
    <view class="section card categories">
      <text class="section-title">新品推荐</text>

      <view class="grid">
        <view class="grid-item" v-for="(c, idx) in newList" :key="idx">
          <view class="thumb">
            <img :src="c.img" class="thumb-img" />
          </view>
          <text class="cat-text">{{ c.title }}</text>
        </view>
      </view>
    </view>

    <!-- 爆款推荐 -->
    <view class="section card categories">
       <text class="section-title">爆款推荐</text>
       <view class="grid">
        <view class="grid-item" v-for="(c, idx) in hotList" :key="idx">
          <view class="thumb">
            <img :src="c.img" class="thumb-img" />
          </view>
          <text class="cat-text">{{ c.title }}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
        bannerImgs: [
          '/static/image-outline.svg',
          '/static/image-outline.svg',
          '/static/image-outline.svg'
        ],
        categories: Array.from({ length: 15 }).map((_, i) => ({ title: '上衣', img: '/static/image-outline.svg' })),
        newList: [
          { title: '金龙鱼花生油', img: '/static/image-outline.svg' },
          { title: '凤梨酥', img: '/static/image-outline.svg' },
          { title: '火龙果', img: '/static/image-outline.svg' },
          { title: '高粱糕', img: '/static/image-outline.svg' },
          { title: '无籽葡萄', img: '/static/image-outline.svg' }
        ],
        hotList: [
          { title: '金龙鱼花生油', img: '/static/image-outline.svg' },
          { title: '凤梨酥', img: '/static/image-outline.svg' },
          { title: '火龙果', img: '/static/image-outline.svg' },
          { title: '高粱糕', img: '/static/image-outline.svg' }
        ]
    }
  }
}
</script>

<style scoped>
.page { background: #f5f7fb; min-height: 100vh; }
.banner { position: relative; padding-bottom: 0; }
.banner-swiper { width: 100%; height: 420rpx; }
.banner-img { width:100%; height:100%; object-fit: cover; display:block }
.merchant { position: absolute; left: 20rpx; right: 20rpx; bottom: 24rpx; display: flex; align-items: center; background: rgba(255,255,255,0.06); padding: 16rpx; border-radius: 12rpx }
.avatar { width: 120rpx; height: 120rpx; border-radius: 16rpx; background: #fff1; margin-right: 20rpx; }
.merchant-info { flex: 1;color: #902a2a; }
.name { font-size: 34rpx; font-weight: 700; display: block; }
.addr {  font-size: 24rpx; margin-top: 8rpx; display: flex; }
.location-icon { width: 24rpx; height: 24rpx; margin-right: 6rpx; }
.actions { display:flex; gap:10rpx;border-radius: 20rpx;align-items: center; background-color: white;padding: 12rpx;}
.line{width:1rpx;height:50rpx;background:rgba(0,0,0,0.3)}
.icon { width: 50rpx; height: 50rpx; }

.card { background: #fff; margin: 18rpx; border-radius: 12rpx; padding: 18rpx; }
.categories .grid { display:flex; flex-wrap:wrap; }
.grid-item { width: 20%; padding: 12rpx 6rpx; box-sizing:border-box; text-align:center; }
.grid-item .thumb { width: 100%; aspect-ratio: 1/1; margin: 0 auto 10rpx; background: #f0f2f5; border-radius: 10rpx; overflow: hidden; }
.thumb-img { width: 100%; height: 100%; object-fit: cover; display:block }
.cat-text { font-size: 24rpx; color:#333; }

.section { padding: 18rpx; }
.section-title { font-size: 28rpx; color: #333; font-weight:600; margin-bottom: 12rpx; display:block; }
.h-list { display:flex; gap: 18rpx; padding-bottom: 12rpx; }
.h-item { width: 220rpx; flex-shrink:0; }
.h-item .thumb { width:100%; height:160rpx; background:#f0f2f5; border-radius:10rpx; overflow:hidden }
.h-item .thumb .thumb-img { width:100%; height:100%; object-fit:cover }
.it-text { margin-top:8rpx; color:#333; display:block; font-size:24rpx; }
</style>