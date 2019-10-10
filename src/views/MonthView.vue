<template>
  <div>
    <h1>October</h1>
    <div>
      <ul class="days">
        <li v-for="day in days" :key="day" class="day"><p v-html="day"></p></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthView",
  props: {
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
    monthName() {
      return new Date(0, this.month).toLocaleDateString("en-CA", {
        month: "long"
      });
    },
    days() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
  }
}
</script>

<style scoped></style>
