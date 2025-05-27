import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Status from '../views/Status.vue'
import Laporan from '../views/Laporan.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: Laporan
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router