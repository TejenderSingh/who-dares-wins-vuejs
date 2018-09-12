<template>
  <div id="app">
    <Entries />
  </div>
</template>

<script>
import Entries from './components/Entries.vue';

export default {
  name: 'app',
  components: {
    Entries
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Merriweather|Montserrat');
html {
  margin: 0;
  height: 100vh;
}
body {
  background-color: #ecf0f1;
  min-height: 100%;
  display: flex;
  justify-content: center;
}
#app {
  font-family: 'Montserrat', sans-serif;  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 55%;
}
@media screen and (max-width: 768px) {
  #app {
    width: 80%;
  }
}
</style>