# 山水意境 - 中国风文旅设计系统

## 设计理念

**诗意东方主义** - 将中国山水画的留白、层次感与现代UI设计结合，创造一个如同可交互的数字山水长卷的景区导览体验。

---

## 核心美学特征

### 🎨 色彩系统 - 传统五色

**墨色系（主色调）**
- `--ink-black: #2c2c2c` - 深墨
- `--ink-deep: #1a1a1a` - 浓墨
- `--ink-wash: rgba(44, 44, 44, 0.08)` - 水墨晕染

**纸色系（背景）**
- `--paper-white: #faf8f3` - 宣纸白
- `--paper-cream: #f5f1e8` - 米纸色
- `--paper-aged: #ebe5d9` - 陈纸色

**朱砂系（强调色）**
- `--cinnabar: #c8553d` - 朱砂红
- `--vermillion: #e63946` - 朱红

**青绿系（自然色）**
- `--jade-green: #588157` - 青绿
- `--mountain-green: #3a5a40` - 山色

**金色系（点缀）**
- `--gold: #d4a574` - 金色
- `--sky-blue: #457b9d` - 天青

---

## 字体系统

### 标题字体
- **主字体**: Noto Serif SC（思源宋体）
- **特点**: 优雅的衬线字体，体现书法韵味
- **应用**: 页面标题、区块标题、卡片标题

### 正文字体
- **主字体**: Noto Sans SC（思源黑体）
- **特点**: 现代无衬线字体，清晰易读
- **应用**: 正文内容、描述文字、按钮文字

### 装饰字体
- **应用**: 印章效果、标签装饰
- **特点**: 字间距加大（letter-spacing: 0.2-0.3em）

---

## 视觉元素

### 1. 水墨晕染背景
```css
/* 固定背景层，模拟远山雾气 */
body::before {
  radial-gradient(ellipse, mist-blue, transparent)
  filter: blur(60px)
  animation: mistFloat 20s infinite
}
```

### 2. 印章装饰
```css
.seal-stamp {
  background: cinnabar
  border: 1px solid rgba(255,255,255,0.2)
  box-shadow: 0 2px 8px rgba(200,85,61,0.3)
}
```

### 3. 宣纸质感卡片
```css
.card {
  background: rgba(250,248,243,0.95)
  backdrop-filter: blur(10px)
  border: 1px solid ink-wash
  /* 顶部金线装饰 */
  ::before { gradient(gold) }
}
```

### 4. 祥云装饰
```css
.cloud-left, .cloud-right {
  radial-gradient(ellipse, ink-wash, transparent)
  filter: blur(8px)
  animation: cloudFloat 8s infinite
}
```

---

## 动画系统

### 水墨渲染动画
```css
@keyframes inkFadeIn {
  from: opacity 0, blur(4px), translateY(20px)
  to: opacity 1, blur(0), translateY(0)
  duration: 600ms
}
```

### 云雾飘动
```css
@keyframes mistFloat {
  0%, 100%: translate(0, 0)
  50%: translate(20px, -30px)
  duration: 20s
}
```

### 页面切换
- 进入：水墨渲染效果（inkFadeIn）
- 离开：模糊淡出效果（inkFadeOut）
- 时长：500ms / 300ms

---

## 布局特点

### 1. 非对称构图
- 标题居中，装饰元素左右不对称
- 卡片内容左对齐，装饰元素右下角

### 2. 大胆留白
- 区块间距：3rem（48px）
- 卡片内边距：1.5-2rem（24-32px）
- 营造山水画的呼吸感

### 3. 层次叠加
- 背景层：水墨晕染
- 内容层：宣纸卡片
- 装饰层：印章、云纹、金线

---

## 交互设计

### 触摸反馈
```css
:active {
  transform: scale(0.96) or translateY(2px)
  box-shadow: reduced
  transition: 250ms cubic-bezier(0.4,0,0.2,1)
}
```

### 微交互
- 快捷入口：底部笔触装饰渐显
- 搜索框：右侧光晕装饰
- 卡片：水墨晕染背景

---

## 组件样式

### 首页标题
```
山水游记
[景区导览] ← 印章样式
寻幽探胜 · 诗意山水
```

### 快捷入口（四象布局）
- 青绿渐变 → 景点
- 金色渐变 → 路线
- 朱砂渐变 → 美食
- 天青渐变 → 行程

### 区块标题
```
[热门] 景点  ← 小标签 + 大标题
```

### 印章徽章
- 朱砂红背景
- 白色文字
- 内嵌边框
- 投影效果

---

## 响应式设计

### 移动端优化
- 基础字号：16px
- 触摸目标：最小 44x44px
- 卡片圆角：16-24px
- 间距系统：4px 基准

### 性能优化
- backdrop-filter 降级处理
- 动画支持 prefers-reduced-motion
- 模糊效果适度使用

---

## 设计原则

### 1. 意境优先
不追求过度装饰，而是通过留白、层次、色彩营造意境

### 2. 传统与现代融合
- 传统：书法字体、印章、水墨、祥云
- 现代：清晰布局、流畅动画、易用交互

### 3. 细节精致
- 每个卡片都有独特装饰
- 渐变、阴影、边框精心调配
- 动画时序错开，营造节奏感

### 4. 文化自信
不刻意模仿西方设计，而是从中国传统美学中汲取灵感，创造独特的数字体验

---

## 使用指南

### 应用新样式到其他页面

1. **保持色彩一致性**
   - 使用 CSS 变量（--cinnabar, --jade-green 等）
   - 不要硬编码颜色值

2. **复用动画类**
   - `.ink-fade-in` - 水墨渐显
   - `.seal-stamp` - 印章样式
   - `.card` - 宣纸卡片

3. **遵循字体规范**
   - 标题用 `var(--font-serif)`
   - 正文用 `var(--font-sans)`
   - 字间距适当加大

4. **添加装饰元素**
   - 卡片顶部金线
   - 背景水墨晕染
   - 圆形/竹简装饰线

---

## 技术实现

### 依赖
- Vue 3 + Vite
- Vant 4（移动端组件库）
- Google Fonts（Noto Serif SC, Noto Sans SC）

### 浏览器兼容
- Chrome/Edge 90+
- Safari 14+
- iOS Safari 14+
- 支持 backdrop-filter 的现代浏览器

### 文件结构
```
src/
├── style.css          # 全局设计系统
├── App.vue            # 根组件 + Vant 样式覆盖
└── views/
    └── Home.vue       # 首页（完整示例）
```

---

## 设计灵感来源

- 中国山水画的留白与层次
- 宋代书法的优雅与克制
- 传统印章的朱砂与白文
- 宣纸的质感与透气感
- 祥云纹样的流动与飘逸

**设计目标**: 让每一次滚动都像是在欣赏一幅数字山水长卷 🏔️

---

*设计系统版本: 1.0*  
*最后更新: 2026-04-23*
