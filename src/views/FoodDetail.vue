<template>
  <div class="food-detail">
    <van-nav-bar :title="foodData.title" left-arrow @click-left="goBack" fixed />

    <div class="content">
      <!-- 美食图片 -->
      <div class="food-hero" :style="{ background: foodData.bgColor }">
        <div class="food-image"></div>
      </div>

      <div class="food-desc">
        <p>{{ foodData.desc }}</p>
      </div>

      <!-- 指标卡片 -->
      <van-grid :column-num="3" :border="false">
        <van-grid-item>
          <div class="metric-item">
            <div class="metric-value">{{ foodData.feature1 }}</div>
            <div class="metric-label">{{ foodData.label1 }}</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="metric-item">
            <div class="metric-value">{{ foodData.feature2 }}</div>
            <div class="metric-label">{{ foodData.label2 }}</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="metric-item">
            <div class="metric-value">{{ foodData.feature3 }}</div>
            <div class="metric-label">{{ foodData.label3 }}</div>
          </div>
        </van-grid-item>
      </van-grid>

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

      <!-- 推荐理由 -->
      <van-cell-group inset title="推荐理由">
        <van-cell>
          <p class="detail-text">{{ foodData.reason }}</p>
        </van-cell>
      </van-cell-group>

      <!-- 相关推荐 -->
      <van-cell-group inset title="相关推荐" v-if="foodData.related.length > 0">
        <van-cell
          v-for="item in foodData.related"
          :key="item.id"
          :title="item.title"
          :label="item.desc"
          is-link
          @click="goTo(item.path)"
        />
      </van-cell-group>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <PaperButton block type="primary" @click="goTo('/food')">
          查看更多当地美食
        </PaperButton>
        <PaperButton block plain @click="goTo('/home')">
          返回首页
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
  background: var(--color-background);
  min-height: 100vh;
}

.content {
  padding-top: 46px;
  padding-bottom: 16px;
}

.food-hero {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.food-image {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.food-desc {
  padding: var(--space-lg);
  background: var(--color-card-bg);
}

.food-desc p {
  margin: 0;
  color: #646566;
  line-height: 1.7;
}

.metric-item {
  text-align: center;
  padding: 12px 0;
}

.metric-value {
  font-size: 14px;
  font-weight: bold;
  color: #323233;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 12px;
  color: #969799;
}

.action-bar {
  padding: 0 16px 16px;
}

.detail-text {
  margin: 0;
  color: #646566;
  line-height: 1.7;
}

.action-buttons {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
