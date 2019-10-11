<template>
  <div>
    <h1 v-html="monthName"></h1>
    <div class="month">
      <ul class="days">
        <li v-for="day in visibleDaysInPreviousMonth" :key="'p'+day" class="day other-month"><p v-html="day"></p></li>
        <li v-for="day in daysInThisMonth" :key="day" class="day"><p v-html="day"></p></li>
        <li v-for="day in visibleDaysInNextMonth" :key="'n'+day" class="day other-month"><p v-html="day"></p></li>
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

<style scoped>
  .month {
    width: 100%;
  }

  ul.days {
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0.5px solid grey;

    list-style-type: none;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li.day {
    width: calc(100% / 7 - 1px);
    height: 6em;

    border: 0.5px solid grey;

    background: inherit;
  }

  li.day > p {
    width: calc(100% - 0.2em);
    padding-right: 0.2em;
    margin: 0;
    text-align: right;
    background-color: lightgrey;
  }

  li.day.other-month {
    background-color: #EEE;
  }
</style>
