/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * 
 * This module contains the logic for deciding which page the user sees, based on the path he visited.
 */

import LiquidationPage from '@/pages/LiquidationPage.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/fund',
      component: PaymentPage
    },
    {
      path: '/liquidate',
      component: LiquidationPage
    },
  ],
})

export default router
