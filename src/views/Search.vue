<template>
  <div class="search-page">
    <van-nav-bar title="景区搜索" left-arrow @click-left="goBack" fixed placeholder />

    <div class="content">
      <!-- 搜索框 - 优化版 -->
      <div class="search-section">
        <div class="search-input-wrapper">
          <van-icon name="search" size="20" color="var(--pine)" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索景点、路线、美食..."
            class="search-input"
            @input="handleSearch"
          />
          <van-icon
            v-if="searchQuery"
            name="clear"
            size="16"
            color="var(--text-soft)"
            class="cursor-pointer"
            @click="searchQuery = ''"
          />
        </div>

        <div class="hot-tags">
          <span class="tags-label">热门搜索</span>
          <div class="tags-list">
            <span
              v-for="tag in hotTags"
              :key="tag"
              class="tag-chip cursor-pointer"
              @click="searchTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- 筛选标签 - 优化版 -->
      <div class="filter-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.value"
          class="filter-tab cursor-pointer"
          :class="{ active: activeFilter === tab.value }"
          @click="activeFilter = tab.value"
        >
          <span class="tab-label">{{ tab.label }}</span>
          <span class="tab-count">{{ getCount(tab.value) }}</span>
        </div>
      </div>

      <!-- 热度排行 - 优化版 -->
      <div class="ranking-section" v-if="activeFilter === 'spot' && !searchQuery">
        <div class="section-header">
          <h2>热度排行</h2>
          <span class="section-subtitle">实时更新</span>
        </div>

        <!-- Top 1 大卡片 -->
        <div class="featured-card cursor-pointer" @click="goTo('/spot/spot-lake')">
          <div class="featured-badge">
            <span class="badge-rank">Top 1</span>
            <span class="badge-trend">↑ 18%</span>
          </div>
          <div class="featured-content">
            <h3>半山镜湖</h3>
            <p>拍照热度最高，首次到景区的游客最常搜，也最适合作为搜索入口的第一推荐。</p>
            <div class="featured-tags">
              <span class="mini-tag">首访必看</span>
              <span class="mini-tag">拍照强</span>
            </div>
          </div>
          <div class="featured-decoration"></div>
        </div>

        <!-- Top 2-3 列表 -->
        <div class="ranking-list">
          <div
            v-for="(item, index) in topSpots"
            :key="item.id"
            class="ranking-item cursor-pointer"
            @click="goTo(item.path)"
          >
            <div class="rank-number" :class="{ 'rank-hot': index === 0 }">
              {{ index + 2 }}
            </div>
            <div class="ranking-info">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
            <van-icon name="arrow" size="16" color="var(--text-soft)" />
          </div>
        </div>
      </div>

      <!-- 搜索结果 - 优化版 -->
      <div class="result-section" v-if="searchQuery || activeFilter !== 'spot'">
        <div class="section-header">
          <h2>{{ searchQuery ? '搜索结果' : '全部' + getTabLabel(activeFilter) }}</h2>
          <span class="section-subtitle">{{ results.length }} 条</span>
        </div>

        <van-empty v-if="results.length === 0" description="没有找到相关内容" />

        <div v-else class="result-grid">
          <div
            v-for="item in results"
            :key="item.targetId"
            class="result-card cursor-pointer"
            @click="goToDetail(item)"
          >
            <div class="result-icon" :class="`icon-${item.kind}`">
              <van-icon :name="getKindIcon(item.kind)" size="24" />
            </div>
            <div class="result-info">
              <div class="result-header">
                <h4>{{ item.title }}</h4>
                <span class="result-type">{{ getKindLabel(item.kind) }}</span>
              </div>
              <p>{{ item.desc }}</p>
            </div>
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
const activeFilter = ref('spot')

const hotTags = ['半山镜湖', '最省时间路线', '镜湖边小馆']

const tabs = [
  { label: '景点', value: 'spot' },
  { label: '路线', value: 'route' },
  { label: '美食', value: 'food' }
]

const topSpots = [
  {
    id: 2,
    path: '/spot/spot-cloud',
    title: '云顶观景台',
    desc: '经典全景点 / 日出时段热度高'
  },
  {
    id: 3,
    path: '/spot/spot-valley',
    title: '山谷剧场',
    desc: '巡游终点 / 热门路线尾段常见'
  }
]

const results = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return searchCatalog
    .filter(item => item.kind === activeFilter.value)
    .filter(item => {
      if (!query) return true
      const searchable = [item.title, item.meta, item.desc, ...item.terms].join(' ').toLowerCase()
      return searchable.includes(query)
    })
})

function getCount(kind) {
  return searchCatalog.filter(item => item.kind === kind).length
}

function getTabLabel(kind) {
  const labels = { route: '路线', spot: '景点', food: '美食' }
  return labels[kind] || ''
}

function goBack() {
  router.back()
}

function goTo(path) {
  router.push(path)
}

function handleSearch() {
  // 搜索逻辑已在 computed 中处理
}

function searchTag(tag) {
  searchQuery.value = tag
}

