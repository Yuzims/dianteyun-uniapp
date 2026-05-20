<template>
  <view class="page">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <image src="@/static/search-outline.svg" class="search-icon" />
        <input 
          type="text" 
          placeholder="输入货号或品名等关键字"
          placeholder-class="placeholder"
          v-model="searchText"
          @confirm="handleSearch"
        />
      </view>
      <view class="search-action">
        <text class="search-btn">搜索</text>
        <view class="filter-btn">
          <text>筛选</text>
          <image src="@/static/funnel-outline.svg" class="filter-icon" />
        </view>
      </view>
    </view>

    <!-- 标签页 -->
    <view class="tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="setActiveTab(index)"
      >
        <text>{{ tab }}</text>
        <view v-if="activeTab === index" class="tab-indicator" />
      </view>
    </view>

    <!-- 订单列表 -->
    <scroll-view
      class="orders-container"
      scroll-y
      :lower-threshold="80"
      @scroll="handleListScroll"
      @scrolltolower="handleReachBottom"
    >
      <view v-if="orders.length > 0" class="orders-list">
        <view :style="{ height: `${topSpacerHeight}px` }"></view>
        <view
          v-for="(order, idx) in visibleOrders"
          :key="`${order.vbeln || 'v'}-${order.erdat || 'd'}-${visibleStart + idx}`"
          class="order-card"
          @click="openOrder(order)"
        >
          <!-- 订单状态和基本信息 -->
          <view class="order-header">
            <view class="status-badge" :class="order.lfstk">
              {{ order.lfstk }}
            </view>
            <view class="order-basic">
              <view class="order-top">
                <text class="order-merchant">{{ order.mtext || '' }}</text>
                <text class="order-number">No. {{ order.vbeln || '' }}</text>
              </view>
            </view>
          </view>

          <!-- 订单日期 -->
          <view class="order-date">
            <text>{{ order.erdat || '' }}</text>
            <text class="weekday">{{ order.ertim || '' }}</text>
          </view>

          <!-- 商品图片展示 -->
          <view class="product-images">
            <image 
              v-for="(it, i) in (order.item_list || [])" 
              :key="i"
              :src="it.url || it.pic_url || it.picurl || ''"
              class="product-img"
            />
          </view>

          <!-- 订单统计和操作 -->
          <view class="order-footer">
            <view class="order-stats">
              <view class="stat-item">
                <text class="stat-label">共</text>
                <text class="stat-value">{{ order.menge || '' }}</text>
                <text class="stat-label">件 合计</text>
              </view>
              <text class="order-price">{{ order.waerst || 'RMB' }} {{ order.netwr || '' }}</text>
            </view>
            <view class="order-actions">
              <view
                v-if="isUserSelfOrder(order)"
                class="delete-btn"
                @click.stop="handleDelete(order)"
              >
                <text class="delete-icon">⊘</text>
                <text class="delete-text">删除</text>
              </view>
              <view v-else class="delete-btn delete-btn-disabled">
                <text class="delete-icon">⊘</text>
                <text class="delete-text">不可删除</text>
              </view>
              <view class="reorder-btn" @click.stop="() => {}">再来一单</view>
            </view>
          </view>
        </view>
        <view :style="{ height: `${bottomSpacerHeight}px` }"></view>
        <view v-if="loadingMore" class="loading-more">加载中...</view>
        <view v-else-if="!hasMore" class="loading-more">没有更多了</view>
      </view>
      <view v-else class="empty-state">
        <text>暂无订单</text>
      </view>
    </scroll-view>

    <!-- 底部提示 -->
    <view class="bottom-notice">
      <view class="notice-content">
        <text>1、只有手机号绑定到的商家的单据才会显示</text>
        <text>2、你第一次登录到商家主页时会自动绑定商家，如果绑定不成功需要通知商家手工绑定</text>
      </view>
      <view class="notice-close" @click="showNotice = false">✕</view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import * as orderApi from '@/services/api/orderApi'

const searchText = ref('')
const activeTab = ref(0)
const showNotice = ref(true)

const tabs = ['全部', '自助开单', '商家开单']

// 保持后端原字段：直接使用后端返回的对象数组（例如包含 mandt, vbeln, mtext, netwr, menge, lfstk, item_list 等）
const orders = ref([])

const page = ref(0)
const pageSize = 10
const hasMore = ref(true)
const loadingMore = ref(false)

const scrollTop = ref(0)
const itemHeight = 220
const visibleCount = 8
const buffer = 3

const visibleStart = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight) - buffer
  return Math.max(0, start)
})

const visibleEnd = computed(() => {
  const end = visibleStart.value + visibleCount + buffer * 2
  return Math.min(orders.value.length, end)
})

const visibleOrders = computed(() => orders.value.slice(visibleStart.value, visibleEnd.value))
const topSpacerHeight = computed(() => visibleStart.value * itemHeight)
const bottomSpacerHeight = computed(() => Math.max(0, (orders.value.length - visibleEnd.value) * itemHeight))

