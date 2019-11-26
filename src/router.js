import Vue from 'vue'
import Router from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import DayView from '@/views/DayView.vue'
import MonthView from '@/views/MonthView.vue'
import YearView from './views/YearView.vue'

Vue.use(Router)

function todaysPath() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  return `${year}/${month}`;
}

function yearProps(route) {
  return {
    year: parseInt(route.params.year, 10),
    routerActive: true
  };
}

function monthProps(route) {
  return {
    year: parseInt(route.params.year, 10),
    month: parseInt(route.params.month - 1, 10),
    routerActive: true
  };
}

function dayProps(route) {
  return {
    year: parseInt(route.params.year, 10),
    month: parseInt(route.params.month - 1, 10),
    day: parseInt(route.params.day, 10),
    routerActive: true
  };
}

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
        {
          path: ':year(\\d+)',
          name: 'year',
          component: YearView,
          props: yearProps
        },
        {
          path: ':year(\\d+)/:month(\\d{1,2})',
          name: 'month',
          component: MonthView,
          props: monthProps
        },
        {
          path: ':year(\\d+)/:month(\\d{1,2})/:day(\\d{1,2})',
          name: 'day',
          component: DayView,
          props: dayProps
        },
        {
          path: '',
          name: 'home',
          redirect: todaysPath()
        },
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
//     // {
//     //   path: '/:year(\\d+)',
//     //   name: 'year',
//     //   component: YearView,
//     //   props: yearProps
//     // },
//     // {
//     //   path: '/:year(\\d+)/:month(\\d{1,2})',
//     //   name: 'month',
//     //   component: MonthView,
//     //   props: monthProps
//     // },
//     // {
//     //   path: '/:year(\\d+)/:month(\\d{1,2})/:day(\\d{1,2})',
//     //   name: 'day',
//     //   component: DayView,
//     //   props: dayProps
//     // },
//     // {
//     //   path: '/*',
//     //   name: 'home',
//     //   redirect: todaysPath()
//     // },
  ]
})
