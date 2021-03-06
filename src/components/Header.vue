<script>
  import Arrow from '@/components/Arrow.vue';

  export default {
    name: 'Header',
    props: {
      day: {
        type: Number,
        validator: function(value) {
          return value > 0;
        },
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
        default: 'en',
      },
      routerActive: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      Arrow,
    },
    computed: {
      monthName() {
        if(!isNaN(this.month)) {
          return new Date(this.year, this.month).toLocaleDateString(this.lang, { month: "long" });
        } else {
          return "";
        }
      },
      view() {
        if(this.day) {
          return 'day';
        } else if (!isNaN(this.month)) {
          return 'month';
        } else {
          return 'year';
        }
      },
      previous() {
        let params = {};
        if (this.view === 'year') {
          params = { year: this.year - 1 };
        } else if (this.view === 'month') {
          params = { year: this.year, month: this.month };
          if (params.month < 1) {
            params.year -= 1;
            params.month = 12;
          }
        } else {
          params = { year: this.year, month: this.month + 1, day: this.day - 1};
          if (params.day < 1) {
            params.month -= 1;
            params.day = this.daysInMonth(params.year, params.month);
          }
          if (params.month < 1) {
            params.year -= 1;
            params.month = 12;
            params.day = this.daysInMonth(params.year, params.month);
          }
        }

        return { name: this.view, params: params };
      },
      next() {
        let params = {};
        if (this.view === 'year') {
          params = { year: this.year + 1 };
        } else if (this.view === 'month') {
          params = { year: this.year, month: this.month + 2 };
          if (params.month > 12) {
            params.year += 1;
            params.month = 1;
          }
        } else {
          params = { year: this.year, month: this.month + 1, day: this.day + 1};
          if (params.day > this.daysInMonth(params.year, params.month)) {
            params.month += 1;
            params.day = 1;
          }
          if (params.month > 12) {
            params.year += 1;
            params.month = 1;
          }
        }

        return { name: this.view, params: params };
      }
    },
    methods: {
      daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      splitAt(string, indexes) {
        string.slice(0, indexes[0]);
      }
    },
    // eslint-disable-next-line
    render(h) {
      let options = {};
      let dateString = ""
      if(this.view === "day") {
        options = {  weekday: "long", month: "long", day: "numeric", year: "numeric" };
        dateString = new Date(this.year, this.month, this.day).toLocaleDateString(this.lang, options);
      } else if (this.view === "month") {
        options = { month: "long", year: "numeric" };
        dateString = new Date(this.year, this.month).toLocaleDateString(this.lang, options);
      } else {
        options = { year: "numeric" };
        dateString = new Date(this.year, 1).toLocaleDateString(this.lang, options);
      }

      const regex = new RegExp(`(${this.monthName}|${this.year})`);
      let components = dateString.split(regex).map((word) => {

        if(word === `${this.year}` && !isNaN(this.month)) {
          let yearPath = { name: 'year', params: { year: this.year } };
          return <router-link class="year" to={ yearPath }>{ this.year }</router-link>
        } else if(word === `${this.monthName}` && this.day) {
          let monthPath = { name: 'month', params: { year: this.year, month: this.month + 1}};
          return <router-link class="month" to={ monthPath }>{ this.monthName }</router-link>
        } else {
          return word;
        }
      });

      return (
        <nav>
          <router-link to={ this.previous } class={`previous`}>
            <Arrow/>
          </router-link>
          <h1 class="date">{ components }</h1>
          <router-link to={ this.next } class={`next`}>
            <Arrow/>
        </router-link>
        </nav>
      );
    },
  }
</script>

<style>
  .date, .month, .year {
    color: inherit;
  }
</style>

<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  nav > h1 {
    font-size: 2em;
  }

  .previous, .next {
    color: inherit;
    display: inline;
    height: 2em;
  }

  .previous > svg {
    height: 100%;
    transform: scaleX(-1);
  }

  .next > svg {
    height: 100%;
  }

  svg {
    fill: currentColor;
  }
</style>
