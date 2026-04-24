<template>
  <div class="route-detail">
    <!-- 头部区域 -->
    <div class="header-section">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 class="page-title">{{ routeData.title }}</h1>
    </div>

    <div class="content">
      <!-- 路线概览 -->
      <div class="route-summary">
        <div class="summary-header">
          <van-tag type="warning" size="large">{{ routeData.duration }}</van-tag>
          <van-tag type="success">{{ routeData.tag }}</van-tag>
        </div>
        <p class="summary-desc">{{ routeData.desc }}</p>
      </div>

      <!-- 加入行程按钮 -->
      <div class="action-bar">
        <PaperButton
          block
          :type="isAdded ? 'default' : 'primary'"
          @click="handleAddTrip"
        >
          {{ isAdded ? '已加入，去查看' : '加入我的行程' }}
        </PaperButton>
      </div>

      <!-- 路线时间轴 -->
      <van-cell-group inset title="路线详情">
        <van-steps direction="vertical" :active="routeData.spots.length">
          <van-step v-for="(spot, index) in routeData.spots" :key="index">
            <template #inactive-icon>
              <div class="step-num">{{ String(index + 1).padStart(2, '0') }}</div>
            </template>
            <van-cell
              :title="spot.title"
              :label="spot.desc"
              is-link
              @click="goTo(`/spot/${spot.id}`)"
            />
          </van-step>
        </van-steps>
      </van-cell-group>

      <!-- 路线价值 -->
      <van-notice-bar
        left-icon="info-o"
        :text="routeData.value"
        background="#fff7cc"
        color="#ed6a0c"
      />

      <!-- 推荐景点 -->
      <van-cell-group inset title="推荐景点">
        <van-cell
          v-for="spot in routeData.recommendSpots"
          :key="spot.id"
          :title="spot.title"
          :label="spot.desc"
          is-link
          @click="goTo(`/spot/${spot.id}`)"
        />
      </van-cell-group>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <PaperButton block type="primary" @click="goTo(`/spot/${routeData.spots[0].id}`)">
          按这条路线开始逛
        </PaperButton>
        <PaperButton block plain @click="goTo('/search')">
          查看更多路线
        </PaperButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { tripStore } from '../stores/trip'
import PaperButton from '../components/PaperButton.vue'

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
    showToast('已加入行程')
  }
}
</script>

<style scoped>
.route-detail {
  background: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* 头部区域 */
.header-section {
  position: relative;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 50%, #8fb5a8 100%);
  padding: 16px;
  padding-top: 16px;
  padding-bottom: 20px;
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.2);
}

.back-btn {
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
  margin-bottom: 12px;
}

.back-btn:active {
  transform: scale(0.95);
  background: rgba(255, 247, 237, 1);
}

.back-btn .icon {
  width: 24px;
  height: 24px;
  color: #2d3e35;
}

.page-title {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 22px;
  font-weight: 600;
  color: #fff7ed;
  margin: 0;
  letter-spacing: 0.5px;
}

.content {
  padding: 16px;
}

/* 纸质感路线概览卡片 */
.route-summary {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border-radius: 26px;
  padding: 28px 24px;
  margin-bottom: 16px;
  box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(90, 124, 111, 0.1);
  position: relative;
}

/* 装饰性边角 */
.route-summary::before,
.route-summary::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #d4a574;
  opacity: 0.3;
}

.route-summary::before {
  top: 12px;
  left: 12px;
  border-right: none;
  border-bottom: none;
}

.route-summary::after {
  bottom: 12px;
  right: 12px;
  border-left: none;
  border-top: none;
}

.summary-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.summary-desc {
  color: #4a5a51;
  line-height: 1.7;
  margin: 0;
  font-size: 15px;
}

.action-bar {
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

/* 自定义步骤数字 */
.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 100%);
  color: #fff7ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.25);
}

/* 覆盖 Vant 组件样式 */
:deep(.van-cell-group) {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border-radius: 26px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15);
  border: 1px solid rgba(90, 124, 111, 0.1);
}

:deep(.van-cell-group__title) {
  padding: 20px 24px 12px;
  color: #2d3e35;
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 18px;
  font-weight: 600;
  background: transparent;
}

:deep(.van-cell) {
  background: transparent;
  color: #4a5a51;
}

:deep(.van-cell__title) {
  color: #2d3e35;
  font-weight: 500;
}

:deep(.van-cell__label) {
  color: #6b7c72;
}

:deep(.van-notice-bar) {
  border-radius: 16px;
  margin: 16px 0;
}

:deep(.van-tag) {
  border-radius: 12px;
  padding: 6px 14px;
  font-size: 13px;
}

:deep(.van-steps--vertical) {
  padding: 12px 0;
}
</style>
