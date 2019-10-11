<template>
  <div class="year">
    <h1 v-html="year"></h1>
  </div>
</template>

<script>
  export default {
    name: "YearView",
    props: {
      year: {
        type: Number
      }
    },
  }
</script>

<style scoped></style>
