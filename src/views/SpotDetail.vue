<template>
  <div class="spot-detail">
    <!-- 头图区域 -->
    <div class="hero-section" :style="{ background: spotData.bgColor }">
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
        <h1 class="title">{{ spotData.title }}</h1>

        <div class="meta-row">
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="meta-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>景区中心</span>
          </div>
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="meta-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>建议{{ spotData.duration }}</span>
          </div>
        </div>

        <!-- 评分和标签 -->
        <div class="rating-row">
          <div class="rating">
            <span class="star">⭐</span>
            <span class="score">{{ spotData.rating }}</span>
            <span class="reviews">{{ spotData.reviews }}评价</span>
          </div>
          <span class="hot-tag">{{ spotData.tag }}</span>
        </div>
      </div>

      <!-- 描述 -->
      <div class="description">
        <p>{{ spotData.subtitle }}</p>
      </div>

      <!-- 游玩亮点 -->
      <div class="section">
        <h3 class="section-title">游玩亮点</h3>
        <div class="highlights">
          <div class="highlight-item" v-for="(highlight, index) in spotData.highlights" :key="index">
            {{ highlight }}
          </div>
        </div>
      </div>

      <!-- 游玩建议 -->
      <div class="section">
        <h3 class="section-title">游玩建议</h3>
        <div class="suggestion">
          <p>{{ spotData.suggestion }}</p>
        </div>
      </div>
    </div>

    <!-- 底部固定按钮 -->
    <div class="bottom-bar">
      <button class="avatar-btn">N</button>
      <button class="add-btn" @click="handleAddTrip">
        {{ isAdded ? '已加入行程' : '加入我的行程' }}
      </button>
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
const spotId = route.params.id

const spotDataMap = {
  'spot-lake': {
    title: '半山镜湖',
    tag: '🔥 热门',
    subtitle: '湖面平静的时候，倒影最容易出片，也是游客搜索最多的点位。',
    bgColor: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    duration: '25分钟',
    rating: '4.8',
    reviews: '1.2k',
    highlights: ['📸 最佳拍照点', '🌊 湖面倒影', '🎯 热搜第1'],
    suggestion: '建议上午9-11点前往，此时光线最佳，湖面平静，倒影清晰。适合中段停留和拍照，也适合被系统优先推荐给第一次来的游客。',
    relatedRoutes: [
      { id: 'route-hot', title: '热门必打卡路线', desc: '包含半山镜湖 / 覆盖更多高热度景点' }
    ]
  },
  'spot-cloud': {
    title: '云顶观景台',
    tag: '🌟 经典',
    subtitle: '站上去先看完整景区轮廓，能更快理解后面的游玩顺序。',
    bgColor: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    duration: '20分钟',
    rating: '4.7',
    reviews: '856',
    highlights: ['🏔️ 全景视野', '🗺️ 路线起点', '☀️ 日出推荐'],
    suggestion: '适合作为第一站。先把全景看清楚，游客后续在镜湖、长廊和剧场之间切换时，会更容易理解整体路线，不容易迷糊。',
    relatedRoutes: [
      { id: 'route-fast', title: '2 小时最省时间路线', desc: '以云顶观景台开场 / 适合第一次来景区' }
    ]
  },
  'spot-valley': {
    title: '山谷剧场',
    tag: '🎭 活动',
    subtitle: '热门路线的尾段重点，适合看演出、休息和结束当天游玩。',
    bgColor: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    duration: '30分钟',
    rating: '4.6',
    reviews: '643',
    highlights: ['🎪 演出活动', '🎵 音乐表演', '🌙 夜景推荐'],
    suggestion: '这里是很多游客结束路线前的最后一站，既能补活动体验，也能作为休息和拍照的收尾点，适合放在线路尾段。',
    relatedRoutes: [
      { id: 'route-hot', title: '热门必打卡路线', desc: '包含山谷剧场 / 适合游玩收尾和看活动' }
    ]
  },
  'spot-corridor': {
    title: '林间长廊',
    tag: '🌿 休闲',
    subtitle: '树影和步道的节奏很舒服，适合在热门景点之间做一段缓冲。',
    bgColor: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    duration: '15-18分钟',
    rating: '4.5',
    reviews: '432',
    highlights: ['🌳 林荫步道', '🚶 轻松漫步', '🍃 清新空气'],
    suggestion: '这段位置不是景区里最炸眼的点，但它能把观景和拍照动线衔接得更自然，适合让游客走得不那么赶，也更容易保持游玩节奏。',
    relatedRoutes: [
      { id: 'route-fast', title: '2 小时最省时间路线', desc: '把它作为镜湖和剧场之间的缓冲段，更轻松。' },
      { id: 'route-hot', title: '热门必打卡路线', desc: '适合在高热度点位之间调节节奏，避免太赶。' }
    ]
  },
  'spot-meadow': {
    title: '花谷草坪',
    tag: '🌸 休憩',
    subtitle: '适合在热门路线尾段停下休息，也适合拍一些更轻松的氛围照片。',
    bgColor: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    duration: '20分钟',
    rating: '4.7',
    reviews: '521',
    highlights: ['🌺 花海美景', '🧘 休息放松', '📷 氛围照片'],
    suggestion: '如果游客不想在热门路线结束时直接撤离，这里是很合适的收尾点。空间开阔、节奏慢，能把整条路线的体验收得更平稳。',
    relatedRoutes: [
      { id: 'route-hot', title: '热门必打卡路线', desc: '把花谷草坪作为最后一站，更适合慢慢结束当天游玩。' }
    ]
  }
}

