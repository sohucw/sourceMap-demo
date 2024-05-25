import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/trigger',
            name: 'trigger',
            component: () => import('../views/ErrorView.vue')
        },
        {
            path: '/record',
            name: 'record',
            component: () => import('../views/RecordScreen.vue')
        },
        {
            path: '/play',
            name: 'play',
            component: () => import('../views/PlayScreen.vue')
        }
    ]
})

export default router
