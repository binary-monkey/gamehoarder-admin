import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import ChangeForm from '../components/forms/UserForm'

Vue.use(Router)

const demoRoutes = []
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_INCLUDE_DEMOS) {
  const vueBookRoutes = require('./vueBookRoutes').default
  vueBookRoutes.forEach(route => demoRoutes.push(route))
}

export default new Router({
// const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'user-table' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'logout',
          path: 'logout',
          beforeEnter (to, from, next) {
            localStorage.removeItem('token')
            next({ name: 'login' })
          },
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      // meta: { requiresAuth: true },
      children: [
        {
          name: 'user-table',
          path: '/admin/user-table',
          component: () => import('../components/data-tables/UserTables.vue'),
          wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tables',
          default: true
        },
        {
          name: 'edit-user',
          path: '/admin/user-table/:username/edit',
          component: () => import('../components/forms/UserForm.vue'),
          props: true
        },
      ],
    },
  ],
})
//
// router.beforeEach((to, from, next) => {
//   console.log('router before each', to.fullPath)
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!localStorage.getItem('token')) {
//       next({ name: 'login' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
//
// export default router
