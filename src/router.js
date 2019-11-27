import Vue from 'vue'
import Router from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import DayView from '@/views/DayView.vue'
import MonthView from '@/views/MonthView.vue'

import routes from '@/router/routes.js';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/month',
    },
    {
      path: '/calendar/',
      name: 'calendar',
      component: CalendarView,
      children: [
        ...routes
      ]
    },
    {
      path: '/month',
      name: 'month-view',
      component: MonthView,
      props: { year: 2019, month: 10 }
    },
    {
      path: '/day',
      name: 'day-view',
      component: DayView,
      props: { year: 2019, month: 10, day: 23 }
    }
  ]
})
