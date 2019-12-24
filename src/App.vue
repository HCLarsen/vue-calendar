<template>
  <div id="app">
    <nav id="nav">
      <router-link :to="{ name: 'month', params: thisMonth }">Calendar View With Router</router-link>
      <router-link :to="{ name: 'month-view', params: thisMonth }">Month View</router-link>
      <router-link :to="{ name: 'day-view', params: today }">Day View</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
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
  color: #2c3e50;

  width: 90%;
  margin: auto;
  margin-bottom: 25px;
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
</style>
