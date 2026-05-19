<template>
  <view class="page">
    <view class="media">
      <image :src="mainImage" mode="widthFix" class="main-img" />
      <scroll-view class="thumbs" scroll-x="true" scroll-with-animation>
        <view class="thumb" v-for="(img, idx) in images" :key="idx" @click="setMain(idx)">
          <image :src="img" mode="aspectFill" :class="['thumb-img', selectedThumb===idx? 'active':'']" />
        </view>
      </scroll-view>
    </view>

    <view class="info">
      <view class="row id-price">
        <text class="sku">{{product.sku}}</text>
        <text class="price">¥ <text class="price-num">{{product.price}}</text> / 件</text>
      </view>

      <text class="title">{{product.title}}</text>

      <view class="option-group">
        <text class="label">颜色</text>
        <view class="options">
          <view v-for="(c, i) in product.colors" :key="c" class="opt" :class="{'selected': selectedColor===i}" @click="selectColor(i)">
            <text>{{c}}</text>
          </view>
        </view>
      </view>

      <view class="option-group">
        <text class="label">尺码</text>
        <view class="options sizes">
          <view v-for="(s, i) in product.sizes" :key="s" class="size" :class="{'selected': selectedSize===i}" @click="selectSize(i)">
            <text>{{s}}</text>
          </view>
        </view>
      </view>

      <view class="option-group qty-row">
        <text class="label">数量</text>
        <view class="qty">
          <button class="qty-btn" @click="decQty">-</button>
          <input class="qty-input" type="number" v-model.number="qty" />
          <button class="qty-btn" @click="incQty">+</button>
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <view class="left-space"></view>
      <button class="add-cart" @click="addToCart">加入购物车</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      product: {
        sku: '2506#',
        price: '128.00',
        title: '夏季新款圆领纯棉短袖t恤',
        colors: ['红色','灰色','雾霾蓝','白色'],
        sizes: ['S','M','L','XL','XXL','3XL']
      },
      images: [
        '/static/product1.jpg',
        '/static/product2.jpg',
        '/static/product3.jpg',
        '/static/product4.jpg'
      ],
      selectedThumb: 0,
      selectedColor: 0,
      selectedSize: 1,
      qty: 1
    }
  },
  computed: {
    mainImage() {
      return this.images[this.selectedThumb]
    }
  },
  methods: {
    setMain(i) { this.selectedThumb = i },
    selectColor(i) { this.selectedColor = i },
    selectSize(i) { this.selectedSize = i },
    incQty() { this.qty = (this.qty||1) + 1 },
    decQty() { if((this.qty||1) > 1) this.qty -= 1 },
    addToCart() {
      uni.showToast({ title: '已加入购物车', icon: 'success' })
      console.log('add to cart', { sku: this.product.sku, color: this.product.colors[this.selectedColor], size: this.product.sizes[this.selectedSize], qty: this.qty })
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
  position: relative;
  padding-bottom: 140rpx;
}
.media {
  background: #fff;
}
.main-img {
  width: 100%;
  height: 560rpx;
  background: #eee;
}
.thumbs {
  display: flex;
  padding: 20rpx 24rpx;
  background: #fff;
}
.thumb { display:inline-block; margin-right: 16rpx }
.thumb-img { width: 140rpx; height: 140rpx; border-radius: 6rpx; border: 1rpx solid #eee }
.thumb-img.active { border: 2rpx solid #ff4d4f }

.info { padding: 24rpx; background: #fff }
.id-price { display:flex; justify-content:space-between; align-items:center; margin-bottom: 10rpx }
.sku { color:#999 }
.price { color:#ff4d4f; font-size: 32rpx }
.price-num { font-weight:700 }
.title { font-size: 30rpx; margin: 12rpx 0; color:#222 }

.option-group { margin-top: 18rpx }
.label { color:#666; font-size:26rpx }
.options { display:flex; flex-wrap:wrap; margin-top:12rpx }
.opt { padding:14rpx 22rpx; border:1rpx solid #ddd; border-radius:10rpx; margin-right:12rpx; margin-bottom:12rpx }
.opt.selected { border-color:#ff4d4f; color:#ff4d4f }

.sizes .size { padding:12rpx 22rpx; border:1rpx solid #ddd; border-radius:8rpx; margin-right:10rpx }
.size.selected { border-color:#ff4d4f; color:#ff4d4f }

.qty-row { display:flex; align-items:center; justify-content:space-between }
.qty { display:flex; align-items:center }
.qty-btn { width: 80rpx; height: 64rpx; border:1rpx solid #ddd; background:#fff; font-size:32rpx }
.qty-input { width: 160rpx; height:64rpx; text-align:center; border-top:1rpx solid #ddd; border-bottom:1rpx solid #ddd }

.bottom-bar { position: fixed; left:0; right:0; bottom:0; height:120rpx; display:flex; align-items:center; padding:20rpx; background:#fff; box-shadow:0 -4rpx 12rpx rgba(0,0,0,0.04) }
.add-cart { flex:1; height:80rpx; background:#007bff; color:#fff; border-radius:8rpx; font-size:30rpx }
.left-space { width:20rpx }
</style>