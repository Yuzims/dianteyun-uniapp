<template>
  <view class="order-page">
    <!-- 订单商品列表 -->
    <view class="order-list">
      <view class="order-item" v-for="(item, index) in orderItems" :key="index">
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

            <!-- 数量 -->
            <view class="item-quantity">
              <text class="quantity-value">{{ item.quantity }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 统计信息 -->
    <view class="stat-section">
      <!-- 数量统计 -->
      <view class="stat-row">
        <text class="stat-label">数量</text>
        <text class="stat-value">{{ totalQuantity }}</text>
      </view>

      <!-- 金额统计 -->
      <view class="stat-row">
        <text class="stat-label">金额</text>
        <view class="stat-amount">
          <text class="amount-symbol">¥</text>
          <text class="amount-value">{{ totalAmount }}</text>
        </view>
      </view>
    </view>

    <!-- 备注输入框 -->
    <view class="remark-section">
      <text class="remark-label">备注</text>
      <textarea 
        class="remark-input"
        placeholder="请输入备注信息"
        v-model="remark"
      ></textarea>
    </view>

    <!-- 附件上传区域 -->
    <view class="attachment-section">
      <text class="attachment-label">附件</text>
      <view class="attachment-area">
        <view class="attachment-item upload-item" @click="uploadAttachment">
          <view class="upload-icon">
            <image src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'/%3E%3C/svg%3E" mode="aspectFit"></image>
          </view>
          <text class="upload-text">上传附件</text>
        </view>
        
        <!-- 已上传的附件 -->
        <view class="attachment-item uploaded" v-if="attachments.length > 0">
          <view class="attachment-icon">
            <image src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239c27b0'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'/%3E%3C/svg%3E" mode="aspectFit"></image>
          </view>
          <text class="attachment-name">{{ attachments[0] }}</text>
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="button-section">
      <button class="submit-btn" @click="submitOrder">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      remark: '',
      attachments: [],
      orderItems: [
        {
          image: 'https://via.placeholder.com/100/888/fff?text=T%E6%81%A4',
          name: '2506# 夏季新款国潮纯棉短袖T恤',
          color: '灰色',
          size: 'M',
          price: '16.8',
          quantity: 40,
          totalPrice: 672
        },
        {
          image: 'https://via.placeholder.com/100/888/fff?text=T%E6%81%A4',
          name: '2506# 夏季新款国潮纯棉短袖T恤',
          color: '灰色',
          size: 'M',
          price: '16.8',
          quantity: 40,
          totalPrice: 672
        },
        {
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
      return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalAmount() {
      return this.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  },
  methods: {
    uploadAttachment() {
      // 模拟上传附件
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.attachments = res.tempFilePaths;
        }
      });
    },
    submitOrder() {
      uni.showToast({
        title: '订单已提交',
        icon: 'success',
        duration: 2000
      });
    }
  }
};
</script>

<style scoped>
.order-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
  padding-bottom: 120rpx;
}

/* 订单商品列表 */
.order-list {
  margin-bottom: 20rpx;
}

.order-item {
  display: flex;
  background: white;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
  padding: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.item-image {
  width: 100rpx;
  height: 100rpx;
  margin-right: 12rpx;
  border-radius: 8rpx;
  overflow: hidden;
  flex-shrink: 0;
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
}

.item-name {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  line-height: 1.2;
  max-width: 400rpx;
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

.item-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 40rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 4rpx;
  background: white;
}

.quantity-value {
  font-size: 24rpx;
  color: #333;
}

/* 统计信息 */
.stat-section {
  background: white;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 26rpx;
  color: #333;
}

.stat-value {
  font-size: 28rpx;
  color: #f30;
  font-weight: 600;
}

.stat-amount {
  display: flex;
  align-items: baseline;
}

.amount-symbol {
  font-size: 24rpx;
  color: #f30;
  margin-right: 4rpx;
}

.amount-value {
  font-size: 32rpx;
  color: #f30;
  font-weight: 600;
}

/* 备注输入框 */
.remark-section {
  background: white;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.remark-label {
  display: block;
  font-size: 26rpx;
  color: #333;
  margin-bottom: 12rpx;
  font-weight: 500;
}

.remark-input {
  width: 100%;
  height: 120rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  padding: 12rpx;
  font-size: 24rpx;
  box-sizing: border-box;
}

/* 附件上传区域 */
.attachment-section {
  background: white;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.attachment-label {
  display: block;
  font-size: 26rpx;
  color: #333;
  margin-bottom: 12rpx;
  font-weight: 500;
}

.attachment-area {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.attachment-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  height: 100rpx;
  border-radius: 8rpx;
}

.upload-item {
  background: #f5f5f5;
  border: 2rpx dashed #ddd;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-item:active {
  background: #f0f0f0;
}

.upload-icon {
  width: 40rpx;
  height: 40rpx;
  margin-bottom: 4rpx;
}

.upload-icon image {
  width: 100%;
  height: 100%;
}

.upload-text {
  font-size: 20rpx;
  color: #999;
}

.uploaded {
  background: #f3e5f5;
  border: 2rpx solid #e1bee7;
}

.attachment-icon {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: 8rpx;
}

.attachment-icon image {
  width: 100%;
  height: 100%;
}

.attachment-name {
  font-size: 18rpx;
  color: #9c27b0;
  text-align: center;
}

/* 提交按钮 */
.button-section {
  position: fixed;
  bottom: 20rpx;
  left: 20rpx;
  right: 20rpx;
  display: flex;
  gap: 12rpx;
}

.submit-btn {
  flex: 1;
  height: 70rpx;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  font-weight: 600;
}
</style>