function currentWxflg(){
  if(activeTab.value === 1) return 'X'
  if(activeTab.value === 2) return ''
  return 'A'
}

async function loadOrders(reset = false){
  if(loadingMore.value) return
  if(!hasMore.value && !reset) return

  if(reset){
    page.value = 0
    hasMore.value = true
    orders.value = []
    scrollTop.value = 0
  }

  loadingMore.value = true
  try{
    const params = {
      wxflg: currentWxflg(),
      page: page.value,
      pagesize: pageSize
    }

    const keyword = searchText.value.trim()
    if(keyword) params.keyword = keyword

    try{
      const storedMobile = uni.getStorageSync('mobile') || ''
      const auth_token = uni.getStorageSync('auth_token') || ''
      if(!params.telno && storedMobile) params.telno = storedMobile
      if(auth_token) params.token = auth_token
    }catch(e){ /* ignore storage errors */ }

    const res = await orderApi.dtyGetsdolist(params)
    const items = (res && res.data && res.data.result && res.data.result.items) || []

    orders.value = reset ? items : orders.value.concat(items)
    hasMore.value = items.length >= pageSize
    if(items.length > 0) page.value += 1
  }catch(e){
    console.error('加载订单失败', e)
    uni.showToast({ title: e.message || '加载失败', icon: 'none' })
  }finally{
    loadingMore.value = false
  }
}

function handleSearch(){
  loadOrders(true)
}

function setActiveTab(index){
  if(activeTab.value === index) return
  activeTab.value = index
  loadOrders(true)
}

function handleReachBottom(){
  loadOrders(false)
}

function handleListScroll(e){
  const top = e?.detail?.scrollTop || 0
  scrollTop.value = top

  // 某些端 scrolltolower 触发不稳定，这里增加兜底触底检测
  const sh = Number(e?.detail?.scrollHeight || 0)
  const ch = Number(e?.detail?.clientHeight || 0)
  if(sh > 0 && ch > 0 && sh - (top + ch) <= 120){
    loadOrders(false)
  }
}

function isUserSelfOrder(order){
  return String(order?.wxflg || '').toUpperCase() === 'X'
}

function handleDelete(order){
  // 这里只切换 UI 状态，真正删除逻辑后续接删除接口时再接入
  uni.showToast({
    title: `当前为${isUserSelfOrder(order) ? '用户自开单' : '商家开单'}，删除功能待接入`,
    icon: 'none'
  })
}

function openOrder(order){
  // 确保直接传递后端字段 mandt 和 vbeln
  const mandt = order.mandt || ''
  const vbeln = order.vbeln || ''
  // 使用页面跳转并传参到详情页（pages/Va03/index）
  const url = `/pages/Va03/index?mandt=${encodeURIComponent(mandt)}&vbeln=${encodeURIComponent(vbeln)}`
  uni.navigateTo({ url })
}

onMounted(()=>{
  loadOrders(true)
})
</script>

<style scoped>
.page {
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  background: #ffffff;
  gap: 12rpx;
  flex-wrap: nowrap;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 22rpx;
  padding: 12rpx 16rpx;
  height: 50rpx;
  min-width: 0;
}

.search-icon {
  font-size: 26rpx;
  margin-right: 10rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28rpx;
  height: 28rpx;
}

.search-input input {
  flex: 1;
  font-size: 26rpx;
  color: #333;
  background: transparent;
  border: none;
  outline: none;
  min-width: 0;
}

.search-input input::placeholder {
  color: #999;
}

.placeholder {
  color: #999 !important;
  font-size: 26rpx !important;
}

.search-action {
  display: flex;
  gap: 10rpx;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
}

.search-btn,
.filter-btn {
  font-size: 24rpx;
  padding: 8rpx 14rpx;
  white-space: nowrap;
  border-radius: 6rpx;
  transition: all 0.2s;
}

.search-btn {
  color: #ffffff;
  background: #4c8dea;
}

.filter-btn {
  color: #666;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.filter-icon {
  width: 20rpx;
  height: 20rpx;
}

/* 标签页 */
.tabs {
  display: flex;
  border-bottom: 1rpx solid #f0f0f0;
  background: #ffffff;
  padding: 0 24rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.02);
}

.tab-item {
  flex: 1;
  padding: 18rpx 0;
  text-align: center;
  position: relative;
  font-size: 28rpx;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}

