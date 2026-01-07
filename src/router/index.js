import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import AuthView from '@/views/AuthView.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import NewExpenseView from '@/views/NewExpenseView.vue'
import CalendarView from '@/views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/analytics',
          component: AnalyticsView,
        },
        {
          path: '/auth',
          component: AuthView,
        },
        {
          path: '/new-expense',
          component: NewExpenseView,
        },
        {
          path: '/calendar',
          component: CalendarView,
        },
      ],
    },
  ],
})

export default router
