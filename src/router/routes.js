import DayView from '@/views/DayView.vue'
import MonthView from '@/views/MonthView.vue'
import YearView from '@/views/YearView.vue'

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

export default [
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
    path: '*',
    redirect: todaysPath()
  },
]
