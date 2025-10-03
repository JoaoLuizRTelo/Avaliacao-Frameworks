import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/agenda'
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('../pages/AppointmentsBoard.vue')
  },
  {
    path: '/atendimentos',
    name: 'crud',
    component: () => import('../pages/AppointmentCrud.vue')
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
