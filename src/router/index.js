import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user-store'

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import ProfileSection from '../views/account/ProfileSection.vue'
import AddSong from '../views/account/AddSong.vue'
import DeleteSong from '../views/account/DeleteSong.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next('/account/profile/' + useUserStore().id) : next()
    },
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/account',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('/login')
    },
    component: AccountView,
    children: [
      {
        path: 'profile/:id',
        name: 'ProfileSection',
        component: ProfileSection,
      },
      {
        path: 'add-song',
        name: 'AddSong',
        component: AddSong,
      },
      {
        path: 'delete-song',
        name: 'DeleteSong',
        component: DeleteSong,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
