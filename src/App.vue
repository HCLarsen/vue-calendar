<template>
  <div id="app" :class="theme">
    <nav id="nav">
      <router-link :to="{ name: 'month', params: thisMonth }">Calendar View With Router</router-link>
      <router-link :to="{ name: 'month-view', params: thisMonth }">Month View</router-link>
      <router-link :to="{ name: 'day-view', params: today }">Day View</router-link>
      <select v-model="lang">
        <option v-for="language in languages" :key="language">{{ language }}</option>
      </select>
      <label>Colour Theme:</label>
      <select v-model="theme">
        <option v-for="theme in themes" :key="theme">{{ theme }}</option>
      </select>
    </nav>
    <router-view :lang="lang"></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        theme: 'light',
        themes: ['light', 'dark', 'blue'],
        lang: 'en',
        languages: ['en', 'fr', 'es', 'da'],
      }
    },
    computed: {
      thisMonth() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        return { year: year, month: month };
      },
      today() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return { year: year, month: month, day: day };
      },
    }
  }
</script>

<style>
@import './assets/main.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  width: 90%;
  padding: 0 5% 25px 5%;
}

#nav {
  padding: 30px;
}

#nav a {
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.light {
  background-color: white;
  color: #2c3e50;
  border-color: grey;
}

.dark {
  background-color: black;
  color: white;
  border-color: grey;
}

.blue {
  background-color: royalblue;
  color: white;
  border-color: white;
}
</style>
