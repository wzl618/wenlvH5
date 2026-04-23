# 景区搜索导览 H5

基于 Vite + Vue 3 + Vant Mobile 的景区导览应用

## 项目结构

```
vite-app/
├── src/
│   ├── views/          # 页面组件
│   │   ├── Home.vue           # 首页
│   │   ├── Search.vue         # 搜索页
│   │   ├── Trip.vue           # 我的行程
│   │   ├── RouteDetail.vue    # 路线详情
│   │   ├── SpotDetail.vue     # 景点详情
│   │   ├── FoodDetail.vue     # 美食详情
│   │   └── FoodList.vue       # 美食列表
│   ├── stores/         # 状态管理
│   │   └── trip.js            # 行程管理store
│   ├── data/           # 数据
│   │   └── catalog.js         # 搜索目录和行程配置
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
```

## 核心功能

- ✅ **首页** - 搜索入口、快捷导航、热门推荐、路线推荐、美食预览
- ✅ **搜索页** - 关键词搜索、分类筛选、热度排行、搜索结果
- ✅ **我的行程** - 行程管理、时间排序、智能排程、滑动删除
- ✅ **路线详情** - 路线时间轴、景点列表、加入行程
- ✅ **景点详情** - 景点信息、指标展示、相关路线
- ✅ **美食详情** - 美食介绍、特色标签、相关推荐
- ✅ **底部导航** - 首页/行程/搜索/美食快速切换

## 技术栈

- **Vite 5** - 极速开发体验，HMR秒级响应
- **Vue 3** - Composition API，响应式更简洁
- **Vant 4** - 移动端UI组件库，开箱即用
- **Vue Router 4** - 单页应用路由管理
- **LocalStorage** - 行程数据持久化

## 安装运行

### 方式一：使用 Node.js 18/20（推荐）

```bash
# 如果使用 nvm，切换到 Node.js 20
nvm use 20

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方式二：使用 Bun（最简单，推荐）

```bash
# 安装 Bun
curl -fsSL https://bun.sh/install | bash

# 安装依赖并运行
bun install
bun run dev
```

## 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录

## 预览生产版本

```bash
npm run preview
```

## 页面路由

- `/` - 重定向到首页
- `/home` - 首页
- `/trip` - 我的行程
- `/search` - 搜索页
- `/route/:id` - 路线详情
- `/spot/:id` - 景点详情
- `/food/:id` - 美食详情
- `/food` - 美食列表

## 数据持久化

- 行程数据存储在 `localStorage` 的 `trip-state` 键
- 行程计划存储在 `localStorage` 的 `trip-plan` 键

## 开发说明

### 添加新景点

编辑 `src/data/catalog.js`，在 `searchCatalog` 和 `tripItemCatalog` 中添加数据

### 修改样式

每个页面组件都有独立的 `<style scoped>` 样式，可直接修改

### 添加新页面

1. 在 `src/views/` 创建新组件
2. 在 `src/main.js` 的 `routes` 中添加路由配置

## 浏览器兼容性

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- 移动端浏览器（iOS Safari 14+, Chrome Mobile）
