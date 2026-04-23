# 景区导览H5 - 中国风设计系统

## 设计理念
温馨的中国传统美学，融合现代移动端交互体验。营造纸质感、自然色调和传统装饰元素的和谐统一。

## 配色方案

### 主色调
| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 背景色 | `#f5f0e8` | 温暖米色，纸张质感 |
| 深背景 | `#ebe5dc` | 深一度的米色 |
| 松绿色 | `#5a7c6f` | 主要品牌色，中国传统松绿 |
| 浅松绿 | `#7a9d8f` | 渐变中间色 |
| 淡松绿 | `#8fb5a8` | 渐变浅色 |
| 琥珀色 | `#c67b5c` | CTA按钮主色 |
| 深琥珀 | `#b86f4d` | 按钮渐变深色 |
| 金沙色 | `#d4a574` | 装饰边框色 |

### 文字颜色
| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 主文字 | `#2d3e35` | 深绿灰色 |
| 次要文字 | `#4a5a51` | 中等绿灰色 |
| 辅助文字 | `#6b7c72` | 浅绿灰色 |
| 浅色文字 | `#fff7ed` | 用于深色背景 |

### 纸质感渐变
```css
/* 浅色卡片 */
background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);

/* 松绿色头图 */
background: linear-gradient(135deg, #5a7c6f 0%, #7a9d8f 50%, #8fb5a8 100%);

/* 琥珀色按钮 */
background: linear-gradient(135deg, #c67b5c 0%, #b86f4d 100%);

/* 标签背景 */
background: linear-gradient(135deg, #fef3e2 0%, #fde8c8 100%);
```

## 字体系统

### 字体族
```css
/* 标题字体 - 宋体系 */
font-family: 'Noto Serif SC', 'STSong', serif;

/* 正文字体 - 黑体系 */
font-family: 'PingFang SC', -apple-system, sans-serif;
```

### 字号规范
| 用途 | 字号 | 字重 | 行高 |
|------|------|------|------|
| 大标题 | 26px | 600 | 1.3 |
| 中标题 | 20px | 600 | 1.4 |
| 小标题 | 17px | 600 | 1.4 |
| 正文 | 15px | 400 | 1.7 |
| 辅助文字 | 14px | 400 | 1.6 |
| 小字 | 13px | 400 | 1.5 |

### 字间距
```css
/* 标题 */
letter-spacing: 0.5px;

/* 按钮文字 */
letter-spacing: 0.08em;
```

## 圆角系统
| 元素 | 圆角值 | 用途 |
|------|--------|------|
| 大卡片 | 26px | 主要内容卡片 |
| 中卡片 | 18px | 次要卡片 |
| 按钮 | 22px | 主要按钮（高度44px） |
| 标签 | 14-18px | 小标签 |
| 头像 | 50% | 圆形头像 |

## 阴影系统
```css
/* 卡片阴影 - 柔和 */
box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);

/* 头图阴影 */
box-shadow: 0 8px 24px rgba(90, 124, 111, 0.2);

/* 按钮阴影 */
box-shadow: 0 4px 12px rgba(198, 123, 92, 0.3);

/* 小元素阴影 */
box-shadow: 0 2px 6px rgba(90, 124, 111, 0.08);

/* 底部栏阴影 */
box-shadow: 0 -4px 16px rgba(90, 124, 111, 0.15);
```

## 装饰元素

### 边角装饰
```css
/* 左上角 */
.card::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  width: 20px;
  height: 20px;
  border: 2px solid #d4a574;
  border-right: none;
  border-bottom: none;
  opacity: 0.3;
}

/* 右下角 */
.card::after {
  content: '';
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  border: 2px solid #d4a574;
  border-left: none;
  border-top: none;
  opacity: 0.3;
}
```

### 边框
```css
/* 主边框 */
border: 1px solid rgba(90, 124, 111, 0.1);

/* 分隔线 */
border-bottom: 1px solid rgba(90, 124, 111, 0.15);

/* 标签边框 */
border: 1px solid rgba(198, 123, 92, 0.2);
```

## 组件规范

### 按钮
```css
/* 主要按钮 */
.primary-button {
  height: 44px;
  padding: 0 24px;
  background: linear-gradient(135deg, #c67b5c 0%, #b86f4d 100%);
  color: #fff7ed;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(198, 123, 92, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.primary-button:active {
  transform: scale(0.98);
  opacity: 0.9;
}

/* 次要按钮 */
.secondary-button {
  background: linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%);
  color: #4a5a51;
  border: 1px solid rgba(90, 124, 111, 0.15);
  box-shadow: 0 2px 6px rgba(90, 124, 111, 0.08);
}
```

### 卡片
```css
.content-card {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%);
  border-radius: 26px;
  padding: 28px 24px;
  box-shadow: 0 12px 32px rgba(90, 124, 111, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(90, 124, 111, 0.1);
  position: relative;
}
```

### 标签
```css
.tag {
  background: linear-gradient(135deg, #fef3e2 0%, #fde8c8 100%);
  color: #c67b5c;
  padding: 5px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid rgba(198, 123, 92, 0.2);
}
```

## 交互规范

### 过渡动画
```css
/* 标准过渡 */
transition: all 0.2s ease;

/* 颜色过渡 */
transition: color 0.2s, background 0.2s;

/* 变形过渡 */
transition: transform 0.2s;
```

### 点击反馈
```css
/* 按压效果 */
:active {
  transform: scale(0.98);
}

/* 透明度变化 */
:active {
  opacity: 0.9;
}
```

### 悬停效果（桌面端）
```css
/* 卡片悬停 */
.card:hover {
  box-shadow: 0 16px 40px rgba(90, 124, 111, 0.2);
  transform: translateY(-2px);
}

/* 按钮悬停 */
.button:hover {
  opacity: 0.95;
}
```

## 布局规范

### 间距系统
| 用途 | 间距值 |
|------|--------|
| 页面边距 | 16px |
| 卡片内边距 | 24-28px |
| 元素间距 | 12-16px |
| 小间距 | 8-10px |
| 底部安全区 | 80px |

### 响应式断点
| 断点 | 宽度 | 说明 |
|------|------|------|
| Mobile | 375px | 最小支持宽度 |
| Tablet | 768px | 平板竖屏 |
| Desktop | 1024px+ | 桌面端 |

## 无障碍规范

### 对比度
- 正文文字：至少 4.5:1
- 大文字（18px+）：至少 3:1
- 交互元素：至少 3:1

### 触摸目标
- 最小尺寸：44x44px
- 间距：至少 8px

### 焦点状态
```css
:focus-visible {
  outline: 2px solid #5a7c6f;
  outline-offset: 2px;
}
```

## 避免的反模式
- ❌ 使用 emoji 作为图标（使用 SVG）
- ❌ 过度动画（保持简洁）
- ❌ 纯白背景（使用米色）
- ❌ 高饱和度颜色（保持柔和）
- ❌ 尖锐边角（使用圆角）
- ❌ 强烈对比（使用柔和过渡）

## 实施检查清单
- [ ] 使用中国风配色方案（米色+松绿+琥珀）
- [ ] 标题使用宋体字体
- [ ] 卡片添加纸质感渐变
- [ ] 添加装饰性边角（可选）
- [ ] 使用柔和阴影
- [ ] 圆角统一（26px/18px/14px）
- [ ] 按钮使用渐变背景
- [ ] 触摸目标至少 44x44px
- [ ] 文字对比度符合无障碍标准
- [ ] 添加过渡动画（0.2s）
