// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/FeeType.vue'),
      },
      {
        path: 'fee-type/create',
        component: () => import('@/components/FeeTypeForm.vue'),
      },
      {
        path: 'fee-type/:mode/:code',
        component: () => import('@/components/FeeTypeForm.vue'),
      },
      // {
      //   path: 'fee-type/edit/:id',
      //   component: () => import('@/components/FeeTypeForm.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
