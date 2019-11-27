<template>
  <div class="calendar-view">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'CalendarView',
  created() {
    this.goHome();
  },
  updated() {
    this.goHome();
  },
  methods: {
    goHome() {
      const base = this.$router.currentRoute.path;
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      if(base.includes(year)) {
        return;
      }
      this.$router.push(`${base}/${year}/${month}`);
    }
  }
}
</script>

<style scoped>
</style>