function getKindLabel(kind) {
  const labels = { route: '路线', spot: '景点', food: '美食' }
  return labels[kind] || '其他'
}

function getKindIcon(kind) {
  const icons = { route: 'guide-o', spot: 'location-o', food: 'shop-o' }
  return icons[kind] || 'star-o'
}

function getBadgeColor(kind) {
  const colors = {
    route: 'var(--color-primary)',
    spot: 'var(--color-secondary)',
    food: 'var(--color-cta)'
  }
  return colors[kind] || 'var(--color-text-light)'
}

function goToDetail(item) {
  const paths = {
    route: `/route/${item.targetId}`,
    spot: `/spot/${item.targetId}`,
    food: `/food/${item.targetId}`
  }
  router.push(paths[item.kind] || '/home')
}

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: var(--paper-white);
  padding-bottom: 60px;
  position: relative;
}

.content {
  padding: var(--space-md);
  position: relative;
  z-index: 1;
}

/* 搜索区域 - 宣纸质感 */
.search-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--ink-wash);
  position: relative;
}

.search-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.3;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--paper-cream);
  border: 2px solid var(--ink-wash);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.search-input-wrapper:focus-within {
  border-color: var(--jade-green);
  box-shadow: 0 0 0 3px var(--jade-light);
  background: white;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: var(--text-primary);
  background: transparent;
  font-family: var(--font-sans);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

/* 热门标签 - 印章风格 */
.hot-tags {
  margin-top: var(--space-md);
}

.tags-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
  display: block;
  font-family: var(--font-serif);
}

.tags-list {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.tag-chip {
  padding: 6px 14px;
  background: var(--jade-light);
  color: var(--jade-green);
  border-radius: var(--radius-round);
  font-size: 13px;
  font-weight: 500;
  transition: all var(--transition-base);
  border: 1px solid transparent;
}

.tag-chip:active {
  transform: scale(0.95);
  background: var(--jade-green);
  color: white;
  border-color: var(--mountain-green);
}

/* 筛选标签 - 竹简风格 */
.filter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: var(--space-xl);
  padding: 4px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--ink-wash);
}

.filter-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.filter-tab.active {
  background: var(--jade-green);
  box-shadow: var(--shadow-md);
}

.tab-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  transition: color var(--transition-fast);
  font-family: var(--font-serif);
}

.filter-tab.active .tab-label {
  color: white;
}

.tab-count {
  font-size: 12px;
  color: var(--text-tertiary);
  transition: color var(--transition-fast);
}

.filter-tab.active .tab-count {
  color: rgba(255, 255, 255, 0.85);
}

/* 区块标题 - 书法风格 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.section-header h2 {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--ink-black);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.section-subtitle {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 热度排行 */
.ranking-section {
  margin-bottom: var(--space-2xl);
}

/* Top 1 大卡片 - 水墨渐变 */
.featured-card {
  position: relative;
  padding: var(--space-xl);
  background: linear-gradient(135deg, var(--jade-green) 0%, var(--mountain-green) 100%);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
}

.featured-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-md);
}

.featured-badge {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: 12px;
}

.badge-rank {
  padding: 4px 12px;
  background: var(--cinnabar);
  color: var(--paper-white);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-serif);
  box-shadow: 0 2px 8px var(--cinnabar-light);
}

.badge-trend {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.featured-content h3 {
  font-family: var(--font-serif);
  font-size: 22px;
  color: white;
  margin-bottom: var(--space-sm);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.featured-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.6;
  margin-bottom: 12px;
}

.featured-tags {
  display: flex;
  gap: var(--space-sm);
}

.mini-tag {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.featured-decoration {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
  border-radius: 50%;
}

/* 排行列表 - 宣纸卡片 */
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.ranking-item:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-md);
}

.rank-number {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper-aged);
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-secondary);
  font-family: var(--font-serif);
}

.rank-number.rank-hot {
  background: linear-gradient(135deg, var(--gold) 0%, var(--cinnabar) 100%);
  color: white;
  box-shadow: 0 4px 12px var(--gold-light);
}

.ranking-info {
  flex: 1;
}

.ranking-info h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  font-family: var(--font-serif);
}

.ranking-info p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* 搜索结果网格 */
.result-section {
  margin-bottom: var(--space-2xl);
}

.result-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-card {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.result-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-md);
}

.result-icon {
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: white;
}

.result-icon.icon-spot {
  background: linear-gradient(135deg, var(--jade-green) 0%, var(--mountain-green) 100%);
}

.result-icon.icon-route {
  background: linear-gradient(135deg, var(--gold) 0%, var(--sky-blue) 100%);
}

.result-icon.icon-food {
  background: linear-gradient(135deg, var(--cinnabar) 0%, var(--vermillion) 100%);
}

.result-info {
  flex: 1;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  gap: var(--space-sm);
}

.result-info h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  font-family: var(--font-serif);
}

.result-type {
  padding: 2px 8px;
  background: var(--jade-light);
  color: var(--jade-green);
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.result-info p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
