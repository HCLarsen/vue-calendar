<template>
  <ul class="days">
    <li v-for="day in visibleDaysInPreviousMonth" :key="'p'+day" class="day other-month mini"><p v-html="day"></p></li>
    <li v-for="day in daysInThisMonth" :key="day" class="day mini"><p v-html="day"></p></li>
    <li v-for="day in visibleDaysInNextMonth" :key="'n'+day" class="day other-month mini"><p v-html="day"></p></li>
  </ul>
</template>

<script>
  export default {
    name: "Month",
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
      daysInThisMonth() {
        return this.range(this.daysInMonth(this.month), 1);
      },
      visibleDaysInNextMonth() {
        const weekdayStart = new Date(this.year, this.month + 1, 0).getDay();
        return this.range(6 - weekdayStart, 1);
      },
      visibleDaysInPreviousMonth() {
        const weekdayEnd = new Date(this.year, this.month, 0).getDay();
        if (weekdayEnd < 6) {
          const lastDay = new Date(this.year, this.month, 0).getDate();
          const firstDay = lastDay - weekdayEnd;
          return this.range(weekdayEnd + 1, firstDay);
        } else {
          return [];
        }
      }
    },
    methods: {
      daysInMonth(month) {
        return new Date(this.year, month + 1, 0).getDate();
      },
      range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
      }
    }
  }
</script>

<style>
  .day.other-month.mini {
    color: grey;
    background-color: transparent;
  }

  .day.mini > p {
    background-color: transparent;
  }
</style>

<style scoped>
  ul.days {
    width: 100%;
    margin: 0;
    padding: 0;

    list-style-type: none;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li.day {
    width: calc(100% / 7 - 1px);
  }

  li.day > p {
    margin: 0;
  }

</style>
