<template>
  <div class="home-page">
    <!-- 山峦装饰背景 -->
    <div class="mountain-decoration"></div>

    <!-- 顶部标题 - 书法风格 -->
    <div class="page-header">
      <div class="header-ornament">
        <div class="cloud-left"></div>
        <div class="cloud-right"></div>
      </div>
      <h1 class="page-title">
        <span class="title-main">山水游记</span>
        <span class="title-seal">景区导览</span>
      </h1>
      <p class="page-subtitle">寻幽探胜 · 诗意山水</p>
    </div>

    <!-- 搜索卡片 - 宣纸质感 -->
    <div class="search-card cursor-pointer" @click="goTo('/search')">
      <div class="search-icon-wrapper">
        <van-icon name="search" size="20" color="var(--jade-green)" />
      </div>
      <span class="search-placeholder">搜景点、寻路线、品美食...</span>
      <div class="search-decoration"></div>
    </div>

    <!-- 快捷入口 - 四象布局 -->
    <div class="quick-actions">
      <div class="action-item cursor-pointer" @click="goTo('/search')" style="animation-delay: 0.1s">
        <div class="action-icon jade">
          <van-icon name="location-o" size="24" color="var(--jade-green)" />
        </div>
        <span class="action-label">景点</span>
        <div class="action-brush"></div>
      </div>
      <div class="action-item cursor-pointer" @click="goTo('/search')" style="animation-delay: 0.2s">
        <div class="action-icon gold">
          <van-icon name="guide-o" size="24" color="var(--gold)" />
        </div>
        <span class="action-label">路线</span>
        <div class="action-brush"></div>
      </div>
      <div class="action-item cursor-pointer" @click="goTo('/food')" style="animation-delay: 0.3s">
        <div class="action-icon cinnabar">
          <van-icon name="shop-o" size="24" color="var(--cinnabar)" />
        </div>
        <span class="action-label">美食</span>
        <div class="action-brush"></div>
      </div>
      <div class="action-item cursor-pointer" @click="goTo('/trip')" style="animation-delay: 0.4s">
        <div class="action-icon sky">
          <van-icon name="orders-o" size="24" color="var(--sky-blue)" />
        </div>
        <span class="action-label">行程</span>
        <div class="action-brush"></div>
      </div>
    </div>

    <!-- 热门景点 - 水墨卡片 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-decoration">热门</span>
          景点
        </h2>
        <span class="section-more cursor-pointer" @click="goTo('/search')">
          更多
          <van-icon name="arrow" size="14" />
        </span>
      </div>

      <div class="spot-list">
        <div
          v-for="(spot, index) in hotSpots"
          :key="spot.id"
          class="spot-card cursor-pointer ink-fade-in"
          :style="{ animationDelay: `${0.5 + index * 0.1}s` }"
          @click="goTo(spot.path)"
        >
          <div class="spot-badge seal-stamp">
            {{ spot.badge }}
          </div>
          <h3 class="spot-title">{{ spot.title }}</h3>
          <p class="spot-desc">{{ spot.desc }}</p>
          <div class="spot-meta">
            <span class="meta-item">
              <van-icon name="clock-o" size="14" />
              {{ spot.duration }}
            </span>
            <span class="meta-item">
              <van-icon name="fire-o" size="14" />
              {{ spot.rank }}
            </span>
          </div>
          <div class="card-ink-wash"></div>
        </div>
      </div>
    </div>

    <!-- 推荐路线 - 竹简风格 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-decoration">推荐</span>
          路线
        </h2>
        <span class="section-more cursor-pointer" @click="goTo('/search')">
          更多
          <van-icon name="arrow" size="14" />
        </span>
      </div>

      <div class="route-list">
        <div
          v-for="(route, index) in routes"
          :key="route.id"
          class="route-card cursor-pointer ink-fade-in"
          :style="{ animationDelay: `${0.7 + index * 0.1}s` }"
          @click="goTo(route.path)"
        >
          <div class="route-header">
            <h3 class="route-title">{{ route.title }}</h3>
            <div class="route-tag" :class="route.tagClass">
              {{ route.tag }}
            </div>
          </div>
          <p class="route-desc">{{ route.desc }}</p>
          <div class="route-footer">
            <span class="route-duration">
              <van-icon name="clock-o" size="14" />
              {{ route.duration }}
            </span>
            <van-icon name="arrow" size="16" color="var(--text-tertiary)" />
          </div>
          <div class="route-bamboo-line"></div>
        </div>
      </div>
    </div>

    <!-- 当地美食 - 圆形布局 -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-decoration">当地</span>
          美食
        </h2>
        <span class="section-more cursor-pointer" @click="goTo('/food')">
          更多
          <van-icon name="arrow" size="14" />
        </span>
      </div>

      <div class="food-grid">
        <div
          v-for="(food, index) in foods"
          :key="food.id"
          class="food-card cursor-pointer ink-fade-in"
          :style="{ animationDelay: `${0.9 + index * 0.1}s` }"
          @click="goTo(food.path)"
        >
          <div class="food-icon" :class="food.iconClass">
            {{ food.emoji }}
          </div>
          <h4 class="food-title">{{ food.title }}</h4>
          <p class="food-tag">{{ food.tag }}</p>
          <div class="food-circle-decoration"></div>
        </div>
      </div>
    </div>

    <!-- 底部导航 - 中国风 -->
    <van-tabbar route active-color="var(--cinnabar)" inactive-color="var(--text-tertiary)">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/trip" icon="orders-o">行程</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/food" icon="shop-o">美食</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const hotSpots = [
  {
    id: 'spot-lake',
    path: '/spot/spot-lake',
    badge: '热搜第1',
    title: '半山镜湖',
    desc: '适合拍照出片，第一次来景区最值得先看',
    duration: '25分钟',
    rank: 'Top 1'
  },
  {
    id: 'spot-cloud',
    path: '/spot/spot-cloud',
    badge: '经典全景',
    title: '云顶观景台',
    desc: '适合作为路线起点，先把全景看明白',
    duration: '20分钟',
    rank: 'Top 2'
  }
]

