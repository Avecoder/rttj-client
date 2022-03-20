import { createWebHistory, createRouter } from "vue-router";

import AllStatic from '../views/AllStatic.vue'
import Friend from '../views/Friend.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Tasks from '../views/Tasks.vue'
import UserStatic from '../views/UserStatic.vue'
import History from '../views/History.vue'
import Admin from '../views/Admin.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Статистика пользователя',
    component: UserStatic
  },
  {
    path: '/all',
    name: 'Общая статистика',
    component: AllStatic
  },
  {
    path: '/tasks',
    name: 'Ожидаемые задачи',
    component: Tasks
  },
  {
    path: '/friend',
    name: 'Список друзей',
    component: Friend
  },
  {
    path: '/history',
    name: 'История',
    component: History
  },
  {
    path: '/profile',
    name: 'Профиль',
    component: Profile
  },
  {
    path: '/admin',
    name: 'Панель администратора',
    component: Admin
  },
  {
    path: "/:catchAll(.*)",
    name: 'not found',
    component: NotFoundPage,
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
