<template>
  <div id="app" :class="theme">
    <header>
      <nav id="nav">
        <router-link :to="{ name: 'month', params: thisMonth }">Calendar View With Router</router-link>
        <router-link :to="{ name: 'month-view', params: thisMonth }">Month View</router-link>
        <router-link :to="{ name: 'day-view', params: today }">Day View</router-link>
      </nav>
    </header>
    <aside>
      <h3>{{ content.title }}</h3>
      <div v-for="(topic, index) in content.topics" :key="index" class="topic">
        <h4>{{ topic.title }}</h4>
        <p>{{ topic.text }}</p>
        <label v-if="index==0">lang:
          <select v-model="lang">
            <option v-for="language in languages" :key="language">{{ language }}</option>
          </select>
        </label>
        <label v-if="index==2">Colour Theme:
          <select v-model="theme">
            <option v-for="theme in themes" :key="theme">{{ theme }}</option>
          </select>
        </label>
      </div>
    </aside>
    <main>
      <router-view v-if="selectedLanguage" :lang="selectedLanguage"></router-view>
      <router-view v-else></router-view>
    </main>
  </div>
</template>

<script>
  import content from '@/english.json';

  export default {
    data() {
      return {
        theme: 'light',
        themes: ['light', 'dark', 'blue'],
        lang: 'Browser Default',
        languages: ['Browser Default', 'en', 'fr-CA', 'es', 'da', 'ja'],
        content,
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
      selectedLanguage() {
        if (this.lang !== 'Browser Default') {
          return this.lang;
        } else {
          return null
        }
      }
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
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;

    background-color: inherit;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    margin: 0 10px;
    font-weight: bold;
    /* color: #2c3e50; */
    color: inherit;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  aside {
    display: none;
    box-sizing: border-box;
    position: fixed;
    top: 100px;
    left: 0;
    height: calc(100% - 100px);
    width: 20%;
    padding: 0% 1% 3% 1%;
    border: 1px solid;
    overflow: auto;
  }

  aside .topic:last-child {
    padding-bottom: 20%;
  }

  aside p {
    text-align: left;
  }

  main {
    width: 90%;
    padding: 100px 5% 25px 5%;
  }

  @media only screen and (min-width: 520px) {
    aside {
      display: block;
    }

    main {
      width: 70%;
      padding: 100px 5% 25px 25%;
    }
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