const spotData = spotDataMap[spotId] || spotDataMap['spot-lake']

const isAdded = computed(() => {
  return tripStore.isItemAdded('spot', spotId)
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

  const success = tripStore.addItem('spot', {
    title: spotData.title,
    meta: `${spotData.tag} / 推荐停留 ${spotData.duration}`,
    targetId: spotId
  })

  if (success) {
    showToast('已加入行程')
  }
}
</script>

<style scoped>
.spot-detail {
  background: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* 头图区域 - 中国风渐变 */
.hero-section {
  height: 280px;
  position: relative;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 50%, #8fb5a8 100%);
  border-radius: 0 0 26px 26px;
  box-shadow: 0 8px 24px rgba(90, 124, 111, 0.2);
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
  border-radius: 26px;
  margin: -50px 16px 16px;
  padding: 28px 24px;
  box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(90, 124, 111, 0.1);
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
  top: 12px;
  left: 12px;
  border-right: none;
  border-bottom: none;
}

.content-card::after {
  bottom: 12px;
  right: 12px;
  border-left: none;
  border-top: none;
}

/* 标题区域 */
.header {
  margin-bottom: 20px;
}

.title {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 26px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0 0 14px 0;
  letter-spacing: 0.5px;
}

.meta-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7c72;
  font-size: 14px;
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: #5a7c6f;
}

/* 评分行 */
.rating-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.star {
  font-size: 18px;
}

.score {
  font-size: 16px;
  font-weight: 600;
  color: #2d3e35;
}

.reviews {
  font-size: 14px;
  color: #6b7c72;
}

.hot-tag {
  background: linear-gradient(135deg, #fef3e2 0%, #fde8c8 100%);
  color: #c67b5c;
  padding: 5px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid rgba(198, 123, 92, 0.2);
}

/* 描述 */
.description {
  padding: 18px 0;
  border-bottom: 1px solid rgba(90, 124, 111, 0.15);
}

.description p {
  margin: 0;
  color: #4a5a51;
  line-height: 1.7;
  font-size: 15px;
}

/* 区块 */
.section {
  padding: 22px 0;
  border-bottom: 1px solid rgba(90, 124, 111, 0.15);
}

.section:last-child {
  border-bottom: none;
}

.section-title {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 17px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0 0 14px 0;
  letter-spacing: 0.5px;
}

/* 亮点 */
.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.highlight-item {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  color: #4a5a51;
  padding: 9px 16px;
  border-radius: 18px;
  font-size: 14px;
  border: 1px solid rgba(90, 124, 111, 0.15);
  box-shadow: 0 2px 6px rgba(90, 124, 111, 0.08);
}

/* 建议 */
.suggestion p {
  margin: 0;
  color: #5a6b62;
  line-height: 1.8;
  font-size: 14px;
}

/* 底部固定栏 - 中国风 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  padding: 12px 16px;
  box-shadow: 0 -4px 16px rgba(90, 124, 111, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 100;
  border-top: 1px solid rgba(90, 124, 111, 0.1);
}

.avatar-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 100%);
  color: #fff7ed;
  border: 2px solid rgba(255, 247, 237, 0.3);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.25);
}

.add-btn {
  flex: 1;
  height: 44px;
  background: linear-gradient(135deg, #c67b5c 0%, #b86f4d 100%);
  color: #fff7ed;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(198, 123, 92, 0.3);
}

.add-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style>
