<template>
  <div class="calendar-view">
    <router-view/>
  </div>
</template>

<script>
import VueRouter from "vue-router";

import DayView from '@/views/DayView.vue';
import MonthView from '@/views/MonthView.vue';
import YearView from '@/views/YearView.vue';

export default {
  name: 'CalendarView',
  created() {
    if(this.routeNameAlreadyRegistered(this.$router, 'year')){
      return;
    }

    const basePath = this.getParentRouterPath(this);

    this.$router.addRoutes([
      {
        path: basePath + '/:year(\\d+)',
        name: 'year',
        component: YearView,
        props: this.yearProps
      },
      {
        path: basePath + '/:year(\\d+)/:month(\\d{1,2})',
        name: 'month',
        component: MonthView,
        props: this.monthProps
      },
      {
        path: basePath + '/:year(\\d+)/:month(\\d{1,2})/:day(\\d{1,2})',
        name: 'day',
        component: DayView,
        props: this.dayProps
      },
      {
        path: basePath + '/*',
        name: 'home',
        redirect: this.todaysPath()
      },
    ]);

    console.log(this.$router);
  },
  router: new VueRouter({
    mode: 'history',
  }),
  methods: {
    todaysPath() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      return `/${year}/${month}`;
    },
    yearProps(route) {
      return {
        year: parseInt(route.params.year, 10)
      };
    },
    monthProps(route) {
      return {
        year: parseInt(route.params.year, 10),
        month: parseInt(route.params.month - 1, 10)
      };
    },
    dayProps(route) {
      return {
        year: parseInt(route.params.year, 10),
        month: parseInt(route.params.month - 1, 10),
        day: parseInt(route.params.day, 10)
      };
    },
    routeNameAlreadyRegistered(router, routeName) {
      const registered = router.resolve({ name: routeName });
      if (registered && registered.href !== "#/" && registered.href !== "/") {
        return true;
      }
      return false;
    },
    getParentRouterPath(instance) {
      try {
        return instance.$parent.$route.meta.basePath;
      } catch (e) {
        return "";
      }
    }
  }
}
</script>

<style scoped>
</style>