const routes = [
  {
    id: 'route-fast',
    path: '/route/route-fast',
    title: '2小时最省时间路线',
    tag: '2h',
    tagClass: 'tag-gold',
    desc: '4个点位 / 适合第一次来景区',
    duration: '120分钟'
  },
  {
    id: 'route-hot',
    path: '/route/route-hot',
    title: '热门必打卡路线',
    tag: 'Top',
    tagClass: 'tag-cinnabar',
    desc: '覆盖热搜前列点位 / 出片率高',
    duration: '150分钟'
  }
]

const foods = [
  {
    id: 'food-fish',
    path: '/food/food-fish',
    emoji: '🐟',
    iconClass: 'icon-cinnabar',
    title: '山溪豆花鱼',
    tag: '鲜辣暖胃'
  },
  {
    id: 'food-rice',
    path: '/food/food-rice',
    emoji: '🍚',
    iconClass: 'icon-gold',
    title: '石锅笋饭',
    tag: '当地特色'
  }
]

function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: var(--space-2xl) var(--space-lg) 80px;
  background: var(--paper-white);
  position: relative;
  z-index: 1;
}

/* 山峦装饰背景 */
.mountain-decoration {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40vh;
  background: linear-gradient(to top,
    var(--ink-wash) 0%,
    rgba(44, 44, 44, 0.04) 30%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 0;
}

.mountain-decoration::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background:
    radial-gradient(ellipse at 20% 100%, rgba(88, 129, 87, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(69, 123, 157, 0.06) 0%, transparent 50%);
  filter: blur(30px);
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
  position: relative;
  padding-top: var(--space-md);
}

.header-ornament {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 60px;
  pointer-events: none;
}

.cloud-left,
.cloud-right {
  position: absolute;
  width: 80px;
  height: 30px;
  background: radial-gradient(ellipse at center, var(--ink-wash) 0%, transparent 70%);
  filter: blur(8px);
  opacity: 0.4;
  animation: cloudFloat 8s ease-in-out infinite;
}

.cloud-left {
  left: 10%;
  top: 10px;
}

.cloud-right {
  right: 10%;
  top: 20px;
  animation-delay: 1s;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 2.25rem;
  color: var(--ink-deep);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.15em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.title-main {
  font-weight: 700;
  color: var(--ink-deep);
  text-shadow: 0 2px 8px rgba(44, 44, 44, 0.1);
}

.title-seal {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--paper-white);
  background: var(--cinnabar);
  padding: 4px 16px;
  border-radius: 4px;
  letter-spacing: 0.3em;
  box-shadow: 0 2px 8px rgba(200, 85, 61, 0.3);
  position: relative;
}

.title-seal::before {
  content: '';
  position: absolute;
  inset: 1px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  font-family: var(--font-serif);
}

/* 搜索卡片 */
.search-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-2xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.search-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
}

