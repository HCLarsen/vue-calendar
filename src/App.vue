<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/calendar/">Calendar View With Router</router-link>
      <router-link to="/month">Month View</router-link>
      <router-link to="/day">Day View</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
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
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
