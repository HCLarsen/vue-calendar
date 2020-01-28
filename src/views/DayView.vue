<template>
  <div class="day-view">
    <Header v-if="routerActive" :day="day" :month="month" :year="year" :lang="lang"/>
    <h1 v-else v-html="header"></h1>
    <div class="content">
      <div :class="[event ? '': 'full-view', 'hourly-view']">
        <ul class="hours">
          <li v-for="(hour, index) in hours" :key="index" class="hour">
            <p v-html="hour"></p>
            <div class="bar"></div>
          </li>
        </ul>
      </div>
      <div v-if="event" class="event-details">
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue';

export default {
  name: "DayView",
  data() {
    return {
      event: null,
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
      const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
      const string = new Date(this.year, this.month, this.day).toLocaleDateString(this.lang, options);
      return string;
    },
    weekday() {
      return new Date(this.year, this.month, this.day).toLocaleDateString(this.lang, { weekday: "long" })
    },
    monthName() {
      return new Date(this.year, this.month).toLocaleDateString(this.lang, { month: "long" })
    },
    hours() {
      return Array.from({ length: 25 }, (x, index) => new Date(0, 0, 0, index, 0, 0).toLocaleTimeString(this.lang, { hour: "numeric" }));
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
  components: {
    Header,
  },
  methods: {
    daysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }
  }
}

</script>

<style>
  .event-details, .hourly-view, .bar {
    border-color: inherit;
  }
</style>

<style scoped>
  .content {
    width: 100%;
    height: 600px;

    display: flex;
    flex-direction: row;
  }

  .event-details, .hourly-view {
    width: 50%;
    border: 1px solid;
    border-width: 1px;
    border-style: solid;
  }

  .hourly-view.full-view {
    width: 100%;
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
    border: 1px solid;
  }
</style>
