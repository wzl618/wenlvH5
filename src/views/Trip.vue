<template>
  <div class="trip-page">
    <!-- 自定义头部 -->
    <div class="header-section">
      <div class="back-btn" @click="goBack">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="page-title">我的行程</h1>
    </div>

    <div class="content">
      <!-- 行程概览 -->
      <div v-if="totalItems > 0" class="trip-summary">
        <div class="summary-icon">
          <van-icon name="clock-o" size="24" color="var(--color-primary)" />
        </div>
        <div class="summary-content">
          <h3>行程已规划</h3>
          <p>{{ tripStore.plan.startTime }} 出发，预计 {{ totalDuration }} 分钟</p>
        </div>
      </div>

      <van-empty v-if="totalItems === 0" description="还没有收藏内容" class="empty-state">
        <button class="add-btn" @click="goTo('/routes')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>去添加路线</span>
        </button>
      </van-empty>

      <template v-else>
        <!-- 排序与时间 -->
        <div class="settings-card">
          <div class="settings-header">
            <h3>排序与时间</h3>
          </div>

          <div class="setting-item">
            <label>排序方式</label>
            <van-radio-group
              v-model="tripStore.plan.sortMode"
              direction="horizontal"
              @change="tripStore.savePlan()"
            >
              <van-radio name="recommended" checked-color="var(--color-primary)">推荐</van-radio>
              <van-radio name="added" checked-color="var(--color-primary)">添加</van-radio>
              <van-radio name="kind" checked-color="var(--color-primary)">类型</van-radio>
            </van-radio-group>
          </div>

          <div class="setting-item">
            <label>出发时间</label>
            <input
              type="time"
              v-model="tripStore.plan.startTime"
              @change="tripStore.savePlan()"
              class="time-input"
            />
          </div>
        </div>

        <!-- 时间安排 -->
        <div class="schedule-section">
          <div class="section-header">
            <h3>推荐时间安排</h3>
            <span class="section-subtitle">{{ scheduleItems.length }} 个项目</span>
          </div>

          <div class="timeline">
            <div
              v-for="(item, index) in scheduleItems"
              :key="index"
              class="timeline-item cursor-pointer"
              @click="goToDetail(item)"
            >
              <div class="timeline-marker">
                <div class="marker-dot"></div>
                <div class="marker-line" v-if="index < scheduleItems.length - 1"></div>
              </div>
              <div class="timeline-content">
                <div class="timeline-time">{{ item.timeRange }}</div>
                <div class="timeline-card">
                  <div class="timeline-badge" :style="{ background: getBadgeColor(item.kind) }">
                    {{ getKindLabel(item.kind) }}
                  </div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.recommendedLabel }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 已选路线 -->
        <div class="items-section" v-if="tripStore.state.route.length > 0">
          <div class="section-header">
            <h3>已选路线</h3>
            <span class="section-subtitle">{{ tripStore.state.route.length }} 条</span>
          </div>
          <div class="items-list">
            <van-swipe-cell v-for="item in tripStore.state.route" :key="item.targetId">
              <div class="item-card cursor-pointer" @click="goToDetail(item)">
                <div class="item-badge" style="background: var(--color-primary)">路线</div>
                <div class="item-content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.meta }}</p>
                </div>
                <van-icon name="arrow" color="var(--color-text-light)" />
              </div>
              <template #right>
                <van-button
                  square
                  type="danger"
                  text="删除"
                  class="delete-button"
                  @click="tripStore.removeItem('route', item.targetId)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>

        <!-- 想去景点 -->
        <div class="items-section" v-if="tripStore.state.spot.length > 0">
          <div class="section-header">
            <h3>想去景点</h3>
            <span class="section-subtitle">{{ tripStore.state.spot.length }} 个</span>
          </div>
          <div class="items-list">
            <van-swipe-cell v-for="item in tripStore.state.spot" :key="item.targetId">
              <div class="item-card cursor-pointer" @click="goToDetail(item)">
                <div class="item-badge" style="background: var(--color-secondary)">景点</div>
                <div class="item-content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.meta }}</p>
                </div>
                <van-icon name="arrow" color="var(--color-text-light)" />
              </div>
              <template #right>
                <van-button
                  square
                  type="danger"
                  text="删除"
                  class="delete-button"
                  @click="tripStore.removeItem('spot', item.targetId)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>

        <!-- 想吃美食 -->
        <div class="items-section" v-if="tripStore.state.food.length > 0">
          <div class="section-header">
            <h3>想吃美食</h3>
            <span class="section-subtitle">{{ tripStore.state.food.length }} 个</span>
          </div>
          <div class="items-list">
            <van-swipe-cell v-for="item in tripStore.state.food" :key="item.targetId">
              <div class="item-card cursor-pointer" @click="goToDetail(item)">
                <div class="item-badge" style="background: var(--color-cta)">美食</div>
                <div class="item-content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.meta }}</p>
                </div>
                <van-icon name="arrow" color="var(--color-text-light)" />
              </div>
              <template #right>
                <van-button
                  square
                  type="danger"
                  text="删除"
                  class="delete-button"
                  @click="tripStore.removeItem('food', item.targetId)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="clear-btn" @click="handleClear">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <span>清空我的行程</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
import { tripStore } from '../stores/trip'
import PaperButton from '../components/PaperButton.vue'

const router = useRouter()

const totalItems = computed(() => {
  return tripStore.state.route.length + tripStore.state.spot.length + tripStore.state.food.length
})

const totalDuration = computed(() => {
  return tripStore.getTotalDuration()
})

