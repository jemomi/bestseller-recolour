import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/index.vue'
import CreateTicket from '@/pages/CreateTicket.vue';
import TicketQueue from '@/pages/TicketQueue.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: Home},
    {path: '/create-ticket', component: CreateTicket},
    {path: '/ticket-queue', component: TicketQueue},
  ],
})

export default router
