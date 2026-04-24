<template>
  <div class="food-list">
    <!-- 头部区域 -->
    <div class="header-section">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 class="page-title">当地美食</h1>
    </div>

    <div class="content">
      <!-- 美食推荐策略 - 优化版 -->
      <div class="info-banner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="info-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p>优先推荐路线结束点附近、口碑稳定的本地菜，让导览体验更完整。</p>
      </div>

      <!-- 美食分类标签 -->
      <div class="category-tabs">
        <div class="category-tab active">
          <span>全部美食</span>
          <span class="tab-badge">4</span>
        </div>
      </div>

      <!-- 美食网格 - 优化版 -->
      <div class="food-grid">
        <!-- 大卡片 - 招牌推荐 -->
        <div class="food-card featured cursor-pointer" @click="goTo('/food/food-fish')">
          <div class="food-image food-img-fish">
            <div class="featured-badge">招牌推荐</div>
          </div>
          <div class="food-content">
            <div class="food-header">
              <h3>山溪豆花鱼</h3>
              <span class="food-price">¥68</span>
            </div>
            <div class="food-tags">
              <span class="tag">鲜香微辣</span>
              <span class="tag">2-3人</span>
              <span class="tag hot">人气最高</span>
            </div>
            <p class="food-desc">景区周边人气最高的本地招牌，适合游玩结束后补一顿热餐。</p>
          </div>
        </div>

        <!-- 普通卡片 -->
        <div class="food-card cursor-pointer" @click="goTo('/food/food-rice')">
          <div class="food-image food-img-rice">
            <div class="food-icon">🍚</div>
          </div>
          <div class="food-content">
            <h3>石锅笋饭</h3>
            <div class="food-tags">
              <span class="tag">本地特色</span>
              <span class="tag">饱腹感强</span>
            </div>
            <p class="food-desc">稳妥的大众口味，适合想吃得踏实的游客。</p>
          </div>
        </div>

        <div class="food-card cursor-pointer" @click="goTo('/food/food-ricewine')">
          <div class="food-image food-img-dessert">
            <div class="food-icon">🍶</div>
          </div>
          <div class="food-content">
            <h3>云顶米酿</h3>
            <div class="food-tags">
              <span class="tag">甜口轻饮</span>
              <span class="tag">拍照友好</span>
            </div>
            <p class="food-desc">适合拍照后短暂停留，轻度消费。</p>
          </div>
        </div>

        <div class="food-card cursor-pointer" @click="goTo('/food/food-inn')">
          <div class="food-image food-img-inn">
            <div class="food-icon">🏠</div>
          </div>
          <div class="food-content">
            <h3>镜湖边小馆</h3>
            <div class="food-tags">
              <span class="tag">步行可达</span>
              <span class="tag">景观餐叙</span>
            </div>
            <p class="food-desc">看完镜湖后就近用餐，轻松衔接。</p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <PaperButton block type="primary" @click="goTo('/food/food-fish')">
          查看招牌推荐
        </PaperButton>
        <PaperButton block plain @click="goTo('/home')">
          返回首页
        </PaperButton>
      </div>
    </div>

    <van-tabbar v-model="active" route active-color="var(--pine)" inactive-color="var(--text-soft)">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/trip" icon="orders-o">行程</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/food" icon="shop-o">美食</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PaperButton from '../components/PaperButton.vue'

const router = useRouter()
const active = ref(3)

function goBack() {
  router.back()
}

function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.food-list {
  padding-bottom: 60px;
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

/* 美食网格 */
.food-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

/* 美食卡片 - 纸质感 */
.food-card {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border: 1px solid rgba(90, 124, 111, 0.1);
  border-radius: 26px;
  overflow: hidden;
  transition: all 200ms ease;
  box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
}

.food-card:active {
  transform: scale(0.98);
}

.food-card.featured {
  grid-column: 1 / -1;
}

/* 装饰性边角 - 仅特色卡片 */
.food-card.featured::before,
.food-card.featured::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid #d4a574;
  opacity: 0.3;
  z-index: 1;
}

.food-card.featured::before {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.food-card.featured::after {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

/* 美食图片 */
.food-image {
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.food-card.featured .food-image {
  height: 180px;
}

.food-img-fish {
  background: linear-gradient(135deg, #c67b5c 0%, #b86f4d 100%);
}

.food-img-rice {
  background: linear-gradient(135deg, #d4a574 0%, #c8953d 100%);
}

.food-img-dessert {
  background: linear-gradient(135deg, #8fb5a8 0%, #7a9d8f 100%);
}

.food-img-inn {
  background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 100%);
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

.food-icon {
  font-size: 48px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* 美食内容 */
.food-content {
  padding: 18px;
}

.food-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.food-content h3 {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 17px;
  font-weight: 600;
  color: #2d3e35;
  margin: 0;
  letter-spacing: 0.5px;
}

.food-price {
  font-size: 16px;
  font-weight: 700;
  color: #c67b5c;
}

.food-tags {
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

.food-desc {
  margin: 0;
  font-size: 14px;
  color: #6b7c72;
  line-height: 1.6;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

/* 覆盖 Vant 组件样式 */
:deep(.van-tabbar) {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border-top: 1px solid rgba(90, 124, 111, 0.1);
  box-shadow: 0 -4px 16px rgba(90, 124, 111, 0.15);
}

:deep(.van-tabbar-item__text) {
  font-size: 12px;
}

:deep(.van-icon) {
  color: #6b7c72;
}
</style>
