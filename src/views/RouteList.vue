<template>
  <div class="route-list">
    <!-- 头部区域 -->
    <div class="header-section">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 class="page-title">推荐路线</h1>
    </div>

    <div class="content">
      <!-- 路线推荐策略 -->
      <div class="info-banner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="info-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p>优先串起热搜前列的经典点位，适合首次来访的游客。</p>
      </div>

      <!-- 路线分类标签 -->
      <div class="category-tabs">
        <div class="category-tab active">
          <span>全部路线</span>
          <span class="tab-badge">2</span>
        </div>
      </div>

      <!-- 路线网格 -->
      <div class="route-grid">
        <!-- 大卡片 - 推荐路线 -->
        <div class="route-card featured cursor-pointer" @click="goTo('/route/route-fast')">
          <div class="route-image route-img-fast">
            <div class="featured-badge">推荐路线</div>
          </div>
          <div class="route-content">
            <div class="route-header">
              <h3>2小时最省时间路线</h3>
              <span class="route-duration">120分钟</span>
            </div>
            <div class="route-tags">
              <span class="tag">热搜覆盖高</span>
              <span class="tag">4个点位</span>
              <span class="tag hot">首访推荐</span>
            </div>
            <p class="route-desc">这条路线优先串起热搜前列的经典点位，先看代表景观，再收在休息和拍照体验更好的区域。</p>
          </div>
        </div>

        <!-- 普通卡片 -->
        <div class="route-card cursor-pointer" @click="goTo('/route/route-hot')">
          <div class="route-image route-img-hot">
            <div class="route-icon">🔥</div>
          </div>
          <div class="route-content">
            <h3>热门必打卡路线</h3>
            <div class="route-tags">
              <span class="tag">热门优先</span>
              <span class="tag">5个点位</span>
            </div>
            <p class="route-desc">专门覆盖游客搜索热度最高、拍照反馈最好的经典点位。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchCatalog } from '../data/catalog'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')

// 从路由参数获取搜索关键词
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})

// 过滤路线列表
const routes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const allRoutes = searchCatalog.filter(item => item.kind === 'route')

  if (!query) return allRoutes

  return allRoutes.filter(item => {
    const searchable = [item.title, item.meta, item.desc, ...item.terms].join(' ').toLowerCase()
    return searchable.includes(query)
  })
})

function goBack() {
  router.back()
}

function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.route-list {
  padding-bottom: 16px;
  background: #f5f0e8;
  min-height: 100vh;
}

/* 头部区域 */
.header-section {
  position: relative;
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 50%, #8fb5a8 100%);
  padding: 16px;
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
  stroke-width: 2.5;
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
  padding-top: 16px;
}

/* 信息横幅 - 纸质感 */
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 18px 20px;
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border: 1px solid rgba(90, 124, 111, 0.1);
  border-radius: 18px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.1);
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #d4a574;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-banner p {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #4a5a51;
  line-height: 1.6;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border: 1px solid rgba(90, 124, 111, 0.15);
  border-radius: 18px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5a51;
  transition: all 200ms ease;
  box-shadow: 0 2px 6px rgba(90, 124, 111, 0.08);
}

.category-tab.active {
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 100%);
  color: #fff7ed;
  border-color: #5a7c6f;
  box-shadow: 0 4px 12px rgba(90, 124, 111, 0.25);
}

.tab-badge {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  font-size: 12px;
}

/* 路线网格 */
.route-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

/* 路线卡片 - 纸质感 */
.route-card {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border: 1px solid rgba(90, 124, 111, 0.1);
  border-radius: 26px;
  overflow: hidden;
  transition: all 200ms ease;
  box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
}

.route-card:active {
  transform: scale(0.98);
}

.route-card.featured {
  grid-column: 1 / -1;
}

/* 装饰性边角 - 仅特色卡片 */
.route-card.featured::before,
.route-card.featured::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid #d4a574;
  opacity: 0.3;
  z-index: 1;
}

.route-card.featured::before {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.route-card.featured::after {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

/* 路线图片 */
.route-image {
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.route-card.featured .route-image {
  height: 180px;
}

.route-img-fast {
  background: linear-gradient(135deg, #d4a574 0%, #c8953d 100%);
}

.route-img-hot {
  background: linear-gradient(135deg, #c67b5c 0%, #b86f4d 100%);
}

.featured-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 14px;
  background: rgba(255, 247, 237, 0.95);
  backdrop-filter: blur(10px);
  color: #c67b5c;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(198, 123, 92, 0.2);
}

.route-icon {
  font-size: 48px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* 路线内容 */
.route-content {
  padding: 18px;
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 8px;
}

.route-content h3 {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 17px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0;
  letter-spacing: 0.5px;
  flex: 1;
}

.route-duration {
  font-size: 13px;
  font-weight: 600;
  color: #d4a574;
  white-space: nowrap;
}

.route-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  padding: 5px 12px;
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  color: #5a7c6f;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid rgba(90, 124, 111, 0.15);
}

.tag.hot {
  background: linear-gradient(135deg, #c67b5c 0%, #b86f4d 100%);
  color: #fff7ed;
  border-color: #c67b5c;
}

.route-desc {
  margin: 0;
  font-size: 14px;
  color: #6b7c72;
  line-height: 1.6;
}
</style>
