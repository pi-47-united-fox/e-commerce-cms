<template>
  <div id="app">
    <div id="nav" class="navbar bg-primary">
      <router-link to="/" class="text-white">Home</router-link>
      <router-link to="/add-product" class="text-white">Add New Product</router-link>
      <a href="#" @click="logout" class="text-white">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login') // bisa path bisa name, kalo name ({name: "Home"}), sesuai yang di router
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
</style>
