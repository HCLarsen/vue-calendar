import Vue from 'vue'
import Router from 'vue-router'
import DayView from './views/DayView.vue'
import MonthView from './views/MonthView.vue'
import YearView from './views/YearView.vue'

Vue.use(Router)

function yearProps(route) {
  return {
    year: parseInt(route.params.year, 10)
  };
}

function monthProps(route) {
  return {
    year: parseInt(route.params.year, 10),
    month: parseInt(route.params.month - 1, 10)
  };
}

function dayProps(route) {
  return {
    year: parseInt(route.params.year, 10),
    month: parseInt(route.params.month - 1, 10),
    day: parseInt(route.params.day, 10)
  };
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MonthView,
      props: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      }
    },
    {
      path: '/:year',
      name: 'year',
      component: YearView,
      props: yearProps
    },
    {
      path: '/:year/:month',
      name: 'month',
      component: MonthView,
      props: monthProps
    },
    {
      path: '/:year/:month/:day',
      name: 'day',
      component: DayView,
      props: dayProps
    }
  ]
})
