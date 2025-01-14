import {useAuthStore} from "@/stores/Auth.js";
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/AuthPage.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.user === null) await authStore.authListener();
  console.log(authStore.user);
  if (to.meta.requiresAuth && !authStore.user) {
    next('/auth');
  } else {
    next();
  }
})

export default router
