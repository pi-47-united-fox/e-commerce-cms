<template>
  <div id="app">
    <div >
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0" v-if="$store.state.authenticated == true">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Z-Commerce</a> 
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-fluid">
      <div class="row ">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar" v-if="$store.state.authenticated == true">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Back Office</span> 
              </h6>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="homePage"> Products </a>
              </li>
              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Front Office</span> 
              </h6>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="aboutPage">Banner</a>
              </li> 
            </ul>
          </div>
        </nav>
        <main class="col" style="">
          <div class="content-container">
            <router-view/>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  data () {
    return { 
    }
  },
  methods:{
    logout () {
      localStorage.clear()
      this.$store.commit('LOGOUT')
      router.push("Login")
    },
    aboutPage () {
      // console.log($route.params);
      router.push("About").catch(err => {})
    },
    homePage () {
      // console.log($route.params);
      router.push("/").catch(err => {})
    }
  },
  created () { 
    if(localStorage.access_token){
      this.$store.commit('LOGIN')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
.content-container {
  margin: 0;
  /* overflow-y: scroll; */
  height: 93vh;
}
</style>
