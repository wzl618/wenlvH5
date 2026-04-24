<template>
  <div class="food-detail">
    <!-- 头图区域 -->
    <div class="hero-section" :style="{ background: foodData.bgColor }">
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
        <h1 class="title">{{ foodData.title }}</h1>

        <div class="meta-row">
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="meta-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>景区周边</span>
          </div>
          <div class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="meta-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>{{ foodData.feature2 }}</span>
          </div>
        </div>

        <!-- 评分和标签 -->
        <div class="rating-row">
          <div class="rating">
            <span class="star">⭐</span>
            <span class="score">4.7</span>
            <span class="reviews">856评价</span>
          </div>
          <span class="hot-tag">{{ foodData.feature1 }}</span>
        </div>
      </div>

      <!-- 描述 -->
      <div class="description">
        <p>{{ foodData.desc }}</p>
      </div>

      <!-- 美食特色 -->
      <div class="section">
        <h3 class="section-title">美食特色</h3>
        <div class="highlights">
          <div class="highlight-item">{{ foodData.feature1 }}</div>
          <div class="highlight-item">{{ foodData.feature2 }}</div>
          <div class="highlight-item">{{ foodData.feature3 }}</div>
        </div>
      </div>

      <!-- 推荐理由 -->
      <div class="section">
        <h3 class="section-title">推荐理由</h3>
        <div class="suggestion">
          <p>{{ foodData.reason }}</p>
        </div>
      </div>

      <!-- 相关推荐 -->
      <div class="section" v-if="foodData.related.length > 0">
        <h3 class="section-title">相关推荐</h3>
        <div class="related-list">
          <div
            v-for="item in foodData.related"
            :key="item.id"
            class="related-item"
            @click="goTo(item.path)"
          >
            <div class="related-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
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
const foodId = route.params.id

const foodDataMap = {
  'food-fish': {
    title: '山溪豆花鱼',
    desc: '景区周边人气最高的本地招牌之一，鱼肉嫩、豆花顺口，适合游玩结束后想吃一顿热的、满足感强的游客。',
    bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    feature1: '鲜辣暖胃',
    label1: '口味特点',
    feature2: '2-3 人',
    label2: '推荐人数',
    feature3: '路线收尾',
    label3: '适合场景',
    reason: '如果游客走的是热门路线或镜湖附近路线，这道菜很适合做"景区游玩结束后的正餐推荐"，服务链路会更顺。',
    related: [
      { id: 'food-rice', title: '石锅笋饭', desc: '更稳妥的大众口味，适合作为替代推荐。', path: '/food/food-rice' },
      { id: 'food-list', title: '当地美食总览', desc: '继续查看路线结束点附近的更多本地菜。', path: '/food' }
    ]
  },
  'food-rice': {
    title: '石锅笋饭',
    desc: '当地特色主食，饱腹感强，口味稳定，适合不想吃太重口但希望吃得踏实一些的游客。',
    bgColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    feature1: '本地特色',
    label1: '菜品属性',
    feature2: '轻松收尾',
    label2: '适合场景',
    feature3: '稳妥不踩雷',
    label3: '推荐理由',
    reason: '如果游客更看重"本地特色 + 稳定体验"，这道适合放进景区的常规推荐列表，作为更大众的一档美食选项。',
    related: [
      { id: 'food-fish', title: '山溪豆花鱼', desc: '更有招牌感，适合想吃得更有记忆点的游客。', path: '/food/food-fish' },
      { id: 'food-list', title: '当地美食总览', desc: '继续查看更多适合路线收尾的本地推荐。', path: '/food' }
    ]
  },
  'food-ricewine': {
    title: '云顶米酿',
    desc: '这类更像景区里的轻甜小食，适合拍照后短暂停留，不需要正式坐下来吃饭的时候使用。',
    bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    feature1: '甜口轻饮',
    label1: '口味特点',
    feature2: '拍照后休息',
    label2: '适合场景',
    feature3: '轻度消费',
    label3: '消费定位',
    reason: '可以和镜湖、观景台这类拍照点组合成"游玩 + 小吃"轻度路线。',
    related: [
      { id: 'food-fish', title: '山溪豆花鱼', desc: '如果你想从轻饮切换到正餐，可以继续看这道招牌菜。', path: '/food/food-fish' },
      { id: 'food-list', title: '当地美食总览', desc: '继续浏览其他适合不同场景的本地推荐。', path: '/food' }
    ]
  },
  'food-inn': {
    title: '镜湖边小馆',
    desc: '这是更偏餐馆型的推荐点，适合游客在看完镜湖后就近休息用餐，不需要再额外绕去景区外搜地方吃饭。',
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    feature1: '步行可达',
    label1: '位置特点',
    feature2: '景观餐叙',
    label2: '推荐场景',
    feature3: '镜湖附近',
    label3: '关联点位',
    reason: '看完镜湖后可以直接就近用餐，适合作为景点浏览后的轻松衔接。',
    related: [
      { id: 'food-fish', title: '山溪豆花鱼', desc: '如果你想吃得更有招牌感，可以继续看这道本地菜。', path: '/food/food-fish' },
      { id: 'spot-lake', title: '半山镜湖', desc: '回到镜湖详情，继续看景点和路线关联。', path: '/spot/spot-lake' }
    ]
  }
}

const foodData = foodDataMap[foodId] || foodDataMap['food-fish']

const isAdded = computed(() => {
  return tripStore.isItemAdded('food', foodId)
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

  const success = tripStore.addItem('food', {
    title: foodData.title,
    meta: `${foodData.feature1} / ${foodData.feature2} / ${foodData.feature3}`,
    targetId: foodId
  })

  if (success) {
    showToast('已加入行程')
  }
}
</script>

<style scoped>
.food-detail {
  background: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 24px;
}

/* 头图区域 - 中国风渐变 */
.hero-section {
  height: 320px;
  position: relative;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 50%, #8fb5a8 100%);
  border-radius: 0 0 32px 32px;
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

/* 评分行 */
.rating-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.star {
  font-size: 20px;
}

.score {
  font-size: 18px;
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

/* 亮点 */
.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.highlight-item {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  color: #4a5a51;
  padding: 10px 18px;
  border-radius: 18px;
  font-size: 14px;
  border: 1px solid rgba(90, 124, 111, 0.15);
  box-shadow: 0 2px 6px rgba(90, 124, 111, 0.08);
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

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #6b7c72;
  flex-shrink: 0;
}
</style>
