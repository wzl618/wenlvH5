<template>
  <div class="route-detail">
    <!-- 头图区域 -->
    <div class="hero-section">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>

    <!-- 内容卡片 -->
    <div class="content-card">
      <!-- 标题和基本信息 -->
      <div class="header">
        <h1 class="title">{{ routeData.title }}</h1>

        <div class="meta-row">
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="meta-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ routeData.duration }}</span>
          </div>
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="meta-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{{ routeData.spots.length }} 个点位</span>
          </div>
        </div>

        <!-- 标签 -->
        <div class="rating-row">
          <span class="hot-tag">{{ routeData.tag }}</span>
        </div>
      </div>

      <!-- 描述 -->
      <div class="description">
        <p>{{ routeData.desc }}</p>
      </div>

      <!-- 路线详情 -->
      <div class="section">
        <h3 class="section-title">路线详情</h3>
        <div class="spots-list">
          <div
            v-for="(spot, index) in routeData.spots"
            :key="index"
            class="spot-item"
            @click="goTo(`/spot/${spot.id}`)"
          >
            <div class="step-num">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="spot-content">
              <h4>{{ spot.title }}</h4>
              <p>{{ spot.desc }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 路线价值 -->
      <div class="section">
        <h3 class="section-title">路线价值</h3>
        <div class="suggestion">
          <p>{{ routeData.value }}</p>
        </div>
      </div>

      <!-- 推荐景点 -->
      <div class="section">
        <h3 class="section-title">推荐景点</h3>
        <div class="related-list">
          <div
            v-for="spot in routeData.recommendSpots"
            :key="spot.id"
            class="related-item"
            @click="goTo(`/spot/${spot.id}`)"
          >
            <div class="related-content">
              <h4>{{ spot.title }}</h4>
              <p>{{ spot.desc }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 加入行程按钮 -->
      <div class="action-section">
        <button
          class="add-trip-btn"
          :class="{ 'added': isAdded }"
          @click="handleAddTrip"
        >
          <svg v-if="!isAdded" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>{{ isAdded ? '已加入行程' : '加入我的行程' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { tripStore } from '../stores/trip'

const router = useRouter()
const route = useRoute()
const routeId = route.params.id

const routeDataMap = {
  'route-fast': {
    title: '2 小时最省时间路线',
    duration: '120 分钟',
    tag: '热搜覆盖高',
    desc: '这条路线优先串起热搜前列的经典点位，先看代表景观，再收在休息和拍照体验更好的区域，适合首次来访。',
    value: '已覆盖热搜前 3 里的 2 个重点点位。游客不用反复切换搜索结果，也能优先走到大家最常搜、最值得看的区域。',
    spots: [
      { id: 'spot-cloud', title: '云顶观景台', desc: '建议停留 20 分钟 / 开场先看全景' },
      { id: 'spot-lake', title: '半山镜湖', desc: '建议停留 25 分钟 / 当前热搜第 1' },
      { id: 'spot-corridor', title: '林间长廊', desc: '建议停留 15 分钟 / 连接段更轻松' },
      { id: 'spot-valley', title: '山谷剧场', desc: '建议停留 30 分钟 / 终点适合休息' }
    ],
    recommendSpots: [
      { id: 'spot-cloud', title: '云顶观景台', desc: '适合作为这条路线的第一站，先看清景区全貌。' },
      { id: 'spot-lake', title: '半山镜湖', desc: '热搜第 1 的打卡点，适合中段停留拍照。' }
    ]
  },
  'route-hot': {
    title: '热门必打卡路线',
    duration: '150 分钟',
    tag: '热门优先',
    desc: '这条路线专门覆盖游客搜索热度最高、拍照反馈最好的经典点位，适合第一次来景区但更看重"值不值得去"的游客。',
    value: '更适合"第一次来，但不想漏掉经典"的游客。不追求最短，而是优先覆盖景区热度最高的代表点位。',
    spots: [
      { id: 'spot-cloud', title: '云顶观景台', desc: '建议停留 20 分钟 / 先看景区全貌' },
      { id: 'spot-lake', title: '半山镜湖', desc: '建议停留 25 分钟 / 拍照热度最高' },
      { id: 'spot-corridor', title: '林间长廊', desc: '建议停留 18 分钟 / 节奏放松' },
      { id: 'spot-valley', title: '山谷剧场', desc: '建议停留 25 分钟 / 热门活动集中' },
      { id: 'spot-meadow', title: '花谷草坪', desc: '建议停留 20 分钟 / 适合收尾休息' }
    ],
    recommendSpots: [
      { id: 'spot-lake', title: '半山镜湖', desc: '热搜最高的拍照点，整条热门路线里的核心节点。' },
      { id: 'spot-valley', title: '山谷剧场', desc: '适合路线收尾，也方便承接活动和休息。' }
    ]
  }
}

const routeData = routeDataMap[routeId] || routeDataMap['route-fast']

const isAdded = computed(() => {
  return tripStore.isItemAdded('route', routeId)
})

function goBack() {
  router.back()
}

function goTo(path) {
  router.push(path)
}

function handleAddTrip() {
  if (isAdded.value) {
    router.push('/trip')
    return
  }

  const success = tripStore.addItem('route', {
    title: routeData.title,
    meta: `${routeData.duration} / ${routeData.tag}`,
    targetId: routeId
  })

  if (success) {
    showToast({
      message: '已加入行程',
      position: 'top',
      duration: 2000,
      className: 'custom-toast',
      style: {
        background: '#fff7ed',
        color: '#2d3e35',
        fontSize: '16px',
        fontWeight: '600',
        padding: '14px 28px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(90, 124, 111, 0.3)',
        border: '2px solid #5a7c6f'
      }
    })
  }
}
</script>

<style scoped>
.route-detail {
  background: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 24px;
}

/* 头图区域 - 中国风渐变 */
.hero-section {
  height: 320px;
  position: relative;
  background: linear-gradient(135deg, #d4a574 0%, #c8953d 100%);
  border-radius: 0 0 32px 32px;
  box-shadow: 0 8px 24px rgba(212, 165, 116, 0.2);
}

.back-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 247, 237, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid #c67b5c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(198, 123, 92, 0.2);
}

.back-btn:active {
  transform: scale(0.95);
  background: rgba(255, 247, 237, 1);
}

.back-btn .icon {
  width: 24px;
  height: 24px;
  color: #2d3e35;
  stroke-width: 2.5;
}

/* 内容卡片 - 纸质感 */
.content-card {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border-radius: 32px 32px 0 0;
  margin: -60px 0 0;
  padding: 32px 24px;
  box-shadow: 0 -4px 24px rgba(90, 124, 111, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(90, 124, 111, 0.1);
  border-bottom: none;
}

/* 装饰性边角 */
.content-card::before,
.content-card::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #d4a574;
  opacity: 0.3;
}

.content-card::before {
  top: 16px;
  left: 16px;
  border-right: none;
  border-bottom: none;
}

.content-card::after {
  top: 16px;
  right: 16px;
  border-left: none;
  border-bottom: none;
}

/* 标题区域 */
.header {
  margin-bottom: 24px;
}

.title {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 28px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.meta-row {
  display: flex;
  gap: 20px;
  margin-bottom: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7c72;
  font-size: 14px;
}

.meta-icon {
  width: 18px;
  height: 18px;
  color: #5a7c6f;
}

/* 标签行 */
.rating-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.hot-tag {
  background: linear-gradient(135deg, #fef3e2 0%, #fde8c8 100%);
  color: #c67b5c;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid rgba(198, 123, 92, 0.2);
}

/* 描述 */
.description {
  padding: 20px 0;
  border-bottom: 1px solid rgba(90, 124, 111, 0.15);
}

.description p {
  margin: 0;
  color: #4a5a51;
  line-height: 1.8;
  font-size: 15px;
}

/* 区块 */
.section {
  padding: 24px 0;
  border-bottom: 1px solid rgba(90, 124, 111, 0.15);
}

.section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 18px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
}

/* 景点列表 */
.spots-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  border: 1px solid rgba(90, 124, 111, 0.1);
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.spot-item:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, #ebe5dc 0%, #e0d5cc 100%);
}

.step-num {
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 100%);
  color: #fff7ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.25);
  flex-shrink: 0;
}

.spot-content {
  flex: 1;
}

.spot-content h4 {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 16px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0 0 6px 0;
}

.spot-content p {
  margin: 0;
  font-size: 13px;
  color: #6b7c72;
  line-height: 1.5;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #6b7c72;
  flex-shrink: 0;
}

/* 建议 */
.suggestion {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  padding: 18px 20px;
  border-radius: 18px;
  border: 1px solid rgba(90, 124, 111, 0.1);
}

.suggestion p {
  margin: 0;
  color: #4a5a51;
  line-height: 1.8;
  font-size: 14px;
}

/* 相关推荐列表 */
.related-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  border: 1px solid rgba(90, 124, 111, 0.1);
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.related-item:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, #ebe5dc 0%, #e0d5cc 100%);
}

.related-content {
  flex: 1;
}

.related-content h4 {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 16px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0 0 6px 0;
}

.related-content p {
  margin: 0;
  font-size: 13px;
  color: #6b7c72;
  line-height: 1.5;
}

/* 加入行程按钮区域 */
.action-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(90, 124, 111, 0.15);
}

.add-trip-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
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
}

.add-trip-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.25);
}

.add-trip-btn.added {
  background: linear-gradient(135deg, #d4a574 0%, #c8953d 100%);
  box-shadow: 0 8px 20px rgba(212, 165, 116, 0.3);
}

.add-trip-btn.added:active {
  box-shadow: 0 4px 12px rgba(212, 165, 116, 0.25);
}

.btn-icon {
  width: 22px;
  height: 22px;
  stroke-width: 2.5;
}

/* 自定义 Toast 样式 */
:deep(.custom-toast) {
  background: rgba(45, 62, 53, 0.95) !important;
  color: #fff7ed !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  padding: 12px 24px !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

:deep(.custom-toast .van-toast__text) {
  color: #fff7ed !important;
}
</style>
