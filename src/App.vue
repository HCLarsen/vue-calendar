<template>
  <div id="app">
    <CalendarView/>
  </div>
</template>

<script>
  import CalendarView from '@/views/CalendarView';

  export default {
    components: {
      CalendarView
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
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
