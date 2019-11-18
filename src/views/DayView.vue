<template>
  <div class="dayview">
    <nav>
      <router-link v-if="routerActive" :to="{ name: 'day', params: previousDay }" class="previous-day" >
        <img :src="arrow"/>
      </router-link>
      <h1 id="date">
        <span v-html="`${weekday}, `"></span>
        <router-link v-if="routerActive" :to="{ name: 'month', params: { monthLink } }" class="month" v-html="monthName"></router-link>
        <span v-else class="month" v-html="monthName"></span>
        <span v-html="` ${day}, `"></span>
        <router-link v-if="routerActive" :to="{ name: 'year', params: { year } }" class="year" v-html="year"></router-link>
        <span v-else class="year" v-html="year"></span>
      </h1>
      <router-link v-if="routerActive" :to="{ name: 'day', params: nextDay }" class="next-day" >
        <img :src="arrow"/>
      </router-link>
    </nav>
    <div class="content">
      <div class="hourly-view">
        <ul class="hours">
          <li v-for="(hour, index) in hours" :key="index" class="hour">
            <p v-html="hour"></p>
            <div class="bar"></div>
          </li>
        </ul>
      </div>
      <div class="event-details">
        <h2>No Events</h2>
      </div>
    </div>
  </div>
</template>

<script>
import arrow from '@/assets/next-arrow.png';

export default {
  name: "DayView",
  data() {
    return {
      arrow
    }
  },
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
    },
    routerActive: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    header() {
      return `${this.weekday}, ${this.monthName} ${this.day}, ${this.year}`
    },
    weekday() {
      return new Date(this.year, this.month, this.day).toLocaleDateString("en-CA", { weekday: "long" })
    },
    monthName() {
      return new Date(this.year, this.month).toLocaleDateString("en-CA", { month: "long" })
    },
    hours() {
      const hours = ['12AM'];
      for (var a = 1; a < 12; a++) {
        hours.push(`${a}AM`);
      }
      hours.push('12PM');
      for (var p = 1; p < 12; p++) {
        hours.push(`${p}PM`);
      }
      hours.push('12AM');
      return hours;
    },
    nextDay() {
      let params = { year: this.year, month: this.month + 1, day: this.day + 1};
      if (params.day > this.daysInMonth(params.year, params.month)) {
        params.month += 1;
        params.day = 1;
      }
      if (params.month > 12) {
        params.year += 1;
        params.month = 1;
      }
      return params;
    },
    previousDay() {
      let params = { year: this.year, month: this.month + 1, day: this.day - 1};
      if (params.day < 1) {
        params.month -= 1;
        params.day = this.daysInMonth(params.year, params.month);
      }
      if (params.month < 1) {
        params.year -= 1;
        params.month = 12;
        params.day = this.daysInMonth(params.year, params.month);
      }
      return params;
    },
    monthLink() {
      return this.month + 1;
    }
  },
  methods: {
    daysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }
  }
}

</script>

<style scoped>
  .content {
    width: 100%;
    height: 600px;

    display: flex;
    flex-direction: row;
  }

  .event-details, .hourly-view {
    width: 50%;
    border: 1px solid black;
  }

  .hourly-view {
    overflow: auto;
  }

  .hours {
    height: 100%;
    list-style-type: none;
  }

  .hour {
    position: relative;
    height: 12.5%;
  }

  .hour:last-child {
    height: 0%;
  }

  .hour > p {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-100%, -50%);
    margin: 0;

    font-size: 0.8em;
  }

  .bar {
    position: absolute;
    top: 0;
    width: calc(100% - 2px);
    border: 1px solid grey;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  nav > h1 {
    font-size: 2em;
  }

  nav > h1 > a {
    color: inherit;
  }

  .previous-day, .next-day {
    display: inline;
    height: 2em;
  }

  .previous-day > img {
    height: 100%;
    transform: scaleX(-1);
  }

  .next-day > img {
    height: 100%;
  }
</style>
