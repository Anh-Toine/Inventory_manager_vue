
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Products from '../views/Products.vue'
import Suppliers from '../views/Suppliers.vue'
import Categories from '../views/Categories.vue'
import Login from '../views/Login.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LoginPage',
    component: Login
  },
  {
    path: '/product',
    name: 'ProductsPage',
    component: Products
  },
  {
    path: '/suppliers',
    name: 'SuppliersPage',
    component: Suppliers
<<<<<<< HEAD
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
=======
>>>>>>> e1555af (Added the Id's for selenium testing)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
