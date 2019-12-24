<template>
  <div class="year-view">
    <nav>
      <router-link v-if="routerActive" :to="{ name: 'year', params: { year: this.year - 1} }" class="previous-year" >
        <img :src="arrow"/>
      </router-link>
      <h1 v-html="year"></h1>
      <router-link v-if="routerActive" :to="{ name: 'year', params: { year: this.year + 1} }" class="next-year" >
        <img :src="arrow"/>
      </router-link>
    </nav>
    <div class="year">
      <ul class="months">
        <li v-for="month in 12" :key="month" class="month">
          <router-link v-if="routerActive" :to="{ name: 'month', params: { month: month } }">
            <h3 v-html="monthName(month-1)"></h3>
            <Month :month="month-1" :year="year" />
          </router-link>
          <div v-else>
            <h3 v-html="monthName(month-1)"></h3>
            <Month :month="month-1" :year="year" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Month from '@/components/Month.vue';

  import arrow from '@/assets/next-arrow.png';

  export default {
    name: "YearView",
    data() {
      return {
        arrow
      }
    },
    props: {
      year: {
        type: Number
      },
      routerActive: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      monthName(month) {
        return new Date(0, month).toLocaleDateString("en-CA", { month: "long" });
      },
      daysInMonth(month) {
        return new Date(this.year, month + 1, 0).getDate();
      },
    },
    components: {
      Month,
    },
  }
</script>

<style scoped>
  ul.months {
    width: 100%;
    margin: 0;
    padding: 0;

    list-style-type: none;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li.month {
    width: calc(93% / 3);
    padding: 0 1%;
  }

  li.month > a {
    text-decoration: none;
    color: inherit;
    background-color: inherit;
  }

  @media screen and (min-aspect-ratio: 1/1) {
    li.month {
      width: calc(92% / 4);
    }
  }

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

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  nav > h1 {
    font-size: 2em;
  }

  .previous-year {
    display: inline;
    height: 2em;
  }

  .previous-year > img {
    height: 100%;
    transform: scaleX(-1);
  }

  .next-year {
    display: inline;
    height: 2em;
  }

  .next-year > img {
    height: 100%;
  }
</style>
