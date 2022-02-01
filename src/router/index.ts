
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Products from '../views/Products.vue'
import Suppliers from '../views/Suppliers.vue'
import Categories from '../views/Categories.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    component: Login
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: Products,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'OrdersPage',
    component: Orders
  },
  {
    path: '/suppliers',
    name: 'SuppliersPage',
    component: Suppliers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: Categories
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
