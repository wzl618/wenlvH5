<template>
  <button
    :class="['paper-btn', `paper-btn-${type}`, { 'paper-btn-block': block, 'paper-btn-plain': plain }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default' // 'default' | 'primary'
  },
  block: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.paper-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid var(--button-border);
  background: linear-gradient(180deg, var(--button-paper-top) 0%, var(--button-paper-bottom) 100%);
  color: var(--button-ink);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  border-radius: var(--radius-md);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 10px 20px rgba(126, 61, 34, 0.1);
  transition:
    transform 180ms ease,
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}

/* 装饰角 */
.paper-btn::before,
.paper-btn::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  opacity: 0.82;
  pointer-events: none;
}

.paper-btn::before {
  top: 6px;
  left: 6px;
  border-top: 1.5px solid var(--button-ornament);
  border-left: 1.5px solid var(--button-ornament);
  border-top-left-radius: 6px;
}

.paper-btn::after {
  bottom: 6px;
  right: 6px;
  border-bottom: 1.5px solid var(--button-ornament);
  border-right: 1.5px solid var(--button-ornament);
  border-bottom-right-radius: 6px;
}

/* Hover 状态 */
.paper-btn:hover {
  transform: translateY(-1px);
  border-color: var(--button-border-strong);
  background: linear-gradient(180deg, var(--button-paper-hover-top) 0%, var(--button-paper-hover-bottom) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 12px 24px rgba(126, 61, 34, 0.12);
}

/* Active 状态 */
.paper-btn:active {
  transform: translateY(0);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 6px 12px rgba(126, 61, 34, 0.08);
}

/* Primary 类型 - 漆红色 */
.paper-btn-primary {
  border-color: rgba(121, 32, 15, 0.4);
  background: linear-gradient(180deg, var(--button-lacquer-top) 0%, var(--button-lacquer-bottom) 100%);
  color: var(--button-ink-light);
  box-shadow:
    inset 0 1px 0 rgba(255, 236, 210, 0.18),
    0 12px 24px rgba(103, 34, 22, 0.2);
}

.paper-btn-primary::before,
.paper-btn-primary::after {
  border-color: var(--button-ornament-gold);
}

.paper-btn-primary:hover {
  transform: translateY(-1px);
  border-color: rgba(121, 32, 15, 0.56);
  background: linear-gradient(180deg, var(--button-lacquer-hover-top) 0%, var(--button-lacquer-hover-bottom) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 236, 210, 0.22),
    0 16px 30px rgba(103, 34, 22, 0.24);
}

.paper-btn-primary:active {
  transform: translateY(0);
  box-shadow:
    inset 0 1px 0 rgba(255, 236, 210, 0.15),
    0 8px 16px rgba(103, 34, 22, 0.18);
}

/* Plain 样式 - 更淡的背景 */
.paper-btn-plain {
  background: rgba(255, 250, 243, 0.6);
  border-color: var(--line);
  color: var(--text-soft);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 4px 12px rgba(126, 61, 34, 0.06);
}

.paper-btn-plain:hover {
  background: rgba(255, 250, 243, 0.85);
  border-color: var(--line-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 6px 16px rgba(126, 61, 34, 0.08);
}

/* Block 样式 */
.paper-btn-block {
  display: flex;
  width: 100%;
}

/* 禁用状态 */
.paper-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.paper-btn:disabled:hover {
  transform: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 10px 20px rgba(126, 61, 34, 0.1);
}
</style>
