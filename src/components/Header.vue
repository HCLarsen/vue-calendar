<script>
  export default {
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
        if(this.month) {
          return new Date(this.year, this.month).toLocaleDateString(this.lang, { month: "long" });
        } else {
          return "";
        }
      }
    },
    render(h) {
      let options = {};
      let dateString = ""
      if(this.day) {
        options = {  weekday: "long", month: "long", day: "numeric", year: "numeric" };
        dateString = new Date(this.year, this.month, this.day).toLocaleDateString(this.lang, options);
      } else if (this.month) {
        options = { month: "long", year: "numeric" };
        dateString = new Date(this.year, this.month).toLocaleDateString(this.lang, options);
      } else {
        options = { year: "numeric" };
        dateString = new Date(this.year, 1).toLocaleDateString(this.lang, options);
      }

      let components = dateString.split(/\b/).map((word) => {
        if(word === `${this.year}` && this.month) {
          let yearPath = { name: 'year', params: { year: this.year } };
          return <router-link class="year" to={ yearPath }>{ this.year }</router-link>
        } else if(word === `${this.monthName}`) {
          let monthPath = { name: 'month', params: { year: this.year, month: this.month }};
          return <router-link class="month" to={ monthPath }>{ this.monthName }</router-link>
        } else {
          return word;
        }
      });

      return (
        <h1>{ components }</h1>
      );
    },
  }
</script>
