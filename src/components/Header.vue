<script>
  import arrow from '@/assets/next-arrow.png';

  export default {
    name: 'Header',
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

      let components = dateString.split(/\b/).map((word) => {
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
            <img src={arrow}/>
          </router-link>
          <h1>{ components }</h1>
          <router-link to={ this.next } class={`next`}>
            <img src={arrow}/>
          </router-link>
        </nav>
      );
    },
  }
</script>

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

  nav > h1 > a {
    color: inherit;
  }

  .previous, .next {
    display: inline;
    height: 2em;
  }

  .previous > img {
    height: 100%;
    transform: scaleX(-1);
  }

  .next > img {
    height: 100%;
}
</style>
