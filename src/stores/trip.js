import { reactive } from 'vue'
import { tripItemCatalog } from '../data/catalog'

const TRIP_STATE_KEY = 'trip-state'
const TRIP_PLAN_KEY = 'trip-plan'

// 加载行程状态
function loadTripState() {
  try {
    const raw = localStorage.getItem(TRIP_STATE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return {
      route: Array.isArray(parsed.route) ? parsed.route : [],
      spot: Array.isArray(parsed.spot) ? parsed.spot : [],
      food: Array.isArray(parsed.food) ? parsed.food : []
    }
  } catch {
    return { route: [], spot: [], food: [] }
  }
}

// 加载行程计划
function loadTripPlan() {
  try {
    const raw = localStorage.getItem(TRIP_PLAN_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return {
      sortMode: parsed.sortMode || 'recommended',
      startTime: parsed.startTime || '09:30'
    }
  } catch {
    return { sortMode: 'recommended', startTime: '09:30' }
  }
}

export const tripStore = reactive({
  state: loadTripState(),
  plan: loadTripPlan(),
  addSequence: 0,

  // 添加项目
  addItem(kind, item) {
    if (this.isItemAdded(kind, item.targetId)) {
      return false
    }
    this.addSequence++
    this.state[kind].push({
      ...item,
      kind,
      addedAt: this.addSequence
    })
    this.save()
    return true
  },

  // 移除项目
  removeItem(kind, targetId) {
    this.state[kind] = this.state[kind].filter(item => item.targetId !== targetId)
    this.save()
  },

  // 检查是否已添加
  isItemAdded(kind, targetId) {
    return this.state[kind].some(item => item.targetId === targetId)
  },

  // 清空行程
  clear() {
    this.state = { route: [], spot: [], food: [] }
    this.save()
  },

  // 更新排序模式
  setSortMode(mode) {
    this.plan.sortMode = mode
    this.savePlan()
  },

  // 更新开始时间
  setStartTime(time) {
    this.plan.startTime = time
    this.savePlan()
  },

  // 获取所有项目
  getAllItems() {
    return ['route', 'spot', 'food'].flatMap(kind =>
      this.state[kind].map(item => ({
        ...item,
        kind,
        ...this.getItemDetails(item.targetId)
      }))
    )
  },

  // 获取项目详情
  getItemDetails(targetId) {
    return tripItemCatalog[targetId] || {
      durationMinutes: 30,
      recommendedOrder: 999,
      recommendedLabel: ''
    }
  },

  // 排序项目
  sortItems(items, sortMode = this.plan.sortMode) {
    return [...items].sort((a, b) => {
      if (sortMode === 'added') {
        return (a.addedAt || 0) - (b.addedAt || 0)
      }
      if (sortMode === 'kind') {
        const kindOrder = { route: 1, spot: 2, food: 3 }
        const kindDiff = (kindOrder[a.kind] || 9) - (kindOrder[b.kind] || 9)
        if (kindDiff !== 0) return kindDiff
        return a.recommendedOrder - b.recommendedOrder
      }
      return a.recommendedOrder - b.recommendedOrder
    })
  },

  // 获取总时长
  getTotalDuration() {
    const items = this.getAllItems()
    return items.reduce((sum, item) => sum + item.durationMinutes, 0)
  },

  // 保存状态
  save() {
    try {
      localStorage.setItem(TRIP_STATE_KEY, JSON.stringify(this.state))
    } catch (e) {
      console.error('保存行程失败', e)
    }
  },

  // 保存计划
  savePlan() {
    try {
      localStorage.setItem(TRIP_PLAN_KEY, JSON.stringify(this.plan))
    } catch (e) {
      console.error('保存计划失败', e)
    }
  }
})
