
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Products from '../views/Products.vue'
import Suppliers from '../views/Suppliers.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ProductsPage',
    component: Products
  },
  {
    path: '/suppliers',
    name: 'SuppliersPage',
    component: Suppliers
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
