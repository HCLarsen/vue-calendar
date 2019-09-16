import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import DayView from './components/DayView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: DayView,
      props: {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
