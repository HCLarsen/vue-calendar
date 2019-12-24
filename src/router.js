import Vue from 'vue'
import Router from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import DayView from '@/views/DayView.vue'
import MonthView from '@/views/MonthView.vue'

import routes from '@/router/routes.js';

Vue.use(Router)

function thisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  return { year: year, month: month };
}

function today() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  return { year: year, month: month, day: day };
}

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/calendar',
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
      props: thisMonth
    },
    {
      path: '/day',
      name: 'day-view',
      component: DayView,
      props: today
    }
  ]
})
