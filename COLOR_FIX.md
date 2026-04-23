# 字体颜色修复说明

## 问题描述
部分文字在点击按钮或交互时会变成透明色，导致无法看清。

## 修复内容

### 1. 全局文字颜色增强 (style.css)

**文字颜色变量优化**
```css
--text-primary: #1a1a1a (从 #2c2c2c 加深)
--text-secondary: rgba(26, 26, 26, 0.75) (从 0.68 提高到 0.75)
--text-tertiary: rgba(26, 26, 26, 0.55) (从 0.45 提高到 0.55)
```

**全局颜色继承**
```css
/* 确保所有元素继承颜色 */
*:not(.van-icon) {
  color: inherit;
}

/* 防止点击时文字变透明 */
button *, a *, .van-button *, .van-cell * {
  color: inherit !important;
}
```

### 2. 卡片背景优化

**从米黄色改为纯白色**
```css
/* 之前 */
background: rgba(250, 248, 243, 0.95)

/* 现在 */
background: rgba(255, 255, 255, 0.92)
```

应用到：
- 搜索卡片
- 景点卡片
- 路线卡片
- 美食卡片
- 底部导航栏

### 3. Vant 组件样式覆盖 (App.vue)

**按钮文字颜色强制设置**
```css
.van-button {
  color: var(--text-primary) !important;
}

.van-button--primary {
  color: #ffffff !important;
}

.van-button--primary:active {
  color: #ffffff !important;
}

.van-button--default {
  color: var(--text-primary) !important;
}

.van-button__text {
  color: inherit !important;
}
```

**底部导航栏颜色**
```css
.van-tabbar-item {
  color: var(--text-tertiary) !important;
}

.van-tabbar-item--active {
  color: var(--cinnabar) !important;
}

.van-tabbar-item__text,
.van-tabbar-item__icon,
.van-tabbar-item__icon .van-icon {
  color: inherit !important;
}
```

**单元格和输入框**
```css
.van-cell,
.van-cell__title,
.van-cell__value,
.van-cell__label {
  color: var(--text-primary) !important;
}

.van-field__control {
  color: var(--text-primary) !important;
}

.van-field__control::placeholder {
  color: var(--text-secondary) !important;
}
```

**其他组件**
```css
/* 标签 */
.van-tag {
  color: inherit !important;
}

.van-tag--primary {
  color: #ffffff !important;
}

/* 通知栏 */
.van-notice-bar,
.van-notice-bar__content {
  color: var(--text-primary) !important;
}

/* 图标 */
.van-icon {
  color: inherit !important;
}

/* 对话框 */
.van-dialog__header,
.van-dialog__message {
  color: var(--text-primary) !important;
}

/* 弹出层 */
.van-popup {
  color: var(--text-primary) !important;
}
```

### 4. 主标题修复 (Home.vue)

**移除渐变文字效果**
```css
/* 之前 - 使用渐变 + 透明填充 */
.title-main {
  background: linear-gradient(...);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 现在 - 纯色 + 阴影 */
.title-main {
  color: var(--ink-deep);
  text-shadow: 0 2px 8px rgba(44, 44, 44, 0.1);
}
```

## 修复原理

### 问题根源
1. **Vant 组件默认样式**：某些组件在 `:active` 状态下会改变文字颜色或透明度
2. **渐变文字效果**：使用 `-webkit-text-fill-color: transparent` 会让文字完全透明
3. **颜色继承问题**：子元素没有正确继承父元素的颜色

### 解决方案
1. **使用 `!important`**：强制覆盖 Vant 的默认样式
2. **移除透明效果**：将渐变文字改为纯色 + 阴影
3. **全局颜色继承**：确保所有元素都继承正确的颜色
4. **禁用点击高亮**：`-webkit-tap-highlight-color: transparent`

## 测试检查清单

- [x] 主标题文字清晰可见
- [x] 搜索框文字清晰
- [x] 快捷入口文字清晰
- [x] 景点卡片文字清晰
- [x] 路线卡片文字清晰
- [x] 美食卡片文字清晰
- [x] 底部导航文字清晰
- [x] 点击按钮时文字不变透明
- [x] 点击卡片时文字不变透明
- [x] 点击导航时文字不变透明

## 浏览器兼容性

所有修复都使用标准 CSS 属性，兼容：
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- iOS Safari 14+
- Android Chrome

## 注意事项

1. **`!important` 的使用**：虽然通常不推荐过度使用 `!important`，但在覆盖第三方组件库样式时是必要的
2. **颜色对比度**：确保文字与背景的对比度符合 WCAG AA 标准（至少 4.5:1）
3. **深色模式**：如果未来添加深色模式，需要相应调整颜色变量

## 后续优化建议

1. 如果发现其他页面也有类似问题，应用相同的修复方案
2. 考虑创建一个统一的 Vant 主题配置文件
3. 定期测试不同设备和浏览器的显示效果

---

*修复完成时间: 2026-04-23*
*修复文件: style.css, App.vue, Home.vue*
