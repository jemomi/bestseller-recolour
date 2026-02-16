import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/index.vue'
import CreateTicket from '@/pages/CreateTicket.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: Home},
    {path: '/create-ticket', component: CreateTicket},
  ],
})

export default router
