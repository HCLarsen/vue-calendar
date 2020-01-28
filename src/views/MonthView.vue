<template>
  <div class="month-view">
    <Header v-if="routerActive" :month="month" :year="year" :lang="lang"/>
    <h1 v-else v-html="header"></h1>
    <div class="month">
      <ul class="days">
        <li v-for="day in visibleDaysInPreviousMonth" :key="'p'+day" class="day other-month">
          <router-link v-if="routerActive" :to="{ name: 'month', params: previousMonth }" class="previous">
            <p v-html="day"></p>
          </router-link>
          <p v-else v-html="day"></p>
        </li>
        <li v-for="day in daysInThisMonth" :key="day" class="day">
          <router-link v-if="routerActive" :to="{ name: 'day', params: dayParams(day) }">
            <p v-html="day"></p>
          </router-link>
          <p v-else v-html="day"></p>
        </li>
        <li v-for="day in visibleDaysInNextMonth" :key="'n'+day" class="day other-month">
          <router-link v-if="routerActive" :to="{ name: 'month', params: nextMonth }" class="next">
            <p v-html="day"></p>
          </router-link>
          <p v-else v-html="day"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue';

import arrow from '@/assets/next-arrow.png';

export default {
  name: "MonthView",
  data() {
    return {
      arrow
    }
  },
  props: {
    month: {
      type: Number,
      validator: function(value) {
        return value >= 0 && value <= 11;
      }
    },
    year: {
      type: Number
    },
    lang: {
      type: String,
      default: navigator.language,
    },
    routerActive: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    header() {
      return `${this.monthName} ${this.year}`;
    },
    monthName() {
      return new Date(this.year, this.month).toLocaleDateString(this.lang, { month: "long" });
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
    },
    previousMonth() {
      let params = { year: this.year, month: this.month };
      if (params.month < 1) {
        params.year -= 1;
        params.month = 12;
      }
      return params;
    },
    nextMonth() {
      let params = { year: this.year, month: this.month + 2 };
      if (params.month > 12) {
        params.year += 1;
        params.month = 1;
      }
      return params;
    }
  },
  components: {
    Header,
  },
  methods: {
    daysInMonth(month) {
      return new Date(this.year, month + 1, 0).getDate();
    },
    dayParams(day) {
      let params = { year: this.year, month: this.month + 1 };
      params.day = day;
      return params;
    },
    range(size, startAt = 0) {
      return [...Array(size).keys()].map(i => i + startAt);
    }
  }
}
</script>

<style>
  .day {
    background-color: inherit;
  }

  .day.other-month {
    background-color: rgba(128, 128, 128, 0.3);
  }

  .day p {
    background-color: rgba(128, 128, 128, 0.4);
  }
</style>

<style scoped>
  .month-view {
    color: inherit;
    border-color: inherit;
  }

  .month {
    width: 100%;

    color: inherit;
    border-color: inherit;
  }

  ul.days {
    width: calc(100% - 1px);
    margin: 0;
    padding: 0;
    border: 0.5px solid;
    border-color: inherit;

    list-style-type: none;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li.day {
    width: calc(100% / 7 - 1px);
    height: 6em;

    border: inherit;
  }

  li.day > a {
    color: inherit;
    text-decoration: none;

    display: block;
    width: 100%;
    height: 100%;
  }

  li.day p {
    width: calc(100% - 0.2em);
    padding-right: 0.2em;
    margin: 0;
    text-align: right;
  }
</style>
