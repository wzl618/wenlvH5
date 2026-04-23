// 搜索目录数据
export const searchCatalog = [
  {
    kind: 'spot',
    title: '半山镜湖',
    meta: '热门打卡 / 推荐停留 25 分钟',
    desc: '景区热度最高的拍照点之一，适合放在 2 小时路线的中段停留。',
    targetId: 'spot-lake',
    badge: '+18%',
    terms: ['镜湖', '半山镜湖', '拍照', '湖景', '热搜']
  },
  {
    kind: 'spot',
    title: '云顶观景台',
    meta: '经典全景 / 推荐停留 20 分钟',
    desc: '适合作为景区游览的第一站，先把整体地形和路线看明白。',
    targetId: 'spot-cloud',
    badge: '+12%',
    terms: ['观景台', '云顶', '全景', '山顶', '日出']
  },
  {
    kind: 'spot',
    title: '山谷剧场',
    meta: '活动集中 / 推荐停留 30 分钟',
    desc: '热门路线尾段的重要节点，适合看演出、休息和结束游玩。',
    targetId: 'spot-valley',
    badge: '+9%',
    terms: ['剧场', '山谷', '演出', '活动', '巡游']
  },
  {
    kind: 'spot',
    title: '林间长廊',
    meta: '轻松过渡 / 推荐停留 15-18 分钟',
    desc: '适合在高热度景点之间做缓冲，让整条路线走起来更从容。',
    targetId: 'spot-corridor',
    badge: '缓冲',
    terms: ['长廊', '林间', '轻松', '步道', '过渡']
  },
  {
    kind: 'spot',
    title: '花谷草坪',
    meta: '尾段放松 / 推荐停留 20 分钟',
    desc: '适合作为热门路线的最后一站，留给游客更轻松的收尾体验。',
    targetId: 'spot-meadow',
    badge: '收尾',
    terms: ['草坪', '花谷', '休息', '放松', '收尾']
  },
  {
    kind: 'route',
    title: '2 小时最省时间路线',
    meta: '4 个点位 / 适合第一次来景区',
    desc: '优先串起代表性景观，绕路少，适合时间紧张又想高效逛景区的游客。',
    targetId: 'route-fast',
    badge: '省时',
    terms: ['最省时间', '路线', '2小时', '高效', '首次来访']
  },
  {
    kind: 'route',
    title: '热门必打卡路线',
    meta: '覆盖热搜前列点位 / 出片率高',
    desc: '适合不想漏掉经典点位的游客，优先覆盖热度最高的路线组合。',
    targetId: 'route-hot',
    badge: '热门',
    terms: ['热门路线', '打卡', '经典', '半山镜湖', '山谷剧场']
  },
  {
    kind: 'food',
    title: '镜湖边小馆',
    meta: '景区周边美食 / 步行可达',
    desc: '看完镜湖后可以直接就近用餐，适合作为景点浏览后的轻松衔接。',
    targetId: 'food-inn',
    badge: '步行',
    terms: ['小馆', '镜湖边', '餐馆', '附近', '就近']
  },
  {
    kind: 'food',
    title: '山溪豆花鱼',
    meta: '鲜辣暖胃 / 2-3 人',
    desc: '景区周边人气最高的本地招牌，适合作为路线结束后的正餐推荐。',
    targetId: 'food-fish',
    badge: '招牌',
    terms: ['豆花鱼', '鲜辣', '鱼', '本地菜', '正餐']
  },
  {
    kind: 'food',
    title: '石锅笋饭',
    meta: '本地特色 / 饱腹感强',
    desc: '稳定不踩雷的当地特色主食，适合想吃得踏实一点的游客。',
    targetId: 'food-rice',
    badge: '稳妥',
    terms: ['笋饭', '石锅', '主食', '本地特色', '轻松收尾']
  },
  {
    kind: 'food',
    title: '云顶米酿',
    meta: '甜口轻饮 / 适合拍照后休息',
    desc: '更轻度的景区消费选择，适合和镜湖、观景台等拍照点组合。',
    targetId: 'food-ricewine',
    badge: '轻食',
    terms: ['米酿', '轻饮', '甜口', '休息', '小吃']
  }
]

// 行程项目详情
export const tripItemCatalog = {
  'route-fast': {
    kind: 'route',
    durationMinutes: 120,
    recommendedOrder: 10,
    recommendedLabel: '建议先走这条省时路线，先把景区主线串起来。'
  },
  'route-hot': {
    kind: 'route',
    durationMinutes: 150,
    recommendedOrder: 12,
    recommendedLabel: '如果你更看重经典点位，这条热门路线适合排在主线前段。'
  },
  'spot-cloud': {
    kind: 'spot',
    durationMinutes: 20,
    recommendedOrder: 20,
    recommendedLabel: '适合作为第一站，先看清景区全貌。'
  },
  'spot-lake': {
    kind: 'spot',
    durationMinutes: 25,
    recommendedOrder: 30,
    recommendedLabel: '热搜最高的打卡点，建议放在中段停留拍照。'
  },
  'spot-corridor': {
    kind: 'spot',
    durationMinutes: 18,
    recommendedOrder: 40,
    recommendedLabel: '作为连接段使用，能让行程节奏更舒服。'
  },
  'spot-valley': {
    kind: 'spot',
    durationMinutes: 30,
    recommendedOrder: 50,
    recommendedLabel: '适合放在尾段，看活动、休息和收尾。'
  },
  'spot-meadow': {
    kind: 'spot',
    durationMinutes: 20,
    recommendedOrder: 60,
    recommendedLabel: '适合在行程结束前做一段放松停留。'
  },
  'food-inn': {
    kind: 'food',
    durationMinutes: 45,
    recommendedOrder: 80,
    recommendedLabel: '如果你在镜湖附近结束游玩，可以先就近吃这家。'
  },
  'food-ricewine': {
    kind: 'food',
    durationMinutes: 25,
    recommendedOrder: 85,
    recommendedLabel: '更像轻食收口，适合拍照后短暂停留。'
  },
  'food-rice': {
    kind: 'food',
    durationMinutes: 45,
    recommendedOrder: 95,
    recommendedLabel: '如果你想吃得稳妥一点，这道适合排在正餐位。'
  },
  'food-fish': {
    kind: 'food',
    durationMinutes: 60,
    recommendedOrder: 100,
    recommendedLabel: '适合作为整条路线结束后的主餐推荐。'
  }
}
