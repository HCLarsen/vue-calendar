<template>
  <div class="dayview">
    <h1 id="date" v-html="header"></h1>
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
</style>
