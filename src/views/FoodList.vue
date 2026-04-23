<template>
  <div class="food-list">
    <van-nav-bar title="当地美食" left-arrow @click-left="goBack" fixed />

    <div class="content">
      <!-- 美食推荐策略 - 优化版 -->
      <div class="info-banner">
        <van-icon name="info-o" size="18" color="var(--amber)" />
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
  background: var(--bg);
  min-height: 100vh;
}

.content {
  padding: 16px;
  padding-top: 62px;
}

/* 信息横幅 */
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--cream);
  border: 1px solid rgba(239, 177, 93, 0.2);
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}

.info-banner p {
  flex: 1;
  margin: 0;
  font-size: 13px;
  color: var(--text);
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
  padding: 10px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  transition: all 200ms ease;
}

.category-tab.active {
  background: var(--pine);
  color: white;
  border-color: var(--pine);
}

.tab-badge {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
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

/* 美食卡片 */
.food-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 200ms ease;
  box-shadow: var(--shadow-card);
}

.food-card:active {
  transform: scale(0.98);
}

.food-card.featured {
  grid-column: 1 / -1;
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
  background: linear-gradient(135deg, var(--coral) 0%, #fb923c 100%);
}

.food-img-rice {
  background: linear-gradient(135deg, var(--sand) 0%, var(--amber) 100%);
}

.food-img-dessert {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.food-img-inn {
  background: linear-gradient(135deg, var(--pine) 0%, var(--moss) 100%);
}

.featured-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--coral);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.food-icon {
  font-size: 48px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* 美食内容 */
.food-content {
  padding: 16px;
}

.food-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.food-content h3 {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.food-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--coral);
}

.food-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  padding: 4px 10px;
  background: var(--mist);
  color: var(--pine);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.tag.hot {
  background: var(--coral);
  color: white;
}

.food-desc {
  margin: 0;
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.5;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}
</style>
