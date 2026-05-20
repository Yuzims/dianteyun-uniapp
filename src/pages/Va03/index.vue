<template>
  <view class="page">
    <!-- top carousel -->
    <view v-if="carouselImgs && carouselImgs.length" class="carousel-wrap card">
      <swiper indicator-dots="true" autoplay="true" interval="3000" circular class="top-swiper">
        <swiper-item v-for="(src, i) in carouselImgs" :key="'sw-'+i">
          <image :src="src" class="sw-image" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>
    <!-- header -->
    <view class="card header">
      <view class="shop">
        <image :src="result && result.logourl ? result.logourl : (result && result.picurl1 ? result.picurl1 : '/static/shop-icon.svg')" mode="aspectFill" class="shop-logo" />
        <view class="shop-info">
          <text class="shop-name">{{ result ? result.mtext : '商家名称' }}</text>
          <view style="display: flex;align-items: center;margin-top: 8rpx;">
            <img src="@/static/location-outline.svg" alt="" class="location-icon">
            <text class="shop-loc">{{ result ? result.stras : '' }}</text>
          </view>
          
        </view>
        <view class="shop-action">商家主页</view>
      </view>
    </view>

    <!-- customer card -->
    <view class="card customer">
      <view v-if="result && result.header_list">
        <!-- 将 header_list 按行渲染，每个 header_list 为一行，行内多个 item_list 并排 -->
        <view v-for="(h, idx) in result.header_list" :key="idx" class="header-row">
          <!-- 如果是日期+时间行，合并显示 -->
          <view v-if="isDateTimeRow(h)" class="pairs">
            <view class="pair">
              <text class="label">{{ h.item_list[0].label_text }}</text>
              <text class="value">{{ formatDateTimeValue(h) }}</text>
            </view>
          </view>
          <view v-else class="pairs">
            <view v-for="(it, i2) in h.item_list" :key="i2" class="pair">
              <text class="label" v-if="it.label_text">{{ it.label_text }}</text>
              <text class="value">{{ it.value_text }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="row">
        <view class="spacer" />
        <button class="btn-outline">交货情况</button>
      </view>
    </view>

    <!-- summary -->
    <view class="card summary">
      <view class="totals">
        <text class="qty">数量: <text class="highlight count">{{ result.goods_count }}</text></text>
        <text class="price">金额: <text class="highlight red">{{ totalAmountText }}</text></text>
      </view>
    </view>

    <!-- product list -->
    <view class="product-list">
      <view class="product-card" v-for="(g, gi) in (result ? result.goods_list : [])" :key="gi">
        <view class="prod-top">
          <image :src="g.pic_url" class="prod-thumb" mode="aspectFill" />
          <view class="prod-info">
            <text class="prod-name">{{ g.modnr }} {{ g.stext }}</text>
            <text class="prod-count"><text style="color: black;font-weight: 500;">{{ productQty(g) }} X </text>  RMB {{ g.colors && g.colors.color_list && g.colors.color_list[0] ? g.colors.color_list[0].price : '0.00' }} <text style="color: black;font-weight: 500;">/ {{ g.mseht || '' }} =</text> {{ productAmountText(g) }}</text>
          </view>

        </view>
        <view class="sizes" v-if="g.size_list && g.colors && g.colors.color_list">
              <view class="size-table">
                <view class="size-tr size-head">
                  <text class="size-th size-color-col">颜色</text>
                  <text class="size-th" v-for="(s, si) in g.size_list" :key="si">{{ s.sztxt }}</text>
                  <text class="size-th size-price-col">价格</text>
                  <text class="size-th size-amount-col">金额</text>
                </view>
                <view class="size-tr" v-for="(c, ci) in g.colors.color_list" :key="ci">
                  <text class="size-td size-color-col">{{ c.crtxt }}</text>
                  <text class="size-td" v-for="(sz, szi) in (c.sizes ? c.sizes.size_list : [])" :key="szi">{{ sz.menge || 0 }}</text>
                  <text class="size-td size-price-col">RMB {{ c.price }}</text>
                  <text class="size-td size-amount-col">RMB {{ colorAmount(g, c) }}</text>
                </view>
              </view>
            </view>
      </view>
    </view>

    <!-- recommend list -->
    <view class="card recommend-card">
      <view class="recommend-tabs">
        <view class="recommend-tab" :class="{ active: recommendTab === 'latest' }" @click="recommendTab = 'latest'">
          新品推荐
        </view>
        <view class="recommend-tab" :class="{ active: recommendTab === 'best' }" @click="recommendTab = 'best'">
          爆款推荐
        </view>
      </view>

      <view class="recommend-list" v-if="recommendTab === 'latest'">
        <view class="recommend-item" v-for="(item, index) in (result && result.latest_list ? result.latest_list : [])" :key="'latest-' + index">
          <image :src="item.picurl" mode="aspectFill" class="recommend-image" />
          <text class="recommend-name">{{ item.modnr }} {{ item.stext }}</text>
        </view>
      </view>

      <view class="recommend-list" v-else>
        <view class="recommend-item" v-for="(item, index) in (result && result.best_list ? result.best_list : [])" :key="'best-' + index">
          <image :src="item.picurl" mode="aspectFill" class="recommend-image" />
          <text class="recommend-name">{{ item.modnr }} {{ item.stext }}</text>
        </view>
      </view>
    </view>

    <!-- quick actions -->
    <view class="card action-grid-card">
      <view class="action-grid">
        <view class="action-cell">下载图片</view>
        <view class="action-cell">本店所有商品</view>
        <view class="action-cell">所有单据</view>
        <view class="action-cell">配货情况</view>
        <view class="action-cell">微信消息提醒</view>
        <view class="action-cell">转采购单</view>
      </view>
    </view>

    <!-- footer info block 0 -->
    <view class="card info info-block">
      <view v-for="(row, rowIndex) in (result && result.footer_list0 ? result.footer_list0 : [])" :key="'footer0-' + rowIndex" class="footer-row">
        <view v-for="(item, itemIndex) in (row.item_list || [])" :key="'footer0-' + rowIndex + '-' + itemIndex" class="footer-item">
          <text class="footer-label">{{ item.label_text }}</text>
          <text class="footer-value">{{ item.value_text }}</text>
        </view>
      </view>
    </view>

    <!-- footer info block 1 -->
    <view class="card info info-block">
      <view v-for="(row, rowIndex) in (result && result.footer_list1 ? result.footer_list1 : [])" :key="'footer1-' + rowIndex" class="footer-line single-line">
        <text class="footer-line-text">{{ row.item_list && row.item_list[0] ? row.item_list[0].label_text : '' }}</text>
      </view>
    </view>

    <!-- qrcodes (from footer_list2 when available) -->
    <view class="card qrcodes qrcode-card">
      <view v-for="(item, idx) in (result && result.footer_list2 && result.footer_list2[0] && result.footer_list2[0].item_list ? result.footer_list2[0].item_list : [])" :key="'f2-'+idx" class="qitem">
        <image :src="item.label_text" class="qr" mode="aspectFill" />
        <text class="qr-label">{{ item.tip_text  }}</text>
      </view>
    </view>

    <!-- follow banner -->
    <view class="follow" v-if="showFollow">
      <button class="follow-close" type="button" @click="closeFollow">×</button>
      <text>关注“点餐云”公众号，第一时间接收开单、配货、欠款、送货等通知</text>
      <button class="follow-btn">立即关注</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      result: null,
      mandt: '',
      vbeln: '',
      recommendTab: 'latest',
      showFollow: true
    }
  },
  onLoad(e) {
    // 从路由参数或页面参数读取商家/订单号
    this.mandt = e && e.mandt ? e.mandt : '607340'
    this.vbeln = e && e.vbeln ? e.vbeln : '10000063'
    this.showFollow = true
    this.loadData()
  },
  onShow() {
    this.showFollow = true
  },
  onShareAppMessage() {
    return {
      title: this.result && this.result.mtext ? this.result.mtext + ' 订单详情' : '订单详情',
      path: this.getSharePath()
    }
  },
  onShareTimeline() {
    return {
      title: this.result && this.result.mtext ? this.result.mtext + ' 订单详情' : '订单详情',
      query: 'mandt=' + encodeURIComponent(this.mandt) + '&vbeln=' + encodeURIComponent(this.vbeln)
    }
  },
  computed: {
    carouselImgs() {
      const imgs = []
      if (this.result) {
        if (this.result.picurl1) imgs.push(this.result.picurl1)
        if (this.result.picurl2) imgs.push(this.result.picurl2)
        if (this.result.picurl3) imgs.push(this.result.picurl3)
      }
      return imgs
    },
    totalQty() {
      let t = 0
      if (!this.result || !this.result.goods_list) return 0
      this.result.goods_list.forEach(g => {
        if (g.colors && g.colors.color_list) {
          g.colors.color_list.forEach(c => {
            if (c.sizes && c.sizes.size_list) {
              c.sizes.size_list.forEach(sz => { t += parseInt(sz.menge || 0) || 0 })
            }
          })
        }
      })
      return t
    },
    totalAmountText() {
      let total = 0
      if (!this.result || !this.result.goods_list) return 'RMB0.00'
      this.result.goods_list.forEach(g => {
        if (g.colors && g.colors.color_list) {
          g.colors.color_list.forEach(c => {
            const price = parseFloat(c.price || 0) || 0
            if (c.sizes && c.sizes.size_list) {
              c.sizes.size_list.forEach(sz => { total += (parseInt(sz.menge || 0) || 0) * price })
            }
          })
        }
      })
      return 'RMB ' + total.toFixed(2)
    }
  },
  methods: {
    getSharePath() {
      return '/pages/Va03/index?mandt=' + encodeURIComponent(this.mandt) + '&vbeln=' + encodeURIComponent(this.vbeln)
    },
    loadData() {
      const url = 'https://wxapp.dteoc.cn/api/dtygetsdo'
      uni.request({
        url,
        method: 'POST',
        header: { 'content-type': 'application/json' },
        data: { mandt: this.mandt, vbeln: this.vbeln },
        success: (res) => {
          if (res && res.data && res.data.result) {
            this.result = res.data.result
          } else if (res && res.data) {
            this.result = res.data
          }
        },
        fail: (err) => {
          console.error('请求失败', err)
        },
        complete: () => {
          this.loading = false
        }
      })
    },
    // 辅助：安全读取嵌套字段
    safe(v, def = '') { return v === undefined || v === null ? def : v },
    isDateTimeRow(h) {
      if (!h || !h.item_list || h.item_list.length < 2) return false
      const a = h.item_list[0].label_text || ''
      const b = h.item_list[1].label_text || ''
      return a.indexOf('日期') !== -1 && b.indexOf('时间') !== -1
    },
    formatDateTimeValue(h) {
      if (!h || !h.item_list) return ''
      const date = (h.item_list[0].value_text || '').trim()
      const time = (h.item_list[1].value_text || '').trim()
      if (!date) return time || ''
      // 如果时间为空或提示字段无值，则只显示日期
      if (!time || time.indexOf('字段') === 0) return date
      return date + ' ' + time
    },
    productQty(g) {
      if (!g || !g.colors || !g.colors.color_list) return 0
      let sum = 0
      g.colors.color_list.forEach(c => {
        if (c && c.sizes && c.sizes.size_list) {
          c.sizes.size_list.forEach(sz => { sum += parseInt(sz.menge || 0) || 0 })
        }
      })
      return sum
    },
    colorAmount(g, c) {
      if (!c) return '0.00'
      let sum = 0
      const price = parseFloat(c.price || 0) || 0
      if (c.sizes && c.sizes.size_list) {
        c.sizes.size_list.forEach(sz => { sum += (parseInt(sz.menge || 0) || 0) })
      }
      return (sum * price).toFixed(2)
    },
    productAmountText(g) {
      if (!g || !g.colors) return '0.00'
      let sum = 0
      g.colors.color_list.forEach(c => {
        const price = parseFloat(c.price || 0) || 0
        if (c.sizes && c.sizes.size_list) {
          c.sizes.size_list.forEach(sz => { sum += (parseInt(sz.menge || 0) || 0) * price })
        }
      })
      return 'RMB ' + sum.toFixed(2)
    }
    ,
    getFooterImageSrc(item, idx) {
      if (!item) return '/static/code-icon.svg'
      const tryUrl = (item.label_text || '').trim() || (item.value_text || '').trim()
      const isImage = (u) => /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(u)
      if (isImage(tryUrl)) return tryUrl
      // fallback to known picurl fields by index
      if (this.result) {
        if (idx === 0 && this.result.picurl2) return this.result.picurl2
        if (idx === 1 && this.result.picurl3) return this.result.picurl3
        if (this.result.picurl1) return this.result.picurl1
      }
      return '/static/code-icon.svg'
    }
    ,
    closeFollow() {
      this.showFollow = false
    }
  }
}
</script>
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
/* carousel */
.carousel-wrap{ padding: 0; overflow: hidden; }
.top-swiper{ width: 100%; height: 360rpx; }
.sw-image{ width: 100%; height: 360rpx; display: block }
.header .shop {
  display:flex;
  align-items:center;
}
.shop-logo{ width: 88rpx; height:88rpx; border-radius:12rpx; margin-right:18rpx; background:#eee }
.shop-info{ flex:1 }
.shop-name{ display:block; font-size:32rpx; font-weight:700 }
.location-icon{ width:20rpx; height:20rpx; margin-right:6rp;padding-top: 10rpx;margin-right: 5rpx; }
.shop-loc{ display:block; font-size:24rpx;  margin-top:8rpx }
.shop-action{ background:#ffdca8; padding:8rpx 18rpx; border-radius:30rpx; color:#b35a00;font-size: 25rpx; }
.header_list{
  display: flex;
  flex-direction: row;
}
.customer .row{ display:flex; align-items:center; margin-bottom:12rpx;position: relative;}
.customer .label{ width:120rpx; color:#666;font-size: 25rpx;}
.customer .value{ flex:1; font-size: 25rpx;}

/* header list 一行内多对 label/value */
.header-row{ display:flex; width:100%; padding:8rpx 0; box-sizing:border-box; }
.pairs{ display:flex; flex-wrap:wrap; align-items:center }
.pair{ display:flex; align-items:center; margin-right:20rpx }
.pair .label{ width:160rpx; color:#666; font-weight:600 }
.pair .value{ color:#333; margin-left:8rpx }
.badge.success{ background:#e6f7ea; color:#2e8b3a; padding:8rpx 12rpx; border-radius:8rpx }
.btn-outline{border-radius:15rpx;font-size: 20rpx;margin-top: 20rpx;background-color:transparent;color: #4c8dea;border: 0.5rpx solid #4c8dea;position: absolute;bottom: 0;right: 0;}
.spacer{ flex:1 }

.summary .totals{ display:flex; align-items:center; }
.summary .qty{ font-size:26rpx;margin-right: 50rpx;}
.summary .count{color:#4c8dea ;}
.summary .price{ font-size:28rpx }
.highlight{ font-weight:700 }
.red{ color:#d9534f }

.product-list .product-card{ background:#fff; border-radius:10rpx; margin-bottom:14rpx; padding:12rpx }
.prod-top{ display:flex }
.prod-thumb{ width:140rpx; height:140rpx; border-radius:8rpx; background:#f3f3f3 }
.prod-info{ flex:1; padding-left:16rpx;font-size: 28rpx; }
.prod-name{ display:block; font-size:30rpx; font-weight:700; margin:15rpx 0;font-weight: 500;color: black }
.prod-count{ color:#d9534f; margin-bottom:12rpx;font-weight: 600; }
.sizes{ margin-top: 10rpx; overflow-x: auto; }
.size-table{ min-width: 100%; border: 1rpx solid #eee; border-radius: 8rpx; overflow: hidden; }
.size-tr{ display: flex; align-items: stretch; }
.size-head{ background: #f5f6f8; font-weight: 600; }
.size-th, .size-td{ flex: 1; min-width: 78rpx; padding: 14rpx 8rpx; text-align: center; font-size: 22rpx; color: #666; border-right: 1rpx solid #eee; border-bottom: 1rpx solid #eee; box-sizing: border-box; }
.size-th:last-child, .size-td:last-child{ border-right: none; }
.size-color-col{ flex: 0 0 110rpx; min-width: 110rpx; text-align: left; padding-left: 12rpx; }
.size-price-col{ flex: 0 0 120rpx; min-width: 120rpx; }
.size-amount-col{ flex: 0 0 130rpx; min-width: 130rpx; }
.size-tr:last-child .size-td{ border-bottom: none; }

.recommend-card{ padding-bottom: 24rpx; }
.recommend-tabs{ display:flex; align-items:flex-end; gap: 28rpx; margin-bottom: 20rpx; }
.recommend-tab{ font-size: 28rpx; color: #999; font-weight: 600; padding-bottom: 10rpx; position: relative; }
.recommend-tab.active{ color: #222; }
.recommend-tab.active::after{ content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 4rpx; border-radius: 4rpx; background: #4c8dea; }
.recommend-list{ display:flex; gap: 22rpx; overflow-x:auto; padding-bottom: 4rpx; }
.recommend-item{ width: 30%; flex: 0 0 auto; display:flex; flex-direction:column; align-items:center; }
.recommend-image{ width: 150rpx; height: 150rpx; border-radius: 10rpx; background:#f3f3f3; }
.recommend-name{ margin-top: 10rpx; font-size: 22rpx; color:#333; text-align:center; line-height: 1.3; }

.action-grid-card{ padding: 0; overflow: hidden; }
.action-grid{ display:grid; grid-template-columns: repeat(3, 1fr); }
.action-cell{ padding: 25rpx 10rpx; text-align:center; color:#4c8dea; font-size: 25rpx; border-right:1rpx solid #eee; border-bottom:1rpx solid #eee; }
.action-cell:nth-child(3n){ border-right:none; }
.action-cell:nth-last-child(-n+3){ border-bottom:none; }

.info-block{ padding: 24rpx 20rpx; }
.footer-row{ display:flex; flex-wrap:wrap; gap: 24rpx 40rpx; margin-bottom: 16rpx;flex-direction: column;padding: 0 20rpx; }
.footer-item{ display:flex; align-items:center; gap: 8rpx; flex-wrap: wrap; }
.footer-label{ color:#999; font-size: 24rpx; }
.footer-value{ color:#333; font-size: 24rpx; }
.footer-line{ margin-bottom: 20rpx; }
.footer-line:last-child{ margin-bottom: 0; }
.footer-line-text{ font-size: 24rpx; color:#333; line-height: 1.45; }

.qrcode-card{ display:flex; justify-content:flex-start; gap: 36rpx; align-items:center; }
.qrcode-card .qr{ width: 190rpx; height: 190rpx; }

.info .row-block{ margin-bottom:10rpx; color:#666 }
.info .addr{ font-size:24rpx }

.qrcodes{ display:flex; justify-content:space-between; align-items:center }
.qitem{ display:flex; flex-direction:column; align-items:center }
.qr{ width:160rpx; height:160rpx; background:#eee; border-radius:8rpx }
.qr-label{ margin-top:12rpx; color:#666 }

.follow{ font-size: 25rpx; position:fixed; left:0; right:0; bottom:0; color:#fff; padding:16rpx; padding-right: 170rpx;padding-left: 50rpx;background-color: #4c8dea; display:flex; align-items:center }
.follow-close{ position: absolute; left: 8rpx; top: 50%; transform: translateY(-50%); width: 40rpx; height: 40rpx; margin: 0; padding: 0; background: transparent; border: 0; border-radius: 0; box-shadow: none; color: #fff; font-size: 34rpx; line-height: 40rpx; text-align: center; }
.follow-btn{ background:#fff; color:#333; border-radius:30rpx;font-size: 23rpx; position: absolute; right: 16rpx; top: 50%; transform: translateY(-50%); color: #4c8dea;}
</style>