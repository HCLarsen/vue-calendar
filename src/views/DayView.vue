<template>
  <h1 v-html="header"></h1>
</template>

<script>

export default {
  name: "DayView",
  props: {
    day: {
      type: Number,
      validator: function(value) {
        return value > 0;
      }
    },
    month: {
      type: Number,
      validator: function(value) {
        return value >= 0 && value <= 11;
      }
    },
    year: {
      type: Number
    }
  },
  computed: {
    header() {
      console.log(this.weekday);
      return `${this.weekday}, ${this.monthName(this.month)} ${this.day}, ${this.year}`
    },
    weekday() {
      return new Date(this.year, this.month, this.day).toLocaleDateString("en-CA", { weekday: "long" })
    }
  },
  methods: {
    monthName(month) {
      return new Date(0, month).toLocaleDateString("en-CA", {
        month: "long"
      });
    }
  },
}

</script>

<style scoped></style>
