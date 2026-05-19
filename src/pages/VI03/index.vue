<template>
  <view class="page">
    <view class="top">
      <text class="page-title">交货详情</text>
    </view>

    <view class="card merchant-card">
      <view class="left">
        <view class="avatar" />
      </view>
      <view class="right">
        <text class="m-name">西子服装</text>
        <text class="m-addr">深圳市南山区时代广场1楼13A</text>
      </view>
      <view class="action">
        <button class="btn">商家主页</button>
      </view>
    </view>

    <view class="card summary">
      <view class="row">
        <text>客户名称</text>
        <text class="muted">张三</text>
      </view>
      <view class="row">
        <text>销售订单</text>
        <text class="muted">XS2020215555320</text>
      </view>
      <view class="row">
        <text>交货单数</text>
        <text class="muted">2</text>
      </view>
    </view>

    <view class="card deliver-list">
      <view class="deliver-head">
        <text class="dh-title">交货单 800000004</text>
        <text class="status">未出库</text>
      </view>

      <view class="item" v-for="(it, idx) in items" :key="idx">
        <view class="item-top">
          <view class="thumb" />
          <view class="item-info">
            <text class="sku">{{ it.sku }} {{ it.name }}</text>
            <text class="qty">{{ it.total }} 件</text>
          </view>
        </view>

        <view class="size-table">
          <view class="size-row header">
            <text></text>
            <text>S</text>
            <text>M</text>
            <text>L</text>
            <text>XXL</text>
            <text>小计</text>
          </view>
          <view class="size-row" v-for="(row, ridx) in it.sizes" :key="ridx">
            <text class="color">{{ row.color }}</text>
            <text>{{ row.S }}</text>
            <text>{{ row.M }}</text>
            <text>{{ row.L }}</text>
            <text>{{ row.XXL }}</text>
            <text>{{ row.total }}</text>
          </view>
        </view>
      </view>

      <view class="divider" />
      <view class="totals">
        <text>合计: <text class="total-num">2081</text></text>
      </view>
      <view class="row small">
        <text>制单：王小明</text>
        <text>制单日期 2025-5-24</text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          sku: '2659#',
          name: '马甲',
          total: 1040,
          sizes: [
            { color: '蓝色', S: 100, M: 100, L: 120, XXL: 200, total: 520 },
            { color: '灰色', S: 100, M: 100, L: 120, XXL: 200, total: 520 }
          ]
        },
        {
          sku: '8567',
          name: '金龙鱼花生油',
          total: 1,
          sizes: [ { color: '', S: '', M: '', L: '', XXL: '', total: '1 桶' } ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.page { background:#f5f7fb; min-height:100vh; padding-bottom:40rpx; }
.top { padding:24rpx; background: transparent; text-align:center; }
.page-title { font-size:32rpx; color:#333; }
.card { background:#fff; margin: 12rpx 12rpx; border-radius:10rpx; padding:14rpx; }
.merchant-card { display:flex; align-items:center; gap:12rpx; }
.avatar { width:96rpx; height:96rpx; background:#f0f2f5; border-radius:8rpx; }
.m-name { font-size:28rpx; color:#333; font-weight:600; }
.m-addr { font-size:22rpx; color:#888; margin-top:6rpx; }
.action { margin-left:auto; }
.btn { background:#ffb74d; border:none; padding:8rpx 12rpx; border-radius:16rpx; }

.summary .row { display:flex; justify-content:space-between; padding:8rpx 0; border-bottom:1rpx solid #f2f2f2; }
.summary .muted { color:#666; }

.deliver-head { display:flex; justify-content:space-between; align-items:center; padding-bottom:10rpx; }
.dh-title { font-weight:700; color:#333; }
.status { color:#e53935; font-weight:600; }

.item { padding:12rpx 0; border-top:1rpx solid #f2f2f2; }
.item-top { display:flex; gap:12rpx; align-items:center; }
.item .thumb { width:84rpx; height:84rpx; background:#f0f2f5; border-radius:6rpx; }
.item-info .sku { font-weight:600; color:#333; }
.item-info .qty { color:#666; margin-top:6rpx; }

.size-table { margin-top:10rpx; background:#fafafa; border-radius:6rpx; padding:8rpx; }
.size-row { display:flex; align-items:center; gap:8rpx; padding:8rpx 6rpx; }
.size-row.header { font-weight:600; color:#666; background:transparent; }
.size-row text { flex:1; text-align:center; }
.size-row .color { flex:1; text-align:left; padding-left:6rpx; }

.divider { height:1rpx; background:#eee; margin:12rpx 0; }
.totals { padding:8rpx 6rpx; }
.total-num { color:#2b83ff; font-weight:700; }
.small { color:#888; font-size:22rpx; display:flex; justify-content:space-between; padding:8rpx 6rpx; }
</style>