.tab-item.active {
  color: #4c8dea;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  bottom: -1rpx;
  left: 0;
  right: 0;
  height: 3rpx;
  background: linear-gradient(to right, transparent, #4c8dea, transparent);
}

/* 订单容器 */
.orders-container {
  flex: 1;
  height: 0;
  padding: 0 0 20rpx 24rpx;
  box-sizing: border-box;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

/* 订单卡片 */
.order-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  border: 1rpx solid #f0f0f0;
}

.order-card:active {
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  align-items: flex-start;
  gap: 14rpx;
  margin-bottom: 14rpx;
}

.status-badge {
  flex-shrink: 0;
  padding: 6rpx 12rpx;
  border-radius: 6rpx;
  font-size: 22rpx;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.pending {
  background: #fff1f0;
  color: #ff4d4f;
}

.source-badge {
  flex-shrink: 0;
  padding: 6rpx 12rpx;
  border-radius: 6rpx;
  font-size: 22rpx;
  font-weight: 600;
  white-space: nowrap;
}

.source-badge.user {
  background: #eef7ff;
  color: #1677ff;
}

.source-badge.merchant {
  background: #f5f5f5;
  color: #8c8c8c;
}

.order-basic {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
  min-width: 0;
}

.order-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8rpx;
  min-width: 0;
}

.order-merchant {
  font-size: 26rpx;
  color: #222;
  font-weight: 500;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-number {
  font-size: 22rpx;
  color: #999;
  display: block;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 8rpx;
}

.order-date {
  font-size: 22rpx;
  color: #aaa;
  margin-bottom: 14rpx;
  display: flex;
  gap: 6rpx;
  align-items: center;
}

.weekday {
  color: #bbb;
}

.product-images {
  display: flex;
  gap: 10rpx;
  margin-bottom: 18rpx;
  flex-wrap: wrap;
}

.product-img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  background: #f0f0f0;
  flex-shrink: 0;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
  flex-wrap: nowrap;
}

.order-stats {
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  gap: 4rpx;
  white-space: nowrap;
  min-width: 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 2rpx;
  font-size: 24rpx;
  color: #666;
  white-space: nowrap;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

.stat-value {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  display: inline;
}

.order-price {
  font-size: 28rpx;
  font-weight: 600;
  color: #ff4d4f;
  margin-left: 8rpx;
  white-space: nowrap;
}

.order-actions {
  display: flex;
  gap: 12rpx;
  flex-shrink: 0;
}

.delete-btn {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
  padding: 10rpx 12rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  min-width: 64rpx;
}

.delete-btn:active {
  background: #e8e8e8;
  transform: scale(0.95);
}

.delete-btn-disabled {
  opacity: 0.55;
}

.delete-btn-disabled:active {
  background: #f5f5f5;
  transform: none;
}

.delete-icon {
  font-size: 20rpx;
  color: #999;
  display: block;
  line-height: 1;
}

.delete-text {
  font-size: 20rpx;
  color: #666;
  display: block;
}

.reorder-btn {
  flex: 0 0 auto;
  padding: 10rpx 28rpx;
  background: linear-gradient(135deg, #4c8dea 0%,  #307dea 100%);
  color: #ffffff;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 26rpx;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s;
}

.reorder-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 12rpx rgba(22, 119, 255, 0.3);
}

/* 空状态 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  color: #999;
  font-size: 28rpx;
}

.loading-more {
  text-align: center;
  color: #999;
  font-size: 24rpx;
  padding: 16rpx 0 28rpx;
}

/* 底部提示 */
.bottom-notice {
  position: fixed;
  bottom: calc(20rpx + env(safe-area-inset-bottom));
  left: 24rpx;
  right: 24rpx;
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  padding: 16rpx 20rpx;
  background: linear-gradient(135deg, #4c8dea 0%, #3a6bc8 100%);
  color: #ffffff;
  font-size: 22rpx;
  line-height: 1.6;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 16rpx rgba(22, 119, 255, 0.3);
  z-index: 99;
  max-width: calc(100% - 48rpx);
}

.notice-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.notice-content text {
  display: block;
  white-space: normal;
  word-break: break-word;
}

.notice-close {
  flex-shrink: 0;
  font-size: 24rpx;
  cursor: pointer;
  padding: 4rpx 8rpx;
  line-height: 1;
}

/* 响应式优化 */
@media (min-width: 768px) {
  .search-bar {
    padding: 20rpx 40rpx;
  }

  .tabs {
    padding: 0 40rpx;
  }

  .orders-container {
    padding: 24rpx 40rpx 300rpx 40rpx;
    max-width: 1200rpx;
    margin: 0 auto;
  }

  .order-card {
    padding: 28rpx 32rpx;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .search-bar {
    padding: 12rpx 16rpx;
  }

  .search-input {
    border-radius: 18rpx;
    padding: 8rpx 12rpx;
    height: 56rpx;
  }

  .search-input input {
    font-size: 24rpx;
  }

  .search-btn,
  .filter-btn {
    font-size: 22rpx;
    padding: 6rpx 10rpx;
  }

  .order-card {
    padding: 16rpx;
  }

  .order-header {
    gap: 12rpx;
  }

  .order-merchant {
    font-size: 24rpx;
  }

  .product-img {
    width: 80rpx;
    height: 80rpx;
  }

  .bottom-notice {
    padding: 12rpx 16rpx;
    font-size: 20rpx;
    left: 16rpx;
    right: 16rpx;
    bottom: 16rpx;
  }
}
</style>