<template>
  <van-tabbar
    route
    active-color="var(--color-primary)"
    inactive-color="var(--color-text-light)"
    :border="false"
    :safe-area-inset-bottom="true"
    class="app-tabbar"
  >
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/trip" icon="orders-o">行程</van-tabbar-item>
    <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
    <van-tabbar-item to="/food" icon="shop-o">美食</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.app-tabbar {
  background: var(--color-card-bg);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}
</style>
