<template>
  <div
    id="app"
    :style="{
      'background-image':
        'url(https://images.daznservices.com/di/library/GOAL/18/d5/manchester-city-liverpool-2020-21-premier-league_kr8gr6vxvpel1jmv2xpeoz1hl.png?t=968696851&w=1920&h=1080)',
      backgroundSize: 'cover !important',
    }"
  >
    <Navbar></Navbar>
    <router-view />
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      page: 'login'
    }
  }

}
</script>

<style>
body {
  background-image: src("../assets/3921.jpg");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

#nav {
  padding: 30px;
  margin-right: 100px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.sidebar {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding-block-start: 21%;
  padding-block-end: 21%;
}
</style>
