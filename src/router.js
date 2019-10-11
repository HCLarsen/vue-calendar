import Vue from 'vue'
import Router from 'vue-router'
// import DayView from './views/DayView.vue'
// import MonthView from './views/MonthView.vue'
import YearView from './views/YearView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: YearView,
      props: {year: 2019}
    }
  ]
})