.search-decoration {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, var(--jade-light) 0%, transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}

.search-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}

.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-placeholder {
  flex: 1;
  color: var(--text-secondary);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  font-weight: 400;
}

/* 快捷入口 */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-3xl);
  padding: 0 var(--space-xs);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  transition: all var(--transition-base);
  position: relative;
  animation: inkFadeIn var(--transition-ink) ease-out backwards;
}

.action-item:active {
  transform: scale(0.92);
}

.action-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.action-icon.jade {
  background: linear-gradient(135deg, var(--jade-light) 0%, rgba(88, 129, 87, 0.08) 100%);
}

.action-icon.gold {
  background: linear-gradient(135deg, var(--gold-light) 0%, rgba(212, 165, 116, 0.1) 100%);
}

.action-icon.cinnabar {
  background: linear-gradient(135deg, var(--cinnabar-light) 0%, rgba(200, 85, 61, 0.08) 100%);
}

.action-icon.sky {
  background: linear-gradient(135deg, var(--mist-blue) 0%, rgba(69, 123, 157, 0.06) 100%);
}

.action-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
}

.action-brush {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--ink-wash), transparent);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.action-item:active .action-brush {
  opacity: 1;
}

.action-label {
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* 区块 */
.section {
  margin-bottom: var(--space-3xl);
  animation: inkFadeIn var(--transition-ink) ease-out;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding: 0 var(--space-xs);
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: var(--ink-deep);
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.title-decoration {
  display: inline-block;
  font-size: 0.65rem;
  color: var(--paper-white);
  background: var(--jade-green);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 0.2em;
}

.section-more {
  font-size: 0.875rem;
  color: var(--jade-green);
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.section-more:active {
  color: var(--mountain-green);
}

/* 景点列表 */
.spot-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.spot-card {
  padding: var(--space-xl);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.spot-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.3;
}

.card-ink-wash {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, var(--jade-light) 0%, transparent 60%);
  filter: blur(30px);
  pointer-events: none;
  opacity: 0.5;
}

.spot-card:active {
  transform: translateY(2px);
  box-shadow: var(--shadow-sm);
}

.spot-badge {
  margin-bottom: var(--space-md);
}

.spot-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.05em;
}

.spot-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.75;
}

.spot-meta {
  display: flex;
  gap: var(--space-lg);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

/* 路线列表 */
.route-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.route-card {
  padding: var(--space-xl);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.route-bamboo-line {
  position: absolute;
  left: var(--space-lg);
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent 0%,
    var(--jade-light) 20%,
    var(--jade-light) 80%,
    transparent 100%
  );
  opacity: 0.6;
}

.route-card:active {
  transform: translateY(2px);
  box-shadow: var(--shadow-sm);
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-sm);
  gap: var(--space-md);
}

.route-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--text-primary);
  flex: 1;
  letter-spacing: 0.03em;
  line-height: 1.5;
}

.route-tag {
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  color: var(--paper-white);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.05em;
  box-shadow: var(--shadow-sm);
}

.route-tag.tag-gold {
  background: linear-gradient(135deg, var(--gold) 0%, #c89b5f 100%);
}

.route-tag.tag-cinnabar {
  background: linear-gradient(135deg, var(--cinnabar) 0%, #b04a32 100%);
}

.route-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.75;
}

.route-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.route-duration {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

/* 美食网格 */
.food-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.food-card {
  padding: var(--space-xl) var(--space-lg);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--ink-wash);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.food-circle-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 1px solid var(--ink-wash);
  border-radius: 50%;
  opacity: 0.3;
  pointer-events: none;
}

.food-card:active {
  transform: scale(0.96);
  box-shadow: var(--shadow-sm);
}

.food-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto var(--space-md);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 1;
}

.food-icon.icon-cinnabar {
  background: linear-gradient(135deg, var(--cinnabar-light) 0%, rgba(200, 85, 61, 0.08) 100%);
}

.food-icon.icon-gold {
  background: linear-gradient(135deg, var(--gold-light) 0%, rgba(212, 165, 116, 0.1) 100%);
}

.food-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.food-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  letter-spacing: 0.05em;
}

.food-tag {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  letter-spacing: 0.05em;
}
</style>
