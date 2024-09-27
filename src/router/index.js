import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/CollapseNode.vue')
    },
    {
      path: '/tables',
      component: () => import('@/pages/TableData.vue')
    }
  ]
})

export default router
