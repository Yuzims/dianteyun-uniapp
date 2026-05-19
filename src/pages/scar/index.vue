<template>
  <view class="cart-page">
    <!-- 购物车列表 -->
    <view class="cart-list">
      <view class="cart-item" v-for="(item, index) in cartItems" :key="index">
        <!-- 左侧复选框 -->
        <view class="item-checkbox">
          <view class="checkbox" :class="{ checked: item.selected }">
            <text v-if="item.selected" class="check-icon">✓</text>
          </view>
        </view>

        <!-- 商品内容 -->
        <view class="item-content">
          <!-- 商品图片 -->
          <view class="item-image">
            <image :src="item.image" mode="aspectFill"></image>
          </view>

          <!-- 商品信息 -->
          <view class="item-info">
            <view class="item-name">{{ item.name }}</view>
            <view class="item-specs">{{ item.color }} {{ item.size }}</view>
            
            <view class="item-footer">
              <!-- 价格 -->
              <view class="item-price">
                <text class="price-symbol">¥</text>
                <text class="price-value">{{ item.price }}</text>
                <text class="price-unit"> / 件</text>
              </view>

              <!-- 删除按钮 -->
              <text class="item-delete">删除</text>
            </view>
          </view>

          <!-- 数量控制 -->
          <view class="item-quantity">
            <view class="quantity-input">
              <text class="quantity-value">{{ item.quantity }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部统计栏 -->
    <view class="cart-footer">
      <!-- 左侧全选 -->
      <view class="footer-left">
        <view class="select-all">
          <view class="checkbox" :class="{ checked: selectAll }">
            <text v-if="selectAll" class="check-icon">✓</text>
          </view>
          <text class="select-all-text">全选</text>
        </view>
      </view>

      <!-- 中间统计 -->
      <view class="footer-middle">
        <view class="stat-item">
          <text class="stat-label">数量：</text>
          <text class="stat-value">{{ totalQuantity }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">金额：</text>
          <text class="stat-value">{{ totalAmount }}</text>
        </view>
      </view>

      <!-- 右侧提交按钮 -->
      <view class="footer-right">
        <button class="submit-btn" @click="submitOrder">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectAll: true,
      cartItems: [
        {
          selected: true,
          image: 'https://via.placeholder.com/100/888/fff?text=T%E6%81%A4',
          name: '2506# 夏季新款国潮纯棉短袖T恤',
          color: '灰色',
          size: 'M',
          price: '16.8',
          quantity: 40,
          totalPrice: 672
        },
        {
          selected: true,
          image: 'https://via.placeholder.com/100/888/fff?text=T%E6%81%A4',
          name: '2506# 夏季新款国潮纯棉短袖T恤',
          color: '灰色',
          size: 'M',
          price: '16.8',
          quantity: 40,
          totalPrice: 672
        },
        {
          selected: true,
          image: 'https://via.placeholder.com/100/888/fff?text=T%E6%81%A4',
          name: '2506# 夏季新款国潮纯棉短袖T恤',
          color: '灰色',
          size: 'M',
          price: '16.8',
          quantity: 40,
          totalPrice: 672
        }
      ]
    };
  },
  computed: {
    totalQuantity() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalAmount() {
      return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  },
  methods: {
    submitOrder() {
      uni.navigateTo({
        url: '/pages/va01/index'
      });
    }
  }
};
</script>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

/* 购物车列表 */
.cart-list {
  flex: 1;
  padding: 20rpx;
}

.cart-item {
  display: flex;
  background: white;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.item-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  padding: 0 12rpx;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.checkbox.checked {
  background: #1890ff;
  border-color: #1890ff;
}

.check-icon {
  color: white;
  font-size: 20rpx;
  font-weight: bold;
}

/* 商品内容 */
.item-content {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 12rpx 0;
}

.item-image {
  width: 100rpx;
  height: 100rpx;
  margin-right: 12rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.item-image image {
  width: 100%;
  height: 100%;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100rpx;
}

.item-name {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  line-height: 1.2;
  max-width: 300rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-specs {
  font-size: 24rpx;
  color: #999;
  margin-top: 4rpx;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8rpx;
}

.item-price {
  font-size: 24rpx;
  color: #f30;
  font-weight: 500;
}

.price-symbol {
  font-size: 20rpx;
  margin-right: 2rpx;
}

.price-unit {
  font-size: 22rpx;
  margin-left: 2rpx;
}

.item-delete {
  font-size: 24rpx;
  color: #f30;
  font-weight: 500;
  cursor: pointer;
}

/* 数量控制 */
.item-quantity {
  display: flex;
  align-items: center;
  margin: 0 12rpx;
}

.quantity-input {
  width: 60rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid #e0e0e0;
  border-radius: 4rpx;
  background: white;
}

.quantity-value {
  font-size: 24rpx;
  color: #333;
}

/* 底部统计栏 */
.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
}

.footer-left {
  display: flex;
  align-items: center;
  width: 150rpx;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 12rpx;
  cursor: pointer;
}

.select-all-text {
  font-size: 26rpx;
  color: #333;
}

.footer-middle {
  display: flex;
  align-items: center;
  gap: 32rpx;
  flex: 1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

.stat-value {
  font-size: 28rpx;
  color: #f30;
  font-weight: 600;
}

.footer-right {
  width: 140rpx;
}

.submit-btn {
  width: 100%;
  height: 70rpx;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 8rpx;
  font-size: 26rpx;
  font-weight: 600;
}

.badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 32rpx;
  height: 32rpx;
  background: #f30;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 600;
}
</style>