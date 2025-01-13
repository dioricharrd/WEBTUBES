// Import vue router
import { createRouter, createWebHistory } from 'vue-router';

// Define routes
const routes = [
    // Home Page
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },

    // Transportation Routes
    {
        path: '/transportation-services',
        name: 'transportation-services.index',
        component: () => import( /* webpackChunkName: "transportation-services.index" */ '../views/Transportation/index.vue')
    },
    {
        path: '/transportation-services/create',
        name: 'transportation-services.create',
        component: () => import( /* webpackChunkName: "transportation-services.create" */ '../views/Transportation/create.vue')
    },
    {
        path: '/transportation-services/edit/:id',
        name: 'transportation-services.edit',
        component: () => import( /* webpackChunkName: "transportation-services.edit" */ '../views/Transportation/edit.vue')
    },

    // Other Routes (You can add others like villas, reservations, etc. if needed)
    {
        path: '/villas',
        name: 'villas.index',
        component: () => import( /* webpackChunkName: "villas.index" */ '../views/posts/index.vue')
    },
    {
        path: '/villas/create',
        name: 'villas.create',
        component: () => import( /* webpackChunkName: "villas.create" */ '../views/posts/create.vue')
    },
    {
        path: '/villas/edit/:id',
        name: 'villas.edit',
        component: () => import( /* webpackChunkName: "villas.edit" */ '../views/posts/edit.vue')
    },

    // Reservations Routes
    {
        path: '/reservations',
        name: 'reservations.index',
        component: () => import( /* webpackChunkName: "reservations.index" */ '../views/Reservation/index.vue') // Daftar reservasi
    },
    {
        path: '/reservations/create',
        name: 'reservations.create',
        component: () => import( /* webpackChunkName: "reservations.create" */ '../views/Reservation/create.vue') // Form buat reservasi
    },
    {
        path: '/reservations/edit/:id',
        name: 'reservations.edit',
        component: () => import( /* webpackChunkName: "reservations.edit" */ '../views/Reservation/edit.vue') // Form edit reservasi
    },

    // Resto Menu Routes
    {
        path: '/menus',
        name: 'menus.index',
        component: () => import( /* webpackChunkName: "menus.index" */ '../views/Resto/index.vue') // Daftar menu
    },
    {
        path: '/menus/create',
        name: 'menus.create',
        component: () => import( /* webpackChunkName: "menus.create" */ '../views/Resto/create.vue') // Form buat menambahkan data menu restoran
    },
    {
        path: '/menus/edit/:id',
        name: 'menus.edit',
        component: () => import( /* webpackChunkName: "menus.index" */ '../views/Resto/edit.vue') // Form edit menu
    },

    // Staff Routes
    {
        path: '/staffs',
        name: 'staffs.index',
        component: () => import( /*webpackChunkName: "staffs.index" */ '../views/Staff/index.vue') // Daftar Staff
    },
    {
        path: '/staffs/create',
        name: 'staffs.create',
        component: () => import( /*webpackChunkName: "staffs.create" */ '../views/Staff/create.vue') // Form Penambahan Staff
    },
    {
        path: '/staffs/edit/:id',
        name: 'staffs.edit',
        component: () => import( /*webpackChunkName: "staffs.edit" */ '../views/Staff/edit.vue') // Form edit staff
    }
];

// Create router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
