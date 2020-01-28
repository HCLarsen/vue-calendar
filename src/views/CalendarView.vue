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
      default: navigator.language,
    },    
  }
}
</script>

<style scoped>
</style>
