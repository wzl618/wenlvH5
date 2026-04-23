import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'vant/lib/index.css'
import './style.css'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('./views/Home.vue') },
  { path: '/trip', component: () => import('./views/Trip.vue') },
  { path: '/search', component: () => import('./views/Search.vue') },
  { path: '/route/:id', component: () => import('./views/RouteDetail.vue') },
  { path: '/spot/:id', component: () => import('./views/SpotDetail.vue') },
  { path: '/food/:id', component: () => import('./views/FoodDetail.vue') },
  { path: '/food', component: () => import('./views/FoodList.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