const scheduleItems = computed(() => {
  const items = tripStore.getAllItems()
  const sorted = tripStore.sortItems(items)

  let currentTime = parseTime(tripStore.plan.startTime)
  return sorted.map((item, index) => {
    const start = currentTime
    const end = currentTime + item.durationMinutes
    currentTime = end

    return {
      ...item,
      sequence: index + 1,
      timeRange: `${formatTime(start)} - ${formatTime(end)}`
    }
  })
})

function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function formatTime(minutes) {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

function goBack() {
  router.back()
}

function goTo(path) {
  router.push(path)
}

function goToDetail(item) {
  const paths = {
    route: `/route/${item.targetId}`,
    spot: `/spot/${item.targetId}`,
    food: `/food/${item.targetId}`
  }
  router.push(paths[item.kind] || '/home')
}

function getKindLabel(kind) {
  const labels = { route: '路线', spot: '景点', food: '美食' }
  return labels[kind] || '其他'
}

function getBadgeColor(kind) {
  const colors = {
    route: 'var(--color-primary)',
    spot: 'var(--color-secondary)',
    food: 'var(--color-cta)'
  }
  return colors[kind] || 'var(--color-text-light)'
}

function handleClear() {
  showConfirmDialog({
    title: '确认清空',
    message: '确定要清空所有行程吗？'
  }).then(() => {
    tripStore.clear()
  }).catch(() => {})
}
</script>

<style scoped>
.trip-page {
  min-height: 100vh;
  background: var(--paper-white);
  padding-bottom: 60px;
  position: relative;
}

/* 头部区域 */
.header-section {
  position: relative;
  padding: 16px;
  background: linear-gradient(135deg, var(--jade-green) 0%, var(--mountain-green) 100%);
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 247, 237, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid var(--cinnabar);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(198, 123, 92, 0.2);
  flex-shrink: 0;
}

.back-btn:active {
  transform: scale(0.95);
}

.back-btn .icon {
  width: 24px;
  height: 24px;
  color: var(--text-primary);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  font-family: var(--font-serif);
  margin: 0;
  flex: 1;
  text-align: center;
  margin-right: 44px; /* 平衡返回按钮的宽度 */
}

.content {
  padding: var(--space-md);
  position: relative;
  z-index: 1;
}

/* 行程概览 - 水墨渐变 */
.trip-summary {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-xl);
  margin-bottom: var(--space-lg);
  background: linear-gradient(135deg, var(--jade-green) 0%, var(--mountain-green) 100%);
  border-radius: var(--radius-lg);
  color: #ffffff !important;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.trip-summary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.summary-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.summary-icon .van-icon {
  color: #ffffff !important;
}

.summary-content {
  flex: 1;
  color: #ffffff !important;
}

.summary-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
  color: #ffffff !important;
  font-family: var(--font-serif);
  letter-spacing: 0.05em;
}

.summary-content p {
  font-size: 0.9rem;
  opacity: 0.95;
  color: #ffffff !important;
}

.empty-state {
  padding: var(--space-2xl) 0;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 100%);
  color: #fff7ed;
  border: none;
  border-radius: 20px;
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 20px rgba(90, 124, 111, 0.3);
  letter-spacing: 0.5px;
  margin-top: 16px;
}

.add-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.25);
}

.add-btn .btn-icon {
  width: 22px;
  height: 22px;
  stroke-width: 2.5;
}

/* 设置卡片 - 宣纸质感 */
.settings-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--ink-wash);
  position: relative;
}

.settings-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.3;
}

.settings-header h3 {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  color: var(--ink-black);
  margin-bottom: var(--space-lg);
  letter-spacing: 0.05em;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) 0;
}

.setting-item:not(:last-child) {
  border-bottom: 1px solid var(--ink-wash);
}

.setting-item label {
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 500;
  font-family: var(--font-serif);
}

.time-input {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--paper-cream);
  transition: all var(--transition-base);
  font-family: var(--font-sans);
}

.time-input:focus {
  outline: none;
  border-color: var(--jade-green);
  box-shadow: 0 0 0 3px var(--jade-light);
  background: white;
}

/* 时间安排 */
.schedule-section {
  margin-bottom: var(--space-2xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.section-header h3 {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  color: var(--ink-black);
  letter-spacing: 0.05em;
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.marker-dot {
  width: 12px;
  height: 12px;
  background: var(--jade-green);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--jade-light);
  z-index: 1;
}

.marker-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, var(--jade-light), var(--ink-wash));
  margin-top: var(--space-xs);
}

.timeline-content {
  flex: 1;
}

.timeline-time {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--jade-green);
  margin-bottom: var(--space-xs);
  font-family: var(--font-serif);
}

.timeline-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  border: 1px solid var(--ink-wash);
}

.timeline-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-md);
}

.timeline-badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: var(--space-sm);
  font-family: var(--font-serif);
}

.timeline-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-family: var(--font-serif);
}

.timeline-card p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 项目列表 */
.items-section {
  margin-bottom: var(--space-2xl);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.item-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--ink-wash);
}

.item-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-md);
}

.item-badge {
  min-width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: var(--shadow-md);
  font-family: var(--font-serif);
}

.item-content {
  flex: 1;
}

.item-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-family: var(--font-serif);
}

.item-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.delete-button {
  height: 100%;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.clear-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  color: #c67b5c;
  border: 2px solid #c67b5c;
  border-radius: 20px;
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(198, 123, 92, 0.2);
  letter-spacing: 0.5px;
}

.clear-btn:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, #fef3e2 0%, #fde8c8 100%);
  box-shadow: 0 2px 8px rgba(198, 123, 92, 0.15);
}

.btn-icon {
  width: 22px;
  height: 22px;
  stroke-width: 2.5;
}
</style>
