<template>
  <div id="app">
    <div v-if="authenticated == true">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Z-Commerce</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link">
                <router-link to="/">Home</router-link>
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link">
                <router-link to="/about">About</router-link>
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0"> 
            <button class="btn btn-outline-danger my-2 my-sm-0" @click="logout">Logout</button> 
          </form>
        </div>
      </nav> 
    </div>

    <router-view/>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  data () {
    return {
      authenticated: false
    }
  },
  methods:{
    logout () {
      localStorage.clear()
      router.push("Login")
    }
  },
  created () {
    if(localStorage.access_token) this.authenticated = true
    else this.authenticated = false
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
</style>
