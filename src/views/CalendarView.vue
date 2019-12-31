<template>
  <div class="calendar-view">
    <router-view :lang="lang"/>
  </div>
</template>

<script>

export default {
  name: 'CalendarView',
  props: {
    lang: {
      type: String,
      default: 'en',
    },    
  }
}
</script>

<style scoped>
</style>
