<script setup>
</script>

<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background: var(--paper-white);
}

.app-container {
  position: relative;
  min-height: 100vh;
}

/* 页面切换动画 - 水墨渲染效果 */
.page-fade-enter-active {
  animation: inkFadeIn 0.5s ease-out;
}

.page-fade-leave-active {
  animation: inkFadeOut 0.3s ease-in;
}

@keyframes inkFadeOut {
  from {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: scale(0.98);
    filter: blur(2px);
  }
}

/* Vant 组件样式覆盖 - 中国风适配 */
:root {
  --van-primary-color: var(--cinnabar);
  --van-text-color: var(--text-primary);
  --van-text-color-2: var(--text-secondary);
  --van-text-color-3: var(--text-tertiary);
  --van-border-color: var(--ink-wash);
  --van-background: var(--paper-white);
  --van-background-2: var(--paper-cream);
  --van-font-size-md: 15px;
  --van-font-size-lg: 16px;
  --van-radius-md: var(--radius-md);
  --van-radius-lg: var(--radius-lg);
  --van-active-opacity: 0.8;
}

/* 修复所有 Vant 组件的文字颜色 */
.van-button,
.van-button--primary,
.van-button--default,
.van-cell,
.van-cell__title,
.van-cell__value,
.van-tabbar-item,
.van-tabbar-item__text,
.van-search__content,
.van-field__control,
.van-tag {
  color: inherit !important;
}

/* 确保按钮文字始终可见 */
.van-button {
  color: var(--text-primary) !important;
}

.van-button--primary {
  color: #ffffff !important;
}

.van-button:active {
  opacity: 0.8;
}

/* Tabbar 样式优化 */
.van-tabbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--ink-wash);
  box-shadow: 0 -4px 16px rgba(44, 44, 44, 0.06);
}

.van-tabbar-item {
  color: var(--text-tertiary) !important;
}

.van-tabbar-item--active {
  color: var(--cinnabar) !important;
}

.van-tabbar-item__text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  font-weight: 500;
  color: inherit !important;
}

.van-tabbar-item__icon {
  color: inherit !important;
}

.van-tabbar-item__icon .van-icon {
  color: inherit !important;
}

/* 按钮样式优化 */
.van-button--primary {
  background: linear-gradient(135deg, var(--cinnabar) 0%, #b04a32 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(200, 85, 61, 0.3);
  color: #ffffff !important;
}

.van-button--primary:active {
  background: linear-gradient(135deg, #b04a32 0%, var(--cinnabar) 100%);
  color: #ffffff !important;
}

.van-button--default {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--ink-wash);
  color: var(--text-primary) !important;
}

.van-button--default:active {
  background: rgba(245, 245, 245, 0.95);
  color: var(--text-primary) !important;
}

.van-button__text {
  color: inherit !important;
}

/* 搜索框样式 */
.van-search {
  background: transparent;
}

.van-search__content {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-lg);
}

.van-field__control {
  color: var(--text-primary) !important;
}

.van-field__control::placeholder {
  color: var(--text-secondary) !important;
}

/* 单元格样式 */
.van-cell {
  background: rgba(255, 255, 255, 0.92);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-xs);
  color: var(--text-primary) !important;
}

.van-cell__title,
.van-cell__value,
.van-cell__label {
  color: inherit !important;
}

.van-cell:active {
  background: rgba(245, 245, 245, 0.95);
}

/* 标签样式 */
.van-tag {
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  color: inherit !important;
}

.van-tag--primary {
  background: var(--cinnabar);
  color: #ffffff !important;
}

/* 通知栏样式 */
.van-notice-bar {
  background: var(--gold-light);
  color: var(--text-primary) !important;
  border-radius: var(--radius-md);
}

.van-notice-bar__content {
  color: inherit !important;
}

/* 图标颜色修复 */
.van-icon {
  color: inherit !important;
}

/* SwipeCell 滑动单元格 */
.van-swipe-cell__wrapper {
  color: var(--text-primary) !important;
}

/* Dialog 对话框 */
.van-dialog__header,
.van-dialog__message {
  color: var(--text-primary) !important;
}

/* Popup 弹出层 */
.van-popup {
  background: rgba(255, 255, 255, 0.98);
  color: var(--text-primary) !important;
}
</style